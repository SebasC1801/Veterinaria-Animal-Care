@echo off
echo ========================================
echo   Testing Veterinary Application
echo ========================================
echo.

REM Check if Java is running
echo Checking if Java application is running...
netstat -an | findstr :8080
if %errorlevel% equ 0 (
    echo Application appears to be running on port 8080
    echo.
    echo Testing endpoints...
    echo.
    
    REM Test main page
    echo Testing main page...
    curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:8080/
    echo.
    
    REM Test registration page
    echo Testing registration page...
    curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:8080/registro
    echo.
    
    REM Test API endpoint
    echo Testing API endpoint...
    curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:8080/api/breeds?animalType=dog
    echo.
    
    echo If you see HTTP Status: 200, the application is working correctly.
    echo If you see other status codes, there might be an issue.
    echo.
    echo You can also test manually by opening: http://localhost:8080
) ELSE (
    echo No application found running on port 8080
    echo Please start the application first using: run-clean.bat
)

pause
