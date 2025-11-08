# Gestor de Mascotas Veterinaria 🐶🐱

Una aplicación completa desarrollada en **Java** que implementa los patrones de diseño de software para la gestión de mascotas en una veterinaria.

## ✅ PROYECTO CONVERTIDO COMPLETAMENTE A JAVA

Este proyecto ha sido **completamente migrado y consolidado** para funcionar exclusivamente en Java, eliminando dependencias anteriores y proporcionando una solución unificada y robusta.

## 📚 Contenido
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Funcionalidades](#funcionalidades)
- [Uso Rápido](#uso-rapido)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## 📖 Documentación Completa

Para un **contexto completo y detallado** de la aplicación, incluyendo:
- Arquitectura completa del sistema
- Explicación detallada de cada patrón de diseño
- Flujos de datos y casos de uso
- Guía para desarrolladores
- Estructura de datos y modelos

**Consulta el archivo**: [`CONTEXTO_COMPLETO.md`](./CONTEXTO_COMPLETO.md)

## Patrones Implementados

- **Singleton**: Sistema central de gestión de la veterinaria
- **Factory Method**: Creación de diferentes tipos de animales
- **Abstract Factory**: Familias de mascotas (domésticas vs exóticas)
- **Builder**: Construcción paso a paso de fichas de mascotas
- **Prototype**: Clonación de fichas para registrar descendencia

Cada patrón se implementa con un ejemplo funcional dentro del sistema y puede visualizarse al ejecutar el script `run-demo.bat`.

## Estructura del Proyecto

```
📁 Gestión de citas veterinarias/
├── 📁 java-app/
│   ├── 📄 pom.xml
│   ├── 📄 run-demo.bat
│   ├── 📄 run-interactive.bat
│   └── 📁 src/main/java/com/veterinary/
│       ├── 📄 VeterinaryManagementSystem.java
│       ├── 📁 patterns/
│       │   ├── 📄 VeterinaryPatternsApplication.java
│       │   ├── 📁 controller/
│       │   ├── 📁 service/
│       │   └── 📁 model/
├── 📁 data/
└── 📄 README.md
```

## Instalación y Ejecución

### Requisitos
- **Java 11 o superior**
- **Maven 3.6 o superior**

### 🚀 Ejecución Rápida

- **Demostración Automática de Patrones**
```bash
cd java-app
run-demo.bat
```

- **Aplicación Interactiva (Consola)**
```bash
cd java-app
run-interactive.bat
```

- **Aplicación Web Spring Boot**
```bash
cd java-app
mvn spring-boot:run
```
Accede a: `http://localhost:8080`

### 📋 Ejecución Manual

- **Aplicación Standalone (Consola)**
```bash
cd java-app
mvn clean compile
java -cp "target/classes;target/dependency/*" com.veterinary.VeterinaryManagementSystem
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
