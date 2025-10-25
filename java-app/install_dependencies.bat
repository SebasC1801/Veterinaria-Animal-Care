@echo off
echo ===================================================
echo Instalando dependencias para la aplicación Java
echo ===================================================

REM Verificar si Maven está instalado
where mvn >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Maven no está instalado o no está en el PATH.
    echo Por favor, instale Maven desde https://maven.apache.org/download.cgi
    echo y añádalo al PATH del sistema.
    exit /b 1
)

echo Instalando dependencias con Maven...
cd java-app
call mvn clean install -DskipTests

if %ERRORLEVEL% neq 0 (
    echo Error al instalar dependencias.
    exit /b 1
)

echo.
echo ===================================================
echo Dependencias instaladas correctamente.
echo ===================================================
echo.
echo Puede ejecutar la aplicación con:
echo   - Aplicación de escritorio: run.bat
echo   - Aplicación web: run-web.bat
echo.

exit /b 0