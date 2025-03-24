import express from 'express'; // <-- Cambia aquí
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public")); // Para archivos VRM
app.use("/dist", express.static("dist")); // Para JS en /dist
app.use(express.static('dist'));
// En server.js, asegúrate de servir archivos estáticos ANTES de la ruta comodín
app.use(express.static('dist', { 
    extensions: ['html', 'js', 'css', 'json'], // Especifica extensiones
    index: false // Evita servir index.html por defecto
  }));
  
  // Ruta comodín para SPAs (DEBE ir al final)
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
  });

app.get('*', (req, res) => {
  res.sendFile(process.cwd() + '/dist/index.html'); // <-- Usa process.cwd()
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
