import { Request, Response } from 'express';
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'codefortommorow',
    password: '12345',
    port: 5432,
  });

export const createService = async (req: Request, res: Response) => {
  try {
    const { category_id, service_name, type, price } = req.body;
    const result = await pool.query('INSERT INTO services (category_id, service_name, type, price) VALUES ($1, $2, $3, $4) RETURNING *', [category_id, service_name, type, price]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getServices = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    const result = await pool.query('SELECT * FROM services WHERE category_id = $1', [categoryId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.serviceId;
    const { category_id, service_name, type, price } = req.body;
    const result = await pool.query('UPDATE services SET category_id = $1, service_name = $2, type = $3, price = $4 WHERE id = $5 RETURNING *', [category_id, service_name, type, price, serviceId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.serviceId;
    const result = await pool.query('DELETE FROM services WHERE id = $1 RETURNING *', [serviceId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
