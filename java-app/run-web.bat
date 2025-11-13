@echo off
chcp 65001 >nul
setlocal
echo Iniciando backend Spring Boot en http://localhost:8085

java -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Java no está instalado o no está en el PATH.
  exit /b 1
)

if exist "target\veterinary-system-1.0.0.jar" (
  echo Ejecutando JAR...
  java -jar target\veterinary-system-1.0.0.jar
  exit /b %errorlevel%
)

set "MAVEN_LOCAL_DIR=vendor\apache-maven-3.9.9"
set "MVN_CMD=mvn"
if exist "%MAVEN_LOCAL_DIR%\bin\mvn.cmd" (
  set "MVN_CMD=%MAVEN_LOCAL_DIR%\bin\mvn.cmd"
)

"%MVN_CMD%" -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Maven no está instalado o no está en el PATH.
  echo Instale Maven y vuelva a ejecutar este script.
  exit /b 1
)

echo Ejecutando con Maven...
call "%MVN_CMD%" -q spring-boot:run -DskipTests
exit /b %ERRORLEVEL%

