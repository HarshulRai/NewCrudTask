import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'codefortommorow',
  password: '12345',
  port: 5432,
});

interface User {
    email: string;
    password: string;
  }

const JWT_SECRET = '12345';

const saltRounds = 10;

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as User;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
    const accessToken = generateAccessToken(email);
    res.json({ accessToken });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as User;
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const accessToken = generateAccessToken(email);
    res.json({ accessToken });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const generateAccessToken = (email: string) => {
  return jwt.sign({ email: email }, JWT_SECRET as string, { expiresIn: '1h' });
};
