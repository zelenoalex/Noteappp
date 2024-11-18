import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { content } = req.body;
      console.log('Attempting to insert note:', content);
      
      const { rows } = await sql`
        INSERT INTO notes (content) 
        VALUES (${content}) 
        RETURNING *
      `;
      
      console.log('Successfully inserted note:', rows[0]);
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error inserting note:', error);
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      console.log('Fetching notes...');
      const { rows } = await sql`
        SELECT * FROM notes 
        ORDER BY created_at DESC
      `;
      
      console.log('Found notes:', rows);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching notes:', error);
      res.status(500).json({ error: error.message });
    }
  }
}