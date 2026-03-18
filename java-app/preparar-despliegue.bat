@echo off
echo ========================================
echo Preparando aplicacion para despliegue
echo ========================================
echo.

set MAVEN_HOME=%~dp0vendor\apache-maven-3.9.9
set PATH=%MAVEN_HOME%\bin;%PATH%

echo [1/3] Limpiando compilaciones anteriores...
call "%MAVEN_HOME%\bin\mvn.cmd" clean

echo.
echo [2/3] Compilando aplicacion (sin tests)...
call "%MAVEN_HOME%\bin\mvn.cmd" package -DskipTests

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: La compilacion fallo.
    pause
    exit /b 1
)

echo.
echo [3/3] Verificando JAR generado...
if exist "target\veterinary-system-1.0.0.jar" (
    echo.
    echo ========================================
    echo EXITO! Aplicacion lista para desplegar
    echo ========================================
    echo.
    echo Archivo generado:
    echo   target\veterinary-system-1.0.0.jar
    echo.
    echo Tamano:
    dir target\veterinary-system-1.0.0.jar | find "veterinary-system"
    echo.
    echo Archivos de configuracion creados:
    echo   - Procfile (Heroku/Railway)
    echo   - Dockerfile (Docker/Cloud Run)
    echo   - system.properties (Heroku)
    echo.
    echo Siguiente paso:
    echo   1. Sube tu codigo a GitHub
    echo   2. Sigue la guia en GUIA_DESPLIEGUE.md
    echo.
) else (
    echo ERROR: No se genero el JAR
)

pause
