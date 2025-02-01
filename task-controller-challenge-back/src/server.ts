import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new Database('tasks.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'Pendente',
    createdAt TEXT NOT NULL
  )
`);

app.get('/tasks', (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, description, state } = req.body;
  const createdAt = new Date().toISOString();

  const stmt = db.prepare('INSERT INTO tasks (title, description, state, createdAt) VALUES (?, ?, ?, ?)');
  const result = stmt.run(title, description, state || 'Pendente', createdAt);

  res.json({ id: result.lastInsertRowid, title, description, state, createdAt });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, state } = req.body;

  const stmt = db.prepare('UPDATE tasks SET title = ?, description = ?, state = ? WHERE id = ?');
  stmt.run(title, description, state, id);

  res.json({ id, title, description, state });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  res.json({ message: 'Task deleted' });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});