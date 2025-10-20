const express = require('express');
const router = express.Router();
const { query } = require('../database');
const { uploadSingle, handleUploadError } = require('../middleware/upload');

// GET all physicians
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM public.physicians ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching physicians:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET physician by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM public.physicians WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Physician not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching physician:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new physician
router.post('/', uploadSingle('avatar_file'), handleUploadError, async (req, res) => {
  try {
    const { full_name, title, bio, qualifications, affiliations, email, phone, location, is_active } = req.body;
    const avatar_file = req.file ? req.file.filename : null;
    
    // Convert qualifications and affiliations to arrays
    const qualificationsArray = qualifications ? qualifications.split(',').map(q => q.trim()) : [];
    const affiliationsArray = affiliations ? affiliations.split(',').map(a => a.trim()) : [];
    
    const result = await query(
      `INSERT INTO public.physicians (full_name, title, bio, avatar_file, qualifications, affiliations, email, phone, location, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [full_name, title, bio, avatar_file, qualificationsArray, affiliationsArray, email, phone, location, is_active]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating physician:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update physician
router.put('/:id', uploadSingle('avatar_file'), handleUploadError, async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, title, bio, qualifications, affiliations, email, phone, location, is_active } = req.body;
    const avatar_file = req.file ? req.file.filename : req.body.avatar_file;
    
    // Convert qualifications and affiliations to arrays
    const qualificationsArray = qualifications ? qualifications.split(',').map(q => q.trim()) : [];
    const affiliationsArray = affiliations ? affiliations.split(',').map(a => a.trim()) : [];
    
    const result = await query(
      `UPDATE public.physicians 
       SET full_name = $1, title = $2, bio = $3, avatar_file = $4, qualifications = $5, affiliations = $6, 
           email = $7, phone = $8, location = $9, is_active = $10, updated_at = NOW()
       WHERE id = $11
       RETURNING *`,
      [full_name, title, bio, avatar_file, qualificationsArray, affiliationsArray, email, phone, location, is_active, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Physician not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating physician:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE physician
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'DELETE FROM public.physicians WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Physician not found' });
    }
    
    res.json({ message: 'Physician deleted successfully' });
  } catch (error) {
    console.error('Error deleting physician:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
