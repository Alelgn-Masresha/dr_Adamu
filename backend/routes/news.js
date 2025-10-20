const express = require('express');
const router = express.Router();
const { query } = require('../database');
const { uploadSingle, handleUploadError } = require('../middleware/upload');

// GET all news
router.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT n.*, p.full_name as author_name 
       FROM public.news n
       LEFT JOIN public.physicians p ON n.author_physician_id = p.id
       ORDER BY n.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET published news only (for public frontend)
router.get('/published', async (req, res) => {
  try {
    const result = await query(
      `SELECT n.*, p.full_name as author_name 
       FROM public.news n
       LEFT JOIN public.physicians p ON n.author_physician_id = p.id
       WHERE n.is_published = true
       ORDER BY n.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching published news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET news by ID (published only for public access)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      `SELECT n.*, p.full_name as author_name 
       FROM public.news n
       LEFT JOIN public.physicians p ON n.author_physician_id = p.id
       WHERE n.id = $1 AND n.is_published = true`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'News article not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new news article
router.post('/', uploadSingle('cover_image_file'), handleUploadError, async (req, res) => {
  try {
    const { title, slug, excerpt, content, author_physician_id, is_published, published_at } = req.body;
    const cover_image_file = req.file ? req.file.filename : null;
    
    // Handle empty author_physician_id - convert empty string or "1" to null
    console.log('Received author_physician_id:', author_physician_id, 'type:', typeof author_physician_id);
    const authorId = author_physician_id && author_physician_id.trim() !== '' && author_physician_id !== '1' ? author_physician_id : null;
    console.log('Converted authorId:', authorId);
    
    // Handle empty published_at - convert empty string to null
    console.log('Received published_at:', published_at, 'type:', typeof published_at);
    const publishedAt = published_at && published_at.trim() !== '' ? published_at : null;
    console.log('Converted publishedAt:', publishedAt);
    
    const result = await query(
      `INSERT INTO public.news (title, slug, excerpt, content, cover_image_file, author_physician_id, is_published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, slug, excerpt, content, cover_image_file, authorId, is_published, publishedAt]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update news article
router.put('/:id', uploadSingle('cover_image_file'), handleUploadError, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, author_physician_id, is_published, published_at } = req.body;
    const cover_image_file = req.file ? req.file.filename : req.body.cover_image_file;
    
    // Handle empty author_physician_id - convert empty string or "1" to null
    console.log('Received author_physician_id:', author_physician_id, 'type:', typeof author_physician_id);
    const authorId = author_physician_id && author_physician_id.trim() !== '' && author_physician_id !== '1' ? author_physician_id : null;
    console.log('Converted authorId:', authorId);
    
    // Handle empty published_at - convert empty string to null
    console.log('Received published_at:', published_at, 'type:', typeof published_at);
    const publishedAt = published_at && published_at.trim() !== '' ? published_at : null;
    console.log('Converted publishedAt:', publishedAt);
    
    const result = await query(
      `UPDATE public.news 
       SET title = $1, slug = $2, excerpt = $3, content = $4, cover_image_file = $5, 
           author_physician_id = $6, is_published = $7, published_at = $8, updated_at = NOW()
       WHERE id = $9
       RETURNING *`,
      [title, slug, excerpt, content, cover_image_file, authorId, is_published, publishedAt, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'News article not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE news article
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'DELETE FROM public.news WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'News article not found' });
    }
    
    res.json({ message: 'News article deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
