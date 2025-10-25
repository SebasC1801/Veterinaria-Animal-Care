@echo off
echo Iniciando servidor web para la aplicación de gestión clínica veterinaria...

REM Verificar si Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python no está instalado o no está en el PATH.
    echo Por favor, instala Python desde https://python.org
    pause
    exit /b 1
)

REM Iniciar el servidor web
echo Servidor iniciado en http://localhost:8000
echo Abriendo navegador...
start http://localhost:8000

REM Iniciar el servidor Python
python -m http.server 8000

pause

