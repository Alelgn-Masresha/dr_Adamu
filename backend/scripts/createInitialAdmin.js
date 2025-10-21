const bcrypt = require('bcrypt');

async function createInitialAdmin(query) {
  try {
    console.log('Creating initial admin user...');

    // Check if any admin users exist
    const existingAdmins = await query('SELECT id FROM admin_users LIMIT 1');
    
    if (existingAdmins.rows.length > 0) {
      console.log('Admin users already exist. Skipping initial admin creation.');
      return;
    }

    // Default admin credentials
    const username = 'admin';
    const email = 'admin@damc.com';
    const password = 'admin123'; // Change this in production!
    const fullName = 'System Administrator';

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create admin user
    const result = await query(
      'INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, full_name, role',
      [username, email, passwordHash, fullName, 'admin']
    );

    const admin = result.rows[0];

    console.log('✅ Initial admin user created successfully!');
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('Password:', password);
    console.log('⚠️  IMPORTANT: Change the default password after first login!');

  } catch (error) {
    console.error('❌ Error creating initial admin user:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  const { query } = require('../database');
  createInitialAdmin(query)
    .then(() => {
      console.log('Initial admin setup completed.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Initial admin setup failed:', error);
      process.exit(1);
    });
}

module.exports = { createInitialAdmin };
