import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { content } = req.body;
      
      const { rows } = await sql`
        INSERT INTO notes (content) 
        VALUES (${content}) 
        RETURNING *
      `;
      
      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const { rows } = await sql`
        SELECT * FROM notes 
        ORDER BY created_at DESC
      `;
      
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}