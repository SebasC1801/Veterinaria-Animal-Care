@echo off
echo ============================================================
echo Gestor de Mascotas Veterinaria - Aplicacion Java Web
echo ============================================================
echo.

REM Verificar si Java esta instalado
java -version >nul 2>&1
if errorlevel 1 (
    echo Error: Java no esta instalado o no esta en el PATH
    echo Por favor instale Java 11 o superior desde https://openjdk.java.net
    pause
    exit /b 1
)

echo Java detectado correctamente
echo.

REM Verificar si Maven esta instalado
mvn --version >nul 2>&1
if errorlevel 1 (
    echo Error: Maven no esta instalado o no esta en el PATH
    echo Por favor instale Maven desde https://maven.apache.org
    pause
    exit /b 1
)

echo Maven detectado correctamente
echo.

REM Navegar al directorio de la aplicacion Java
cd java-app

echo Compilando y ejecutando la aplicacion...
echo.
echo La aplicacion estara disponible en: http://localhost:8080
echo Presiona Ctrl+C para detener el servidor
echo.

REM Ejecutar la aplicacion con Maven
mvn spring-boot:run

pause
