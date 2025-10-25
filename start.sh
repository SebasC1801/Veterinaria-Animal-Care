#!/bin/bash

echo "============================================================"
echo "Gestor de Mascotas Veterinaria - Aplicación Web"
echo "============================================================"
echo

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null; then
    if ! command -v python &> /dev/null; then
        echo "Error: Python no está instalado"
        echo "Por favor instale Python desde https://python.org"
        exit 1
    else
        PYTHON_CMD="python"
    fi
else
    PYTHON_CMD="python3"
fi

echo "Python detectado correctamente"
echo

# Verificar si las dependencias están instaladas
$PYTHON_CMD -c "import flask" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "Instalando dependencias..."
    $PYTHON_CMD install_dependencies.py
    if [ $? -ne 0 ]; then
        echo "Error al instalar dependencias"
        exit 1
    fi
fi

echo "Iniciando aplicación web..."
echo
echo "La aplicación estará disponible en: http://localhost:5000"
echo "Presiona Ctrl+C para detener el servidor"
echo

# Ejecutar la aplicación web
$PYTHON_CMD run_web.py








