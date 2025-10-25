@echo off
echo ========================================
echo   Veterinary Application - Simple Java
echo ========================================
echo.

REM Check if Java is available
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java not found. Please install Java 8 or higher.
    pause
    exit /b 1
)

echo Java found. Compiling application...

REM Create output directory
if not exist "target\classes" mkdir target\classes

REM Compile the application
echo Compiling Java files...
javac -cp "src\main\java" -d "target\classes" src\main\java\com\veterinary\patterns\*.java src\main\java\com\veterinary\patterns\*\*.java 2>compile_errors.txt

if %errorlevel% neq 0 (
    echo ERROR: Compilation failed. Check compile_errors.txt for details.
    type compile_errors.txt
    pause
    exit /b 1
)

echo Compilation successful!
echo.

REM Run the simple application
echo Starting Veterinary Application...
echo.
java -cp "target\classes" com.veterinary.patterns.SimpleVeterinaryApp

echo.
echo Application completed!
pause
