const express = require('express');
const bcrypt = require('bcrypt');
const { query } = require('../database');
const { generateToken, authenticateToken } = require('../middleware/auth');
const config = require('../config');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Username and password are required'
      });
    }

    // Find user by username or email
    const userResult = await query(
      'SELECT id, username, email, password_hash, full_name, role, is_active FROM admin_users WHERE username = $1 OR email = $1',
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials'
      });
    }

    const user = userResult.rows[0];

    if (!user.is_active) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Account is deactivated'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials'
      });
    }

    // Update last login
    await query(
      'UPDATE admin_users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // Generate token
    const token = generateToken(user.id);

    // Return user data (without password)
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Login failed'
    });
  }
});

// Logout endpoint (client-side token removal)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({
    message: 'Logout successful'
  });
});

// Get current user info
router.get('/me', authenticateToken, (req, res) => {
  const { password_hash, ...userWithoutPassword } = req.user;
  res.json({
    user: userWithoutPassword
  });
});

// Change password endpoint
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'New password must be at least 6 characters long'
      });
    }

    // Get current user with password hash
    const userResult = await query(
      'SELECT password_hash FROM admin_users WHERE id = $1',
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const user = userResult.rows[0];

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await query(
      'UPDATE admin_users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
      [newPasswordHash, req.user.id]
    );

    res.json({
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to change password'
    });
  }
});

// Update profile endpoint
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Full name and email are required'
      });
    }

    // Check if email is already taken by another user
    const existingUser = await query(
      'SELECT id FROM admin_users WHERE email = $1 AND id != $2',
      [email, req.user.id]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: 'Email exists',
        message: 'Email is already taken by another user'
      });
    }

    // Update profile
    const result = await query(
      'UPDATE admin_users SET full_name = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING id, username, email, full_name, role, created_at',
      [fullName, email, req.user.id]
    );

    const updatedUser = result.rows[0];

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update profile'
    });
  }
});

// Create admin user endpoint (for initial setup)
router.post('/create-admin', async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Username, email, and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM admin_users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: 'User exists',
        message: 'Username or email already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await query(
      'INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, full_name, role, created_at',
      [username, email, passwordHash, fullName || null, 'admin']
    );

    const newUser = result.rows[0];

    res.status(201).json({
      message: 'Admin user created successfully',
      user: newUser
    });

  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create admin user'
    });
  }
});

module.exports = router;
