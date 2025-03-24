import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Obtener el directorio actual en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware personalizado para corregir MIME types
app.use((req, res, next) => {
  const ext = path.extname(req.path).toLowerCase();
  
  if (ext === '.js') {
    res.header('Content-Type', 'application/javascript');
  } else if (ext === '.json') {
    res.header('Content-Type', 'application/json');
  } else if (ext === '.vrm') {
    res.header('Content-Type', 'model/vrm');
  } else if (ext === '.glb' || ext === '.gltf') {
    res.header('Content-Type', 'model/gltf-binary');
  } else if (ext === '.fbx') {
    res.header('Content-Type', 'application/octet-stream');
  } else if (ext === '.bin') {
    res.header('Content-Type', 'application/octet-stream');
  }
  
  next();
});

// Servir script.js con manejo especial
app.get('/script.js', (req, res) => {
  res.header('Content-Type', 'application/javascript');
  const scriptPath = path.join(__dirname, 'public', 'script.js');
  
  if (fs.existsSync(scriptPath)) {
    res.sendFile(scriptPath);
  } else {
    res.status(404).send('console.error("Error: script.js no encontrado");');
  }
});

// Servir el archivo script-loader.js especial
app.get('/script-loader.js', (req, res) => {
  res.header('Content-Type', 'application/javascript');
  try {
    const filePath = path.join(__dirname, 'public', 'script-loader.js');
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      // Si no existe, servir una versión básica
      res.send(`
        console.log('script-loader.js: Cargando dependencias desde CDN');
        
        function loadScript(url) {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
        
        async function loadAllScripts() {
          try {
            await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3/camera_utils.js');
            await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3/drawing_utils.js');
            await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5/holistic.js');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js');
            await loadScript('/script.js'); // Cargar script.js después de las dependencias
            console.log('Todas las bibliotecas cargadas correctamente');
            document.getElementById('loading').style.display = 'none';
          } catch (error) {
            console.error('Error cargando scripts:', error);
          }
        }
        
        loadAllScripts();
      `);
    }
  } catch (error) {
    res.status(500).send('Error al servir script-loader.js');
  }
});

// Servir archivos estáticos con configuración específica de tipos MIME
app.use('/dist', (req, res, next) => {
  const ext = path.extname(req.path);
  if (ext === '.js') {
    res.header('Content-Type', 'application/javascript');
  }
  next();
}, express.static(path.join(__dirname, 'dist')));

// Servir carpetas de archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/INTERPRETAR', express.static(path.join(__dirname, 'INTERPRETAR')));
app.use('/models', express.static(path.join(__dirname, 'models')));
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));

// Endpoint específico para cargar el avatar (ajusta la ruta según tu estructura)
app.get('/avatar/:filename', (req, res) => {
  const filename = req.params.filename;
  const ext = path.extname(filename).toLowerCase();
  const avatarPath = path.join(__dirname, 'avatars', filename);
  
  if (fs.existsSync(avatarPath)) {
    // Establecer el tipo MIME correcto según la extensión
    if (ext === '.vrm') {
      res.header('Content-Type', 'model/vrm');
    } else if (ext === '.glb' || ext === '.gltf') {
      res.header('Content-Type', 'model/gltf-binary');
    } else if (ext === '.fbx') {
      res.header('Content-Type', 'application/octet-stream');
    } else {
      res.header('Content-Type', 'application/octet-stream');
    }
    
    res.sendFile(avatarPath);
  } else {
    res.status(404).json({ error: 'Avatar no encontrado' });
  }
});

// Rutas específicas para los archivos problemáticos
// Si el archivo local no existe o es inválido, se servirá desde CDN
app.get('/dist/camera_utils.js', (req, res) => {
  res.header('Content-Type', 'application/javascript');
  res.redirect('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3/camera_utils.js');
});

app.get('/dist/drawing_utils.js', (req, res) => {
  res.header('Content-Type', 'application/javascript');
  res.redirect('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3/drawing_utils.js');
});

app.get('/dist/siarp/holistic.js', (req, res) => {
  res.header('Content-Type', 'application/javascript');
  res.redirect('https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5/holistic.js');
});

app.get('/INTERPRETAR/annyang.min.js', (req, res) => {
  res.header('Content-Type', 'application/javascript');
  res.redirect('https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js');
});

// Ruta para siarp_acciones.json
app.get('/siarp_acciones.json', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send('{"actions": []}');
});

// Endpoint para probar la conexión con el cliente
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

// Endpoint específico para avatar.json (para configuración del avatar)
app.get('/avatar.json', (req, res) => {
  res.header('Content-Type', 'application/json');
  
  const avatarConfigPath = path.join(__dirname, 'avatars', 'avatar.json');
  if (fs.existsSync(avatarConfigPath)) {
    res.sendFile(avatarConfigPath);
  } else {
    // Si no existe, enviar una configuración básica
    res.json({
      "model": "/avatars/default.vrm",
      "settings": {
        "scale": 1.0,
        "position": [0, 0, 0],
        "rotation": [0, 0, 0]
      }
    });
  }
});

// Ruta general para archivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta comodín como fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Ruta de script.js: http://localhost:${port}/script.js`);
  console.log(`Ruta para acceder a avatar: http://localhost:${port}/avatar/tuavatar.vrm`);
});