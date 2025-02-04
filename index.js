const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 8080;

// Log when server starts (this will help us debug)
console.log('Server starting up...');

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
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});