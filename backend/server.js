const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase } = require('./database');
const config = require('./config');

// Load environment variables
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const publicationsRoutes = require('./routes/publications');
const servicesRoutes = require('./routes/services');
const experiencesRoutes = require('./routes/experiences');
const physiciansRoutes = require('./routes/physicians');
const newsRoutes = require('./routes/news');
const galleryRoutes = require('./routes/gallery');
const testimonialsRoutes = require('./routes/testimonials');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from dist folder in production
if (config.server.env === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/publications', publicationsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/experiences', experiencesRoutes);
app.use('/api/physicians', physiciansRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'DAMC Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  // In production, serve index.html for non-API routes (SPA fallback)
  if (config.server.env === 'production' && !req.originalUrl.startsWith('/api')) {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ 
      error: 'Not found',
      message: 'The requested resource was not found' 
    });
  }
});

// Start server
const startServer = async () => {
  try {
    // Initialize database
    await initDatabase();
    
    // Start listening
    const PORT = config.server.port;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`📁 Upload directory: ${path.join(__dirname, 'uploads')}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer();

module.exports = app;
