import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Configurar MIME types correctos
express.static.mime.define({
  'application/javascript': ['js'],
  'application/json': ['json'],
  'model/gltf-binary': ['glb'],
  'model/vrm': ['vrm']
});

// Middleware para configurar headers correctos para todos los archivos
app.use((req, res, next) => {
  const ext = path.extname(req.path).toLowerCase();
  
  if (ext === '.js') {
    res.setHeader('Content-Type', 'application/javascript');
  } else if (ext === '.json') {
    res.setHeader('Content-Type', 'application/json');
  } else if (ext === '.vrm') {
    res.setHeader('Content-Type', 'model/vrm');
  }
  
  next();
});

// Servir archivos estáticos desde diferentes directorios
// Nota: El orden es importante, se busca primero en las rutas definidas primero
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/INTERPRETAR', express.static(path.join(__dirname, 'INTERPRETAR')));

// Ruta general para archivos estáticos en la raíz del proyecto
app.use(express.static(path.join(__dirname, 'dist'), { 
  extensions: ['html', 'js', 'css', 'json'],
  index: false
}));

// Manejador específico para siarp_acciones.json que estaba dando error
app.get('/siarp_acciones.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'siarp_acciones.json'));
});

// Middleware para manejar errores 500
app.use((err, req, res, next) => {
  console.error('Error en el servidor:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Por favor contacte al administrador'
  });
});

// Ruta comodín como fallback (DEBE ir al final)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});