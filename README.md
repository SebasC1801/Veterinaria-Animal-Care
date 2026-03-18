# Sistema de Gestión Veterinaria 🐶🐱

Aplicación web desarrollada en Java Spring Boot para la gestión de mascotas, citas y usuarios en una veterinaria.

## 🚀 Inicio Rápido

### Ejecutar localmente

```bash
cd java-app
ejecutar-simple.bat
```

Abre tu navegador en: `http://localhost:8086`

### Usuarios de prueba

- **Veterinario:** veterinario@test.com / 123456
- **Usuario:** usuario@test.com / 123456

## 📁 Estructura del Proyecto

```
├── java-app/
│   ├── src/main/
│   │   ├── java/com/veterinary/
│   │   │   ├── models/          # Patrones de diseño (Factory, Builder, Prototype)
│   │   │   ├── services/        # Lógica de negocio (Singleton)
│   │   │   └── web/             # Aplicación web Spring Boot
│   │   │       ├── api/         # Controladores REST
│   │   │       ├── model/       # Modelos de datos
│   │   │       ├── repository/  # Repositorios en memoria
│   │   │       └── service/     # Servicios de la aplicación
│   │   └── resources/
│   │       ├── static/          # CSS, JS, imágenes
│   │       └── templates/       # HTML
│   ├── ejecutar-simple.bat      # Script para ejecutar
│   ├── preparar-despliegue.bat  # Script para compilar JAR
│   └── pom.xml                  # Configuración Maven
├── README.md                    # Este archivo
└── GUIA_DESPLIEGUE.md          # Guía para desplegar en la nube
```

## 🎯 Funcionalidades

- ✅ Autenticación de usuarios (Veterinario/Usuario)
- ✅ Registro y gestión de mascotas
- ✅ Programación de citas médicas
- ✅ Gestión de estados de citas
- ✅ Interfaz web responsive
- ✅ Datos en memoria (sin base de datos externa)

## 🛠️ Tecnologías

- Java 11
- Spring Boot 2.7.14
- Thymeleaf
- JavaScript (Vanilla)
- CSS3
- Maven

## 📋 Requisitos

- Java 11 o superior
- Maven (incluido en `vendor/`)

## 🌐 Despliegue

Para desplegar en la nube (Render, Railway, Heroku, etc.), consulta:

📖 **[GUIA_DESPLIEGUE.md](GUIA_DESPLIEGUE.md)**

## 📝 Notas

- Los datos se almacenan en memoria (se pierden al reiniciar)
- Los usuarios de prueba se cargan automáticamente
- MongoDB está deshabilitado por defecto

## 🎓 Proyecto Académico

Desarrollado en la **Universidad Cooperativa de Colombia** con fines educativos.
