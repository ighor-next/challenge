import express from 'express';
import router from './routes/taskRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});