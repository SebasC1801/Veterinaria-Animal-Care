@echo off
echo Starting Simple Veterinary Application...
echo.

REM Check if Maven is available
where mvn >nul 2>nul
if %errorlevel% neq 0 (
    echo Maven not found in PATH. Please install Maven or use an IDE.
    echo.
    echo Alternative: Use your IDE to run the main class:
    echo   com.veterinary.patterns.VeterinaryPatternsApplication
    echo.
    echo Or install Maven and add it to your PATH.
    pause
    exit /b 1
)

echo Compiling application...
mvn clean compile
if %errorlevel% neq 0 (
    echo Compilation failed!
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application...
mvn spring-boot:run

pause
