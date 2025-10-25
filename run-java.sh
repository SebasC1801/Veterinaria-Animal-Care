#!/bin/bash

echo "============================================================"
echo "Gestor de Mascotas Veterinaria - Aplicación Java Web"
echo "============================================================"
echo

# Verificar si Java está instalado
if ! command -v java &> /dev/null; then
    echo "Error: Java no está instalado"
    echo "Por favor instale Java 11 o superior desde https://openjdk.java.net"
    exit 1
fi

echo "Java detectado correctamente"
echo

# Verificar si Maven está instalado
if ! command -v mvn &> /dev/null; then
    echo "Error: Maven no está instalado"
    echo "Por favor instale Maven desde https://maven.apache.org"
    exit 1
fi

echo "Maven detectado correctamente"
echo

# Navegar al directorio de la aplicación Java
cd java-app

echo "Compilando y ejecutando la aplicación..."
echo
echo "La aplicación estará disponible en: http://localhost:8080"
echo "Presiona Ctrl+C para detener el servidor"
echo

# Ejecutar la aplicación con Maven
mvn spring-boot:run
