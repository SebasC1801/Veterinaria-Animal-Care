@echo off
echo ============================================================
echo Gestor de Mascotas Veterinaria - Aplicacion Java
echo ============================================================
echo.

REM Verificar si Java esta instalado
java -version >nul 2>&1
if errorlevel 1 (
    echo Error: Java no esta instalado o no esta en el PATH
    echo Por favor instale Java JDK desde https://adoptium.net/
    pause
    exit /b 1
)

echo Java detectado correctamente
echo.

REM Verificar si Maven esta instalado
mvn -version >nul 2>&1
if errorlevel 1 (
    echo Error: Maven no esta instalado o no esta en el PATH
    echo Por favor instale Maven desde https://maven.apache.org/download.cgi
    pause
    exit /b 1
)

echo Maven detectado correctamente
echo.

REM Verificar si las dependencias estan instaladas
if not exist "java-app\target" (
    echo Instalando dependencias...
    call java-app\install_dependencies.bat
    if errorlevel 1 (
        echo Error al instalar dependencias
        pause
        exit /b 1
    )
)

echo.
echo Seleccione una opcion:
echo 1. Iniciar aplicacion de escritorio
echo 2. Iniciar aplicacion web
echo 3. Ejecutar ejemplo de uso
echo 4. Salir
echo.

set /p opcion="Seleccione una opcion (1-4): "

if "%opcion%"=="1" (
    echo.
    echo Iniciando aplicacion de escritorio...
    call java-app\run.bat
) else if "%opcion%"=="2" (
    echo.
    echo Iniciando aplicacion web...
    echo La aplicacion estara disponible en: http://localhost:8080
    echo Presiona Ctrl+C para detener el servidor
    echo.
    call run_web.bat
) else if "%opcion%"=="3" (
    echo.
    echo Ejecutando ejemplo de uso...
    cd java-app
    call mvn exec:java -Dexec.mainClass="com.veterinary.EjemploUso"
    cd ..
) else if "%opcion%"=="4" (
    echo Saliendo...
    exit /b 0
) else (
    echo Opcion no valida
)

pause
