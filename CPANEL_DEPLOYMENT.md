# cPanel Deployment Guide

## Prerequisites
- cPanel hosting account with Node.js support
- PostgreSQL database access
- File Manager access
- Terminal/SSH access (if available)

## Deployment Steps

### 1. Database Setup
1. **Create PostgreSQL Database in cPanel:**
   - Go to PostgreSQL Databases
   - Create a new database (e.g., `yourdomain_habtamu`)
   - Create a database user
   - Assign user to database with ALL PRIVILEGES

2. **Import Database Schema:**
   ```sql
   -- Run the SQL commands from db/schema.sql
   -- This will create all necessary tables
   ```

### 2. Backend Deployment

1. **Upload Backend Files:**
   - Upload the entire `backend/` folder to your cPanel
   - Recommended location: `public_html/api/` or `public_html/backend/`

2. **Install Dependencies:**
   ```bash
   cd backend
   npm install --production
   ```

3. **Set Environment Variables:**
   - Copy `env.production.example` to `.env`
   - Update with your actual database credentials and domain:
   ```env
   NODE_ENV=production
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=yourdomain_habtamu
   DB_USER=yourdomain_user
   DB_PASSWORD=your_secure_password
   JWT_SECRET=your-super-secure-jwt-secret-key
   API_BASE_URL=https://yourdomain.com/api
   UPLOADS_BASE_URL=https://yourdomain.com/uploads
   ```

4. **Create Initial Admin User:**
   ```bash
   node scripts/createInitialAdmin.js
   ```

5. **Start the Backend:**
   ```bash
   npm start
   ```

### 3. Frontend Deployment

1. **Build the Frontend:**
   ```bash
   npm run build
   ```

2. **Set Frontend Environment Variables:**
   - Copy `env.local.example` to `.env.local`
   - Update with your domain:
   ```env
   VITE_API_BASE_URL=https://yourdomain.com/api
   VITE_UPLOADS_BASE_URL=https://yourdomain.com/uploads
   ```

3. **Upload Built Files:**
   - Upload the contents of `dist/` folder to `public_html/`
   - This includes: `index.html`, `assets/`, `src/` folders

### 4. File Permissions
Set proper permissions for uploads directory:
```bash
chmod 755 backend/uploads
chmod 644 backend/uploads/*
```

### 5. SSL Configuration
- Ensure your domain has SSL certificate
- Update all URLs to use `https://` instead of `http://`

### 6. Domain Configuration

**Option A: Subdomain Setup**
- Backend: `api.yourdomain.com` → points to backend folder
- Frontend: `yourdomain.com` → points to dist folder

**Option B: Same Domain Setup**
- Backend: `yourdomain.com/api/` → backend folder
- Frontend: `yourdomain.com/` → dist folder

### 7. Testing Deployment

1. **Test Backend API:**
   ```bash
   curl https://yourdomain.com/api/health
   ```

2. **Test Frontend:**
   - Visit `https://yourdomain.com`
   - Check browser console for any errors
   - Test admin login functionality

### 8. Troubleshooting

**Common Issues:**

1. **CORS Errors:**
   - Update CORS settings in `backend/server.js`
   - Add your domain to allowed origins

2. **File Upload Issues:**
   - Check uploads directory permissions
   - Verify file size limits

3. **Database Connection:**
   - Verify database credentials
   - Check if PostgreSQL is running

4. **Environment Variables:**
   - Ensure all required variables are set
   - Check for typos in variable names

### 9. Security Considerations

1. **Change Default Passwords:**
   - Update JWT secret
   - Use strong database passwords
   - Change default admin credentials

2. **File Security:**
   - Restrict access to sensitive files
   - Use proper file permissions

3. **HTTPS:**
   - Force HTTPS redirects
   - Use secure cookies

## Maintenance

### Regular Tasks:
1. **Backup Database:**
   ```bash
   pg_dump yourdomain_habtamu > backup.sql
   ```

2. **Update Dependencies:**
   ```bash
   npm update
   ```

3. **Monitor Logs:**
   - Check error logs regularly
   - Monitor file uploads

### Performance Optimization:
1. **Enable Gzip Compression**
2. **Set up CDN for static assets**
3. **Optimize images**
4. **Use database connection pooling**

## Support
For deployment issues, check:
- cPanel error logs
- Browser developer console
- Backend console output
- Database connection status




