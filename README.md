# Gestor de Mascotas Veterinaria 🐶🐱

Una aplicación completa desarrollada en **Java** que implementa los patrones de diseño de software para la gestión de mascotas en una veterinaria.

## ✅ Proyecto consolidado en Java + Frontend estático

El proyecto funciona principalmente como aplicación Java (con Spring Boot) y un frontend estático en `java-app/web-version`. Se han removido artefactos no utilizados para mantener una base limpia y coherente.

## 📚 Contenido
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Funcionalidades](#funcionalidades)
- [Uso Rápido](#uso-rapido)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## 📖 Documentación

Para un contexto detallado de la aplicación (arquitectura, patrones y flujos), consulta: [`CONTEXTO_COMPLETO.md`](./CONTEXTO_COMPLETO.md).

## Patrones Implementados

- **Singleton**: Sistema central de gestión de la veterinaria
- **Factory Method**: Creación de diferentes tipos de animales
- **Abstract Factory**: Familias de mascotas (domésticas vs exóticas)
- **Builder**: Construcción paso a paso de fichas de mascotas
- **Prototype**: Clonación de fichas para registrar descendencia

Cada patrón se implementa con un ejemplo funcional dentro del sistema. Los scripts de demostración legacy se han retirado durante la limpieza.

## Estructura del Proyecto

```
📁 Veterinaria_Animal_Care/
├── 📁 java-app/
│   ├── 📄 pom.xml
│   ├── 📄 run-web.bat
│   ├── 📄 run-direct.bat
│   ├── 📄 verificar-ejecutar.bat
│   ├── 📁 src/main/java/com/veterinary/
│   ├── 📁 src/main/resources/
│   └── 📁 web-version/
├── 📄 README.md
└── 📄 CONTEXTO_COMPLETO.md
```

## Instalación y Ejecución

### Requisitos
- **Java 11 o superior**
- **Maven 3.6 o superior**

### 🚀 Ejecución Rápida

- **Aplicación Web Spring Boot**
```bash
cd java-app
mvn spring-boot:run
```
Accede a: `http://localhost:8080`

También puedes usar el script:
```bash
cd java-app
run-web.bat
```

### 🔧 Frontend estático
Para levantar el frontend sin backend:
```bash
cd java-app
python -m http.server 8001
# Navega a: http://localhost:8001/web-version/index.html
```

## Funcionalidades

### 🎯 Plataforma Java (Consola + Web Spring Boot)
- **Sistema unificado**: Todas las funcionalidades consolidadas en Java
- **Patrones completos**: Los 5 patrones implementados y demostrables
- **Interfaz web moderna**: Plantillas Thymeleaf y CSS personalizado
- **API REST**: Endpoints para integración y consulta de datos
- **Validación**: Validaciones en cliente (web) y servidor
- **H2 en memoria**: Consola disponible en `/h2-console` (configurado)

### 🖥️ Aplicación de Escritorio Swing
- **Interfaz gráfica**: Aplicación Swing completa
- **Registro de mascotas**: Formulario con pestañas
- **Prototypes**: Registro y clonación de fichas
- **Estadísticas**: Información del sistema

## Uso Rápido
- Ejecuta `run-demo.bat` para ver los patrones en acción.
- En la versión web, visita:
  - `http://localhost:8080/` (Inicio)
  - `http://localhost:8080/registro` (Registro de mascotas)
  - `http://localhost:8080/registros` (Listado)
  - `http://localhost:8080/patrones` (Documentación de patrones)

## Contribuciones

Este proyecto fue desarrollado como demostración de patrones de diseño de software. Las contribuciones son bienvenidas para:
- Agregar nuevos tipos de animales
- Mejorar la interfaz de usuario
- Implementar funcionalidades adicionales
- Mejorar la documentación

## 🔧 Versión Simplificada Java

Si tienes problemas con herramientas o dependencias, existe una versión simplificada de la aplicación Java:

- **Archivos**: `java-app/src/main/java/com/veterinary/patterns/Simple*.java`
- **Documentación**: `java-app/README-SIMPLE.md`
- **Script de ejecución**: `java-app/run-simple.bat`

Esta versión fue creada únicamente para **pruebas o demostraciones rápidas sin dependencias**. La versión oficial evaluada es la completa.

---

## 🧾 Licencia

Proyecto académico desarrollado en la **Universidad Cooperativa de Colombia**, bajo fines educativos.
