const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Sirve los archivos estáticos de la carpeta "dist"
app.use(express.static('dist'));

// Maneja todas las rutas para SPAs
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});