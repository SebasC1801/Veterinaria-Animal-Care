@echo off
echo ========================================
echo   Veterinary Application Diagnostics
echo ========================================
echo.

echo 1. Checking Java processes...
tasklist | findstr java.exe
echo.

echo 2. Checking port 8080...
netstat -an | findstr :8080
echo.

echo 3. Checking application files...
if exist "src\main\java\com\veterinary\patterns\VeterinaryPatternsApplication.java" (
    echo ✓ Main application class found
) else (
    echo ✗ Main application class NOT found
)

if exist "src\main\resources\templates\index.html" (
    echo ✓ Index template found
) else (
    echo ✗ Index template NOT found
)

if exist "src\main\resources\static\css\style.css" (
    echo ✓ CSS file found
) else (
    echo ✗ CSS file NOT found
)

if exist "src\main\resources\static\js\main.js" (
    echo ✓ JavaScript file found
) else (
    echo ✗ JavaScript file NOT found
)

echo.
echo 4. Testing endpoints (if application is running)...
curl -s -o nul -w "Main page (/) - HTTP Status: %%{http_code}\n" http://localhost:8080/ 2>nul
curl -s -o nul -w "Test page (/test) - HTTP Status: %%{http_code}\n" http://localhost:8080/test 2>nul
curl -s -o nul -w "Simple registration (/registro-simple) - HTTP Status: %%{http_code}\n" http://localhost:8080/registro-simple 2>nul

echo.
echo 5. Recommendations:
echo    - If HTTP Status is 200: Application is working correctly
echo    - If HTTP Status is 404: Check if routes are properly configured
echo    - If HTTP Status is 500: Check server logs for errors
echo    - If no response: Application might not be running
echo.
echo 6. Manual testing URLs:
echo    - Main page: http://localhost:8080/
echo    - Test page: http://localhost:8080/test
echo    - Simple registration: http://localhost:8080/registro-simple
echo    - Registration: http://localhost:8080/registro
echo    - Records: http://localhost:8080/registros
echo.

pause
