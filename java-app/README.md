# Sistema de Gestión Veterinaria - Java Spring Boot

Aplicación web para la gestión de mascotas, citas y usuarios en una veterinaria.

## 🚀 Ejecutar la Aplicación

```bash
ejecutar-simple.bat
```

La aplicación estará disponible en: `http://localhost:8086`

## 👥 Usuarios de Prueba

- **Veterinario:** veterinario@test.com / 123456
- **Usuario:** usuario@test.com / 123456

## 📁 Estructura

```
src/main/
├── java/com/veterinary/
│   ├── models/              # Patrones de diseño (académico)
│   │   ├── animals/         # Factory Method, Abstract Factory
│   │   ├── pet/             # Builder
│   │   └── medical/         # Prototype
│   ├── services/            # Singleton
│   └── web/                 # Aplicación web
│       ├── api/             # REST Controllers
│       ├── model/           # Modelos (User, Pet, Appointment)
│       ├── repository/      # Repositorios en memoria
│       ├── service/         # Servicios de negocio
│       └── VeterinaryWebApp.java
└── resources/
    ├── static/              # CSS, JS, imágenes
    ├── templates/           # HTML
    └── application.yml      # Configuración
```

## 🛠️ Scripts Disponibles

- `ejecutar-simple.bat` - Ejecutar la aplicación
- `preparar-despliegue.bat` - Compilar JAR para despliegue
- `run-web.bat` - Ejecutar con Maven (alternativo)

## 🌐 Despliegue

Para desplegar en la nube (Render - GRATIS), consulta: `../GUIA_DESPLIEGUE.md`

## 📝 Notas

- Datos en memoria (no persisten al reiniciar)
- MongoDB deshabilitado
- Puerto configurable vía variable `PORT`
