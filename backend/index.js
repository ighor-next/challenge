import express from 'express';
import cors from 'cors';
/* importando rotas */
import userRoutes from './src/routes/userRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API está funcionando corretamente!');
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
