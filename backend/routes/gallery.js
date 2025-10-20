const express = require('express');
const router = express.Router();
const { query } = require('../database');
const { uploadSingle, handleUploadError } = require('../middleware/upload');

// GET all gallery items
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM public.media_assets ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET gallery item by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM public.media_assets WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new gallery item
router.post('/', uploadSingle('file_path'), handleUploadError, async (req, res) => {
  try {
    const { title, content_type } = req.body;
    const file_path = req.file ? req.file.filename : null;
    
    if (!file_path) {
      return res.status(400).json({ error: 'File is required' });
    }
    
    const result = await query(
      `INSERT INTO public.media_assets (title, file_path, content_type)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, file_path, content_type || req.file.mimetype]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update gallery item
router.put('/:id', uploadSingle('file_path'), handleUploadError, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content_type } = req.body;
    const file_path = req.file ? req.file.filename : req.body.file_path;
    
    const result = await query(
      `UPDATE public.media_assets 
       SET title = $1, file_path = $2, content_type = $3
       WHERE id = $4
       RETURNING *`,
      [title, file_path, content_type, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE gallery item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'DELETE FROM public.media_assets WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
