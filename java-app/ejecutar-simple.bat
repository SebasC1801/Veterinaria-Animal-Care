@echo off
echo ========================================
echo Sistema Veterinario - Modo Sin BD
echo ========================================
echo.
echo Compilando y ejecutando con Maven local...
echo.

set MAVEN_HOME=%~dp0vendor\apache-maven-3.9.9
set PATH=%MAVEN_HOME%\bin;%PATH%

echo Usuarios de prueba disponibles:
echo   Veterinario: veterinario@test.com / 123456
echo   Usuario: usuario@test.com / 123456
echo.
echo La aplicacion estara en: http://localhost:8086
echo.
echo Presiona Ctrl+C para detener
echo ========================================
echo.

call "%MAVEN_HOME%\bin\mvn.cmd" spring-boot:run

pause
