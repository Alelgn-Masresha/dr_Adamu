# DHMC Backend API

Express.js backend API for the DHMC (Dr. Adamu Medium Clinic) website with PostgreSQL database.

## Features

- RESTful API endpoints for all admin functionality
- PostgreSQL database integration
- File upload handling with Multer
- CORS enabled for frontend integration
- Error handling and validation
- Database schema initialization

## Database Configuration

- **Host**: localhost
- **Port**: 5432
- **Database**: db_habtamu
- **User**: postgres
- **Password**: kokeb

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure PostgreSQL is running and create the database:
```sql
CREATE DATABASE db_habtamu;
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Publications
- `GET /api/publications` - Get all publications
- `GET /api/publications/:id` - Get publication by ID
- `POST /api/publications` - Create new publication
- `PUT /api/publications/:id` - Update publication
- `DELETE /api/publications/:id` - Delete publication

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service (with file upload)
- `PUT /api/services/:id` - Update service (with file upload)
- `DELETE /api/services/:id` - Delete service

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID
- `POST /api/experiences` - Create new experience
- `PUT /api/experiences/:id` - Update experience
- `DELETE /api/experiences/:id` - Delete experience

### Physicians
- `GET /api/physicians` - Get all physicians
- `GET /api/physicians/:id` - Get physician by ID
- `POST /api/physicians` - Create new physician (with file upload)
- `PUT /api/physicians/:id` - Update physician (with file upload)
- `DELETE /api/physicians/:id` - Delete physician

### News
- `GET /api/news` - Get all news articles
- `GET /api/news/:id` - Get news article by ID
- `POST /api/news` - Create new news article (with file upload)
- `PUT /api/news/:id` - Update news article (with file upload)
- `DELETE /api/news/:id` - Delete news article

### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get gallery item by ID
- `POST /api/gallery` - Upload new media (with file upload)
- `PUT /api/gallery/:id` - Update gallery item (with file upload)
- `DELETE /api/gallery/:id` - Delete gallery item

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get testimonial by ID
- `POST /api/testimonials` - Create new testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### Health Check
- `GET /api/health` - Server health status

## File Uploads

- Files are uploaded to the `uploads/` directory
- Supported file types: images (JPEG, PNG, GIF), videos (MP4), PDFs
- Maximum file size: 10MB
- Files are served statically at `/uploads/:filename`

## Environment Variables

Create a `.env` file in the backend directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=db_habtamu
DB_USER=postgres
DB_PASSWORD=kokeb
PORT=5000
NODE_ENV=development
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
```

## Database Schema

The database schema is automatically initialized from `../db/schema.sql` when the server starts.

## Error Handling

All endpoints include proper error handling with appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## CORS

CORS is enabled to allow requests from the frontend running on different ports.
