module.exports = {
  // Database Configuration
  database: process.env.DATABASE_URL ? {
    // Use connection string for deployment (Heroku, Railway, etc.)
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    // Connection pool settings for production
    max: process.env.DB_MAX_CONNECTIONS || 20,
    idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT || 30000,
    connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT || 2000,
  } : {
    // Use individual parameters for local development
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'habtamu_db_web',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    // Connection pool settings for development
    max: process.env.DB_MAX_CONNECTIONS || 10,
    idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT || 30000,
    connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT || 2000,
  },
  
  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'production'
  },
  
  // File Upload Configuration
  upload: {
    dir: process.env.UPLOAD_DIR || 'uploads',
    maxFileSize: process.env.MAX_FILE_SIZE || 10485760 // 10MB
  },
  
  // API Configuration
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:5000/api',
    uploadsBaseUrl: process.env.UPLOADS_BASE_URL || 'http://localhost:5000/uploads'
  },
  
  // Authentication Configuration
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    tokenExpiry: process.env.JWT_EXPIRY || '24h'
  }
};
