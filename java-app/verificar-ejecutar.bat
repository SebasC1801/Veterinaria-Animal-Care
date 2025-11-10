@echo off
chcp 65001 >nul
echo ============================================================
echo   Verificación y Ejecución - Veterinaria AnimalCare
echo ============================================================
echo.

REM Verificar Java
echo [1/3] Verificando Java...
java -version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Java no está instalado o no está en el PATH
    echo.
    echo Por favor instale Java 11 o superior desde:
    echo https://adoptium.net/ o https://www.oracle.com/java/
    echo.
    pause
    exit /b 1
)
echo ✅ Java detectado correctamente
java -version
echo.

REM Verificar Maven
echo [2/3] Verificando Maven...
mvn --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Maven no está instalado o no está en el PATH
    echo.
    echo OPCIONES:
    echo.
    echo Opción 1: Instalar Maven
    echo   1. Descargar desde: https://maven.apache.org/download.cgi
    echo   2. Extraer en una carpeta (ej: C:\Program Files\Apache\maven)
    echo   3. Agregar a PATH: C:\Program Files\Apache\maven\bin
    echo   4. Reiniciar la terminal
    echo.
    echo Opción 2: Usar Maven Wrapper (si está disponible)
    echo   .\mvnw.cmd spring-boot:run
    echo.
    echo Opción 3: Ejecutar JAR compilado (si existe)
    echo   java -jar target\veterinary-system-1.0.0.jar
    echo.
    pause
    exit /b 1
)
echo ✅ Maven detectado correctamente
mvn --version
echo.

REM Verificar si existe JAR compilado
echo [3/3] Verificando JAR compilado...
if exist "target\veterinary-system-1.0.0.jar" (
    echo ✅ JAR encontrado. Puede ejecutarse directamente.
    echo.
    echo ¿Desea ejecutar el JAR directamente? (S/N)
    set /p ejecutarJar=
    if /i "%ejecutarJar%"=="S" (
        echo.
        echo Ejecutando aplicación desde JAR...
        echo La aplicación estará disponible en: http://localhost:8085
        echo Presione Ctrl+C para detener el servidor
        echo.
        java -jar target\veterinary-system-1.0.0.jar
        pause
        exit /b 0
    )
) else (
    echo ⚠ JAR no encontrado. Se compilará con Maven.
)

REM Compilar y ejecutar con Maven
echo.
echo Compilando y ejecutando la aplicación con Maven...
echo La aplicación estará disponible en: http://localhost:8085
echo Presione Ctrl+C para detener el servidor
echo.
mvn spring-boot:run

pause

