@echo off
echo Compilando y ejecutando la aplicacion de escritorio...
mvn clean compile exec:java -Dexec.mainClass="com.veterinary.Main"
pause