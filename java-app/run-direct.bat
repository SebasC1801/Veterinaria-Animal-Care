@echo off
echo ========================================
echo   Veterinary Application - Direct Run
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

REM Copy resources
echo Copying resources...
if not exist "target\classes\static" mkdir target\classes\static
if not exist "target\classes\templates" mkdir target\classes\templates
xcopy "src\main\resources\static" "target\classes\static" /E /I /Q >nul
xcopy "src\main\resources\templates" "target\classes\templates" /E /I /Q >nul

echo.
echo Starting application...
echo Application will be available at: http://localhost:8080
echo Press Ctrl+C to stop the application
echo.

REM Run the application
java -cp "target\classes" com.veterinary.patterns.VeterinaryPatternsApplication

pause
