@echo off
echo ========================================
echo   Creating Executable JAR
echo ========================================
echo.

echo This script will create a simple executable JAR file
echo that you can run with: java -jar veterinary-app.jar
echo.

REM Check if Java is available
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java not found. Please install Java 8 or higher.
    pause
    exit /b 1
)

echo Java found. Creating executable JAR...

REM Create manifest file
echo Main-Class: com.veterinary.patterns.SimpleVeterinaryApp > manifest.txt

REM Create JAR file
echo Creating JAR file...
jar cfm veterinary-app.jar manifest.txt -C target/classes .

if %errorlevel% neq 0 (
    echo ERROR: Failed to create JAR file.
    echo Make sure to run compile-simple.bat first.
    pause
    exit /b 1
)

echo.
echo ✓ JAR file created successfully: veterinary-app.jar
echo.
echo To run the application:
echo   java -jar veterinary-app.jar
echo.

pause
