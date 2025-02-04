import express from 'express';
import path from 'path';
import compression from 'compression';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Log when server starts (this will help us debug)
console.log('Server starting up...');
console.log('PORT environment variable:', process.env.PORT);

// Enable gzip compression
app.use(compression());

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'dist')));
console.log('Static directory set to:', path.join(__dirname, 'dist'));

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
  console.log('Received request for:', req.url);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Server address:', server.address());
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});