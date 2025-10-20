const express = require('express');
const router = express.Router();
const { query } = require('../database');

// GET all experiences
router.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT e.*, p.full_name as physician_name 
       FROM public.experiences e
       LEFT JOIN public.physicians p ON e.physician_id = p.id
       ORDER BY e.sort_order ASC, e.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET experience by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      `SELECT e.*, p.full_name as physician_name 
       FROM public.experiences e
       LEFT JOIN public.physicians p ON e.physician_id = p.id
       WHERE e.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new experience
router.post('/', async (req, res) => {
  try {
    const { institution, role, period, physician_id, sort_order, metrics } = req.body;
    
    // Handle empty physician_id - convert empty string or "1" to null
    const physicianId = physician_id && physician_id.trim() !== '' && physician_id !== '1' ? physician_id : null;
    
    const result = await query(
      `INSERT INTO public.experiences (institution, role, period, physician_id, sort_order, metrics)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [institution, role, period, physicianId, sort_order, JSON.stringify(metrics)]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update experience
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { institution, role, period, physician_id, sort_order, metrics } = req.body;
    
    // Handle empty physician_id - convert empty string or "1" to null
    const physicianId = physician_id && physician_id.trim() !== '' && physician_id !== '1' ? physician_id : null;
    
    const result = await query(
      `UPDATE public.experiences 
       SET institution = $1, role = $2, period = $3, physician_id = $4, sort_order = $5, metrics = $6, updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [institution, role, period, physicianId, sort_order, JSON.stringify(metrics), id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE experience
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'DELETE FROM public.experiences WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
