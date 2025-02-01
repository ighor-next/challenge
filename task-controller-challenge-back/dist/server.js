"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const db = new better_sqlite3_1.default('tasks.db');
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
