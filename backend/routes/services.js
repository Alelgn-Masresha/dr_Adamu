const express = require('express');
const router = express.Router();
const { query } = require('../database');

// GET all services
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM public.services ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET service by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM public.services WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new service
router.post('/', async (req, res) => {
  try {
    const { name, slug, description, is_active } = req.body;
    
    const result = await query(
      `INSERT INTO public.services (name, slug, description, is_active)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, slug, description, is_active]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update service
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, is_active } = req.body;
    
    const result = await query(
      `UPDATE public.services 
       SET name = $1, slug = $2, description = $3, is_active = $4, updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [name, slug, description, is_active, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'DELETE FROM public.services WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
