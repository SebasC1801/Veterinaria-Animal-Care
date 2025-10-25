@echo off
echo ========================================
echo   Veterinary Management System - Clean
echo ========================================
echo.

REM Check if Maven is available
where mvn >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Maven not found in PATH.
    echo.
    echo Please install Maven and add it to your PATH, or use an IDE to run:
    echo   com.veterinary.patterns.clean.CleanVeterinaryApplication
    echo.
    echo Download Maven from: https://maven.apache.org/download.cgi
    pause
    exit /b 1
)

echo Compiling clean application...
mvn clean compile -q
if %errorlevel% neq 0 (
    echo ERROR: Compilation failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application...
echo Application will be available at: http://localhost:8080
echo Press Ctrl+C to stop the application
echo.

mvn spring-boot:run -Dspring-boot.run.main-class=com.veterinary.patterns.VeterinaryPatternsApplication

pause
