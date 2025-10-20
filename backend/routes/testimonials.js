const express = require('express');
const router = express.Router();
const { query } = require('../database');

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM public.testimonials ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET testimonial by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM public.testimonials WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new testimonial
router.post('/', async (req, res) => {
  try {
    const { author_name, author_title, rating, content, video_link, is_approved, published_at } = req.body;
    
    const result = await query(
      `INSERT INTO public.testimonials (author_name, author_title, rating, content, video_link, is_approved, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [author_name, author_title, rating, content, video_link, is_approved, published_at]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update testimonial
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { author_name, author_title, rating, content, video_link, is_approved, published_at } = req.body;
    
    const result = await query(
      `UPDATE public.testimonials 
       SET author_name = $1, author_title = $2, rating = $3, content = $4, video_link = $5, is_approved = $6, published_at = $7, updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [author_name, author_title, rating, content, video_link, is_approved, published_at, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'DELETE FROM public.testimonials WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
