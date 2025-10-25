@echo off
echo ========================================
echo   SISTEMA VETERINARIO - PATRONES JAVA
echo ========================================
echo.

echo Compilando proyecto...
cd java-app
call mvn clean compile -q

if %ERRORLEVEL% neq 0 (
    echo Error al compilar el proyecto
    pause
    exit /b 1
)

echo.
echo ✓ Compilación exitosa
echo.

echo Ejecutando aplicación interactiva...
echo.
java -cp "target/classes;target/dependency/*" com.veterinary.VeterinaryManagementSystem

echo.
echo ========================================
echo   APLICACIÓN FINALIZADA
echo ========================================
pause
