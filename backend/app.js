const express = require('express');
const cors = require('./middleware/cors');
const taskRoutes = require('./routes/taskRoutes');

const PORT = 5000;
const app = express();


app.use(express.json());
app.use(cors);

app.get('/', (req,res) => {
    res.send("Olá mundo");
})

app.use('/api',taskRoutes);

app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta: http://localhost:${PORT}`)
})