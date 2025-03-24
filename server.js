import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Configuración inicial de ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// 1. Middlewares esenciales
// --------------------------
// CORS robusto
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Logging detallado
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Configuración de tipos MIME personalizados
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

// Middleware de respuestas JSON estructuradas
app.use((req, res, next) => {
  res.sendJSON = (data, statusCode = 200) => {
    res.status(statusCode).json({
      status: statusCode === 200 ? 'ok' : 'error',
      data: data || null,
      timestamp: new Date().toISOString()
    });
  };
  
  res.sendError = (message, statusCode = 500) => {
    res.status(statusCode).json({
      status: 'error',
      message: message,
      code: statusCode
    });
  };
  next();
});

// 2. Configuración de archivos estáticos
// --------------------------------------
const staticConfig = {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath);
    if (ext === '.js') {
      res.header('Content-Type', 'application/javascript');
    }
  }
};

app.use('/dist', express.static(path.join(__dirname, 'dist'), staticConfig));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/INTERPRETAR', express.static(path.join(__dirname, 'INTERPRETAR')));
app.use('/models', express.static(path.join(__dirname, 'models')));
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));

// 3. Endpoints específicos
// -------------------------
// Endpoints de verificación
app.get('/check-avatar', (req, res) => {
  const avatarPath = path.join(__dirname, 'public', 'Ashtra.vrm');
  try {
    const exists = fs.existsSync(avatarPath);
    res.sendJSON({
      exists: exists,
      path: avatarPath,
      message: exists ? 'Avatar disponible' : 'Avatar no encontrado'
    });
  } catch (error) {
    res.sendError(`Error verificando avatar: ${error.message}`, 500);
  }
});

// Endpoints de modelos y avatares
app.get('/Ashtra.vrm', (req, res) => {
  const avatarPath = path.join(__dirname, 'public', 'Ashtra.vrm');
  if (fs.existsSync(avatarPath)) {
    console.log(`Sirviendo archivo VRM desde: ${avatarPath}`);
    res.sendFile(avatarPath);
  } else {
    res.sendError('Archivo Ashtra.vrm no encontrado', 404);
  }
});

app.get('/avatar/:filename', (req, res) => {
  const filename = req.params.filename;
  const avatarPath = path.join(__dirname, 'avatars', filename);
  
  if (!fs.existsSync(avatarPath)) {
    return res.sendError('Avatar no encontrado', 404);
  }
  
  console.log(`Sirviendo avatar: ${filename}`);
  res.sendFile(avatarPath);
});

// Endpoints de scripts
app.get('/script.js', (req, res) => {
  const scriptPath = path.join(__dirname, 'public', 'script.js');
  if (fs.existsSync(scriptPath)) {
    console.log('Enviando script.js local');
    res.sendFile(scriptPath);
  } else {
    console.warn('script.js no encontrado, enviando respuesta alternativa');
    res.sendError('Script principal no disponible', 404);
  }
});

app.get('/script-loader.js', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'script-loader.js');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.send(`
      console.log('Cargando dependencias desde CDN...');
      async function loadDependencies() {
        try {
          await Promise.all([
            loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3/camera_utils.js'),
            loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3/drawing_utils.js'),
            loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5/holistic.js'),
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js')
          ]);
          console.log('Dependencias cargadas');
          document.getElementById('loading').style.display = 'none';
        } catch(error) {
          console.error('Error cargando dependencias:', error);
        }
      }

      function loadScript(url) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      loadDependencies();
    `);
  }
});

// Redirecciones a CDN
const cdnRedirects = {
  '/dist/camera_utils.js': 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3/camera_utils.js',
  '/dist/drawing_utils.js': 'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3/drawing_utils.js',
  '/dist/siarp/holistic.js': 'https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5/holistic.js',
  '/INTERPRETAR/annyang.min.js': 'https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js'
};

Object.entries(cdnRedirects).forEach(([route, url]) => {
  app.get(route, (req, res) => res.redirect(url));
});

// 4. API Endpoints
// ----------------
app.get('/api/test', (req, res) => {
  res.sendJSON({ 
    status: 'active',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/data', (req, res) => {
  try {
    // Simular datos de ejemplo
    const mockData = {
      users: [],
      services: [],
      lastUpdated: new Date().toISOString()
    };
    res.sendJSON(mockData);
  } catch (error) {
    res.sendError(error.message, 500);
  }
});

app.get('/api/check-model', (req, res) => {
  const modelPath = path.join(__dirname, 'models', 'humanoid.vrm');
  try {
    const exists = fs.existsSync(modelPath);
    res.sendJSON({
      modelExists: exists,
      path: modelPath,
      message: exists ? 'Modelo disponible' : 'Modelo no encontrado'
    });
  } catch (error) {
    res.sendError(`Error verificando modelo: ${error.message}`, 500);
  }
});

app.get('/siarp_acciones.json', (req, res) => {
  res.sendJSON({
    actions: [],
    message: 'Endpoint de acciones',
    documentation: '/api/docs/actions'
  });
});

// 5. Manejo de errores y fallback
// -------------------------------
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  res.sendError('Error interno del servidor', 500);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 6. Inicialización del servidor
// ------------------------------
app.listen(port, () => {
  console.log(`🟢 Servidor activo en http://localhost:${port}`);
  console.log('🔍 Verificando recursos críticos:');

  const criticalFiles = [
    { path: 'public/Ashtra.vrm', route: '/Ashtra.vrm' },
    { path: 'dist/index.html', route: '/' },
    { path: 'public/script.js', route: '/script.js' },
    { path: 'models/humanoid.vrm', route: '/api/check-model' }
  ];

  criticalFiles.forEach(file => {
    const fullPath = path.join(__dirname, file.path);
    const exists = fs.existsSync(fullPath);
    const status = exists ? '🟢 EXISTE' : '🔴 NO EXISTE';
    console.log(`${status} ${file.path.padEnd(20)} => ${file.route}`);
  });
});