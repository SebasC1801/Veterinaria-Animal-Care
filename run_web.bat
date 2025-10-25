@echo off
echo ===================================================
echo Iniciando aplicación web de gestión veterinaria
echo ===================================================

cd java-app

REM Verificar si Maven está instalado
where mvn >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Maven no está instalado o no está en el PATH.
    echo Por favor, instale Maven desde https://maven.apache.org/download.cgi
    echo y añádalo al PATH del sistema.
    exit /b 1
)

echo Iniciando aplicación web con Spring Boot...
call mvn clean spring-boot:run -Dspring-boot.run.mainClass="com.veterinary.web.VeterinaryWebApp"

if %ERRORLEVEL% neq 0 (
    echo Error al iniciar la aplicación web.
    exit /b 1
)

exit /b 0