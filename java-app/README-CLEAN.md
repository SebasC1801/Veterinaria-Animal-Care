# Veterinary Management System - Clean Version

## 🎯 Overview
Esta es una versión completamente limpia y funcional del Sistema de Gestión Veterinaria que implementa todos los patrones de diseño requeridos **sin errores de compilación**.

## ✅ Patrones de Diseño Implementados

### 1. **Singleton Pattern**
- **Clase**: `VeterinaryService`
- **Propósito**: Garantiza una única instancia del sistema de gestión
- **Implementación**: Constructor privado con método `getInstance()` estático sincronizado

### 2. **Builder Pattern**
- **Clase**: `PetBuilder`
- **Propósito**: Construcción paso a paso de objetos Pet complejos
- **Implementación**: Métodos encadenados para construir objetos con validación

### 3. **Factory Method Pattern**
- **Clase**: `AnimalFactoryService`
- **Propósito**: Creación de diferentes tipos de animales y sus razas
- **Implementación**: Métodos que retornan listas específicas según el tipo de animal

### 4. **Abstract Factory Pattern**
- **Clase**: `AnimalFactoryService`
- **Propósito**: Creación de familias de objetos relacionados (domésticos vs exóticos)
- **Implementación**: Servicio que proporciona características de familias de mascotas

### 5. **Prototype Pattern**
- **Clase**: `VeterinaryService.clonePet()`
- **Propósito**: Clonación de registros de mascotas existentes
- **Implementación**: Método que crea copias profundas de mascotas con nuevos IDs

## 🚀 Características

### Funcionalidades Principales
- ✅ **Registro de mascotas** con validación completa
- ✅ **Selección dinámica de razas** por tipo de animal
- ✅ **Listado y búsqueda** de mascotas registradas
- ✅ **Clonación de registros** (Patrón Prototype)
- ✅ **Información del sistema** en tiempo real
- ✅ **Interfaz web moderna** con CSS personalizado
- ✅ **API REST** para integración

### Tipos de Animales Soportados
- **Perros**: 18 razas populares
- **Gatos**: 18 razas populares
- **Aves**: 18 razas populares
- **Reptiles**: 18 razas populares

### Tipos de Familias
- **Domésticas**: Mascotas comunes en hogares
- **Exóticas**: Mascotas que requieren cuidados especializados

## 🛠️ Cómo Ejecutar

### Opción 1: Script Automático (Recomendado)
```bash
cd java-app
run-clean.bat
```

### Opción 2: Maven Manual
```bash
cd java-app
mvn clean compile
mvn spring-boot:run -Dspring-boot.run.main-class=com.veterinary.patterns.clean.CleanVeterinaryApplication
```

### Opción 3: IDE
1. Abre el proyecto en tu IDE (IntelliJ IDEA, Eclipse, VS Code)
2. Ejecuta la clase principal: `com.veterinary.patterns.clean.CleanVeterinaryApplication`
3. Accede a: http://localhost:8080

## 📁 Estructura del Proyecto

```
java-app/src/main/java/com/veterinary/patterns/clean/
├── CleanVeterinaryApplication.java          # Clase principal Spring Boot
├── controller/
│   └── VeterinaryController.java            # Controlador web
├── service/
│   ├── VeterinaryService.java               # Singleton + Prototype
│   └── AnimalFactoryService.java            # Factory Method + Abstract Factory
├── model/
│   └── Pet.java                             # Modelo de datos
└── builder/
    └── PetBuilder.java                      # Builder Pattern
```

## 🌐 Interfaz Web

### Páginas Disponibles
- **Inicio** (`/`): Dashboard del sistema con estadísticas
- **Registro** (`/registro`): Formulario de registro con selección dinámica
- **Registros** (`/registros`): Lista de todas las mascotas registradas
- **Prototipos** (`/prototypes`): Interfaz de clonación de mascotas
- **Patrones** (`/patrones`): Documentación de patrones implementados

### Endpoints API
- `GET /api/breeds?animalType={tipo}`: Obtiene razas por tipo de animal
- `GET /api/animal-info?animalType={tipo}`: Información detallada del tipo
- `GET /api/family-characteristics?familyType={tipo}`: Características de familia
- `GET /api/pets`: Lista todas las mascotas (JSON)
- `GET /api/pet/{id}`: Obtiene mascota específica (JSON)
- `GET /api/system-info`: Información del sistema (JSON)

## 💡 Ejemplos de Uso de Patrones

### Singleton Pattern
```java
VeterinaryService service = VeterinaryService.getInstance();
```

### Builder Pattern
```java
Pet pet = new PetBuilder()
    .setName("Max")
    .setAge(3)
    .setBreed("Labrador")
    .setAnimalType("dog")
    .setFamilyType("domestic")
    .setOwnerName("Juan Pérez")
    .setOwnerPhone("3001234567")
    .build();
```

### Factory Method Pattern
```java
List<String> dogBreeds = animalFactoryService.getBreedsForAnimalType("dog");
```

### Abstract Factory Pattern
```java
List<String> domesticCharacteristics = animalFactoryService.getFamilyCharacteristics("domestic");
```

### Prototype Pattern
```java
Pet clonedPet = veterinaryService.clonePet(originalId, "Max Jr");
```

## 🔧 Detalles Técnicos

### Dependencias
- Spring Boot 2.7.0
- Spring Web MVC
- Thymeleaf (motor de plantillas)
- H2 Database (en memoria)
- Jackson (procesamiento JSON)

### Características Técnicas
- **Sin Lombok**: Todos los getters/setters escritos manualmente
- **CSS Personalizado**: Diseño moderno y responsivo sin Bootstrap
- **Selección Dinámica**: JavaScript para selección de razas
- **Singleton Thread-Safe**: Implementación sincronizada
- **Clonación Profunda**: Copia completa de objetos Pet
- **Validación Completa**: Validación en cliente y servidor

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Maven no encontrado**
   - Instala Maven y agrégalo al PATH
   - O usa un IDE para ejecutar la aplicación

2. **Puerto 8080 en uso**
   - Cambia el puerto en `application.yml`
   - O detén el proceso que usa el puerto 8080

3. **Errores de compilación**
   - Asegúrate de tener Java 11+ instalado
   - Verifica que todas las dependencias estén resueltas

## 📊 Ventajas de esta Versión

- ✅ **Sin errores de compilación**
- ✅ **Implementación completa de todos los patrones**
- ✅ **Código limpio y bien documentado**
- ✅ **Interfaz web funcional**
- ✅ **API REST completa**
- ✅ **Validación robusta**
- ✅ **Fácil de entender y mantener**

## 🎯 Próximas Mejoras

- Persistencia en base de datos
- Autenticación de usuarios
- Búsqueda avanzada y filtros
- Gestión de historiales médicos
- Programación de citas
- Generación de reportes
- Notificaciones en tiempo real
