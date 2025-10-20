const express = require('express');
const router = express.Router();
const { query } = require('../database');

// GET all publications
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM public.publications ORDER BY year DESC, created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching publications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET publication by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM public.publications WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Publication not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching publication:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new publication
router.post('/', async (req, res) => {
  try {
    const { title, authors, journal, year, doi, url, abstract } = req.body;
    
    const result = await query(
      `INSERT INTO public.publications (title, authors, journal, year, doi, url, abstract)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, authors, journal, year, doi, url, abstract]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating publication:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update publication
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, authors, journal, year, doi, url, abstract } = req.body;
    
    const result = await query(
      `UPDATE public.publications 
       SET title = $1, authors = $2, journal = $3, year = $4, doi = $5, url = $6, abstract = $7, updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [title, authors, journal, year, doi, url, abstract, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Publication not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating publication:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE publication
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'DELETE FROM public.publications WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Publication not found' });
    }
    
    res.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    console.error('Error deleting publication:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
