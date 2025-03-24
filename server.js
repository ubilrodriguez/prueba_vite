import express from 'express'; // <-- Cambia aquí
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(process.cwd() + '/dist/index.html'); // <-- Usa process.cwd()
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});