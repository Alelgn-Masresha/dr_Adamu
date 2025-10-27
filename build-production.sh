#!/bin/bash

# Production Build Script for cPanel Deployment

echo "🚀 Starting production build process..."

# Build frontend
echo "📦 Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Create deployment package
echo "📁 Creating deployment package..."
mkdir -p deployment-package

# Copy backend files
echo "📋 Copying backend files..."
cp -r backend deployment-package/
cp env.production.example deployment-package/backend/.env.example
cp CPANEL_DEPLOYMENT.md deployment-package/

# Copy frontend build
echo "📋 Copying frontend build..."
cp -r dist deployment-package/frontend

# Copy environment examples
cp env.local.example deployment-package/frontend/.env.local.example

# Create deployment info
echo "📝 Creating deployment info..."
cat > deployment-package/DEPLOYMENT_INFO.txt << EOF
Deployment Package Created: $(date)
Frontend Build: dist/
Backend: backend/
Environment Files: .env.example files included
Deployment Guide: CPANEL_DEPLOYMENT.md

Next Steps:
1. Upload backend/ folder to your cPanel
2. Upload frontend/ contents to public_html/
3. Set up database and environment variables
4. Follow CPANEL_DEPLOYMENT.md for detailed instructions
EOF

echo "✅ Deployment package created in 'deployment-package/' folder"
echo "📖 See CPANEL_DEPLOYMENT.md for detailed deployment instructions"





