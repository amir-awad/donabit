import express from 'express';
import supabaseService from './services/supabaseService';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
const port = process.env.PORT ?? 3001;

app.get('/', async (req, res) => {
  try {
    const { data, error } = await supabaseService.getSupabase().from('users').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
