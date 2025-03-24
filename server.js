import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Configuración inicial de ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// 1. Middleware de CORS robusto
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 2. Middleware de logging detallado
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// 3. Middleware para manejo de JSON y respuestas estructuradas
app.use((req, res, next) => {
  res.type('application/json');
  
  res.sendJSON = (data) => {
    if (!data) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'No se encontraron datos' 
      });
    }
    res.json(data);
  };

  next();
});

// 4. Middleware para tipos MIME personalizados
app.use((req, res, next) => {
  const ext = path.extname(req.path).toLowerCase();
  const mimeTypes = {
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.vrm': 'model/vrm',
    '.glb': 'model/gltf-binary',
    '.gltf': 'model/gltf-binary',
    '.fbx': 'application/octet-stream',
    '.bin': 'application/octet-stream'
  };

  if (mimeTypes[ext]) {
    res.header('Content-Type', mimeTypes[ext]);
  }
  next();
});

// 5. Configuración de archivos estáticos
const staticOptions = {
  setHeaders: (res, path) => {
    const ext = path.extname(path).toLowerCase();
    if (ext === '.js') {
      res.header('Content-Type', 'application/javascript');
    }
  }
};

app.use('/dist', express.static(path.join(__dirname, 'dist'), staticOptions));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/INTERPRETAR', express.static(path.join(__dirname, 'INTERPRETAR')));
app.use('/models', express.static(path.join(__dirname, 'models')));
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));

// 6. Rutas específicas
// Endpoints de verificación
app.get('/check-avatar', (req, res) => {
  const avatarPath = path.join(__dirname, 'public', 'Ashtra.vrm');
  const exists = fs.existsSync(avatarPath);
  res.json({
    status: exists ? 'ok' : 'error',
    message: exists ? 'Avatar encontrado' : 'Avatar no encontrado',
    path: avatarPath
  });
});

// Endpoints de archivos
app.get('/Ashtra.vrm', (req, res) => {
  const avatarPath = path.join(__dirname, 'public', 'Ashtra.vrm');
  if (fs.existsSync(avatarPath)) {
    res.header('Content-Type', 'model/vrm').sendFile(avatarPath);
  } else {
    res.status(404).json({ error: 'Avatar Ashtra.vrm no encontrado' });
  }
});

app.get('/avatar/:filename', (req, res) => {
  const filename = req.params.filename;
  const avatarPath = path.join(__dirname, 'avatars', filename);
  
  if (fs.existsSync(avatarPath)) {
    res.sendFile(avatarPath);
  } else {
    res.status(404).json({ error: 'Avatar no encontrado' });
  }
});

// Endpoints de scripts
app.get('/script.js', (req, res) => {
  const scriptPath = path.join(__dirname, 'public', 'script.js');
  if (fs.existsSync(scriptPath)) {
    res.sendFile(scriptPath);
  } else {
    res.status(404).send('console.error("Error: script.js no encontrado");');
  }
});

app.get('/script-loader.js', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'script-loader.js');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.send(`
      console.log('script-loader.js: Cargando dependencias desde CDN');
      // ... (código de carga de dependencias)
    `);
  }
});

// Redirecciones a CDN
app.get('/dist/camera_utils.js', (req, res) => {
  res.redirect('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3/camera_utils.js');
});

app.get('/dist/drawing_utils.js', (req, res) => {
  res.redirect('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3/drawing_utils.js');
});

app.get('/dist/siarp/holistic.js', (req, res) => {
  res.redirect('https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5/holistic.js');
});

app.get('/INTERPRETAR/annyang.min.js', (req, res) => {
  res.redirect('https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js');
});

// 7. API Endpoints
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

app.get('/api/data', (req, res) => {
  try {
    res.json({
      status: 'ok',
      data: { status: 'success', payload: [] }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      data: null
    });
  }
});

app.get('/api/check-model', (req, res) => {
  const modelPath = path.join(__dirname, 'models', 'humanoid.vrm');
  try {
    res.json({
      status: 'ok',
      modelExists: fs.existsSync(modelPath),
      path: modelPath
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al verificar el modelo',
      details: error.message
    });
  }
});

// 8. Ruta comodín como fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 9. Inicialización del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  // Verificación de archivos importantes
  const archivosImportantes = [
    {ruta: path.join(__dirname, 'public', 'Ashtra.vrm'), nombre: 'Avatar Ashtra.vrm'},
    {ruta: path.join(__dirname, 'dist', 'index.html'), nombre: 'HTML principal'},
    {ruta: path.join(__dirname, 'public', 'script.js'), nombre: 'Script principal'}
  ];
  
  archivosImportantes.forEach(archivo => {
    console.log(`- ${archivo.nombre}: ${fs.existsSync(archivo.ruta) ? 'EXISTE' : 'NO EXISTE'}`);
  });
});