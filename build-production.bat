@echo off
echo 🚀 Starting production build process...

REM Build frontend
echo 📦 Building frontend...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Frontend build failed
    exit /b 1
)

echo ✅ Frontend build successful

REM Create deployment package
echo 📁 Creating deployment package...
if exist deployment-package rmdir /s /q deployment-package
mkdir deployment-package

REM Copy backend files
echo 📋 Copying backend files...
xcopy backend deployment-package\backend /e /i /q
copy env.production.example deployment-package\backend\.env.example
copy CPANEL_DEPLOYMENT.md deployment-package\

REM Copy frontend build
echo 📋 Copying frontend build...
xcopy dist deployment-package\frontend /e /i /q
copy env.local.example deployment-package\frontend\.env.local.example

REM Create deployment info
echo 📝 Creating deployment info...
echo Deployment Package Created: %date% %time% > deployment-package\DEPLOYMENT_INFO.txt
echo Frontend Build: dist/ >> deployment-package\DEPLOYMENT_INFO.txt
echo Backend: backend/ >> deployment-package\DEPLOYMENT_INFO.txt
echo Environment Files: .env.example files included >> deployment-package\DEPLOYMENT_INFO.txt
echo Deployment Guide: CPANEL_DEPLOYMENT.md >> deployment-package\DEPLOYMENT_INFO.txt
echo. >> deployment-package\DEPLOYMENT_INFO.txt
echo Next Steps: >> deployment-package\DEPLOYMENT_INFO.txt
echo 1. Upload backend/ folder to your cPanel >> deployment-package\DEPLOYMENT_INFO.txt
echo 2. Upload frontend/ contents to public_html/ >> deployment-package\DEPLOYMENT_INFO.txt
echo 3. Set up database and environment variables >> deployment-package\DEPLOYMENT_INFO.txt
echo 4. Follow CPANEL_DEPLOYMENT.md for detailed instructions >> deployment-package\DEPLOYMENT_INFO.txt

echo ✅ Deployment package created in 'deployment-package/' folder
echo 📖 See CPANEL_DEPLOYMENT.md for detailed deployment instructions
pause





