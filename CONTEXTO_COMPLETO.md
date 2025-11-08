# 📚 Contexto Completo de la Aplicación - Veterinaria AnimalCare

## 🎯 Propósito de la Aplicación

**Veterinaria AnimalCare** es un sistema de gestión veterinaria desarrollado en **Java** con **Spring Boot** que permite:

- **Registro y gestión de mascotas**: Crear y mantener registros completos de mascotas con información médica, del propietario y administrativa
- **Programación de citas médicas**: Gestionar citas veterinarias con asignación de profesionales
- **Gestión de consultas**: Crear y mantener historiales médicos de las mascotas
- **Demostración de patrones de diseño**: Implementa 5 patrones de diseño de software como parte de un proyecto académico

Este proyecto fue desarrollado en la **Universidad Cooperativa de Colombia** como demostración práctica de patrones de diseño de software.

---

## 🏗️ Arquitectura y Tecnologías

### Stack Tecnológico

- **Lenguaje**: Java 11+
- **Framework**: Spring Boot 2.7.14
- **Motor de Plantillas**: Thymeleaf
- **Base de Datos**: H2 (en memoria)
- **Gestión de Dependencias**: Maven
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Persistencia**: Archivos JSON (en carpeta `data/`)

### Arquitectura

La aplicación sigue una arquitectura **MVC (Modelo-Vista-Controlador)**:

```
┌─────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   HTML/Thymeleaf │  │   CSS/JS    │  │  Controllers │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                    CAPA DE SERVICIOS                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │      VeterinarySystem (Singleton)                │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                    CAPA DE MODELOS                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Animals    │  │  PetRecord   │  │   Medical    │   │
│  │   (Factory)   │  │   (Builder)   │  │  (Prototype) │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                    CAPA DE DATOS                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  pets.json   │  │veterinarians│  │appointments │   │
│  │              │  │    .json     │  │   .json     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
Veterinaria_Animal_Care/
│
├── 📁 data/                          # Archivos JSON de persistencia
│   ├── pets.json                     # Registros de mascotas
│   ├── veterinarians.json            # Lista de veterinarios
│   └── appointments.json             # Citas programadas
│
├── 📁 java-app/                      # Aplicación principal Java
│   │
│   ├── 📄 pom.xml                    # Configuración Maven
│   ├── 📄 README.md                  # Documentación del módulo
│   │
│   ├── 📁 src/main/
│   │   │
│   │   ├── 📁 java/com/veterinary/
│   │   │   │
│   │   │   ├── 📁 models/            # Modelos de datos
│   │   │   │   │
│   │   │   │   ├── 📁 animals/       # Modelos de animales
│   │   │   │   │   ├── Animal.java              # Clase abstracta base
│   │   │   │   │   ├── Dog.java                 # Implementación: Perro
│   │   │   │   │   ├── Cat.java                 # Implementación: Gato
│   │   │   │   │   ├── Bird.java                # Implementación: Ave
│   │   │   │   │   ├── Reptile.java             # Implementación: Reptil
│   │   │   │   │   ├── AnimalFactory.java       # Factory Method
│   │   │   │   │   ├── PetFamily.java           # Interfaz Abstract Factory
│   │   │   │   │   ├── DomesticPetFamily.java  # Factory: Domésticos
│   │   │   │   │   ├── ExoticPetFamily.java     # Factory: Exóticos
│   │   │   │   │   └── PetFamilyFactoryManager.java # Gestor de factories
│   │   │   │   │
│   │   │   │   ├── 📁 pet/           # Modelos de registros de mascotas
│   │   │   │   │   ├── PetRecord.java           # Registro completo
│   │   │   │   │   └── PetRecordBuilder.java    # Builder Pattern
│   │   │   │   │
│   │   │   │   └── 📁 medical/      # Modelos médicos
│   │   │   │       ├── MedicalRecord.java       # Registro médico
│   │   │   │       ├── Prototype.java           # Interfaz Prototype
│   │   │   │       └── PrototypeManager.java   # Gestor de prototipos
│   │   │   │
│   │   │   ├── 📁 services/          # Servicios de negocio
│   │   │   │   └── 📁 clinic/
│   │   │   │       └── VeterinarySystem.java    # Singleton Pattern
│   │   │   │
│   │   │   └── 📁 web/               # Aplicación web Spring Boot
│   │   │       ├── VeterinaryWebApp.java        # Clase principal
│   │   │       └── 📁 controller/
│   │   │           └── VeterinaryController.java # Controlador MVC
│   │   │
│   │   └── 📁 resources/
│   │       │
│   │       ├── 📄 application.yml               # Configuración Spring Boot
│   │       │
│   │       ├── 📁 templates/        # Plantillas Thymeleaf
│   │       │   ├── index.html                   # Página principal
│   │       │   ├── base.html                    # Plantilla base
│   │       │   └── registro.html                 # Formulario de registro
│   │       │
│   │       └── 📁 static/            # Recursos estáticos
│   │           ├── 📁 css/
│   │           │   └── style.css                # Estilos principales
│   │           ├── 📁 js/
│   │           │   ├── app.js                    # Lógica frontend
│   │           │   └── main.js                  # Scripts adicionales
│   │           └── 📁 images/
│   │               ├── Logo.png                  # Logo de la clínica
│   │               └── banner.png               # Banner principal
│   │
│   └── 📁 target/                    # Archivos compilados (generado)
│
├── 📄 README.md                      # Documentación principal
└── 📄 CONTEXTO_COMPLETO.md           # Este archivo
```

---

## 🎨 Patrones de Diseño Implementados

La aplicación implementa **5 patrones de diseño creacionales**:

### 1. **Singleton** 🏛️
**Ubicación**: `com.veterinary.services.clinic.VeterinarySystem`

**Propósito**: Garantizar que existe una única instancia del sistema veterinario en toda la aplicación.

**Implementación**:
```java
public class VeterinarySystem {
    private static VeterinarySystem instance;
    
    private VeterinarySystem() { /* Constructor privado */ }
    
    public static synchronized VeterinarySystem getInstance() {
        if (instance == null) {
            instance = new VeterinarySystem();
        }
        return instance;
    }
}
```

**Uso**: Se accede mediante `VeterinarySystem.getInstance()` en toda la aplicación para mantener un estado centralizado.

---

### 2. **Factory Method** 🏭
**Ubicación**: `com.veterinary.models.animals.AnimalFactory`

**Propósito**: Crear instancias de diferentes tipos de animales sin exponer la lógica de creación al cliente.

**Implementación**:
```java
public static Animal createAnimal(String type, String name, int age, String breed, String ownerName) {
    switch (type.toLowerCase()) {
        case "perro": return new Dog(name, age, breed, ownerName);
        case "gato": return new Cat(name, age, breed, ownerName);
        case "ave": return new Bird(name, age, breed, ownerName);
        case "reptil": return new Reptile(name, age, breed, ownerName);
        default: throw new IllegalArgumentException("Tipo no soportado");
    }
}
```

**Uso**: Simplifica la creación de objetos `Animal` sin conocer las clases concretas.

---

### 3. **Abstract Factory** 🏗️
**Ubicación**: `com.veterinary.models.animals.PetFamily` y sus implementaciones

**Propósito**: Crear familias de objetos relacionados (mascotas domésticas vs exóticas) sin especificar sus clases concretas.

**Estructura**:
- `PetFamily` (interfaz)
- `DomesticPetFamily` (implementación para perros/gatos)
- `ExoticPetFamily` (implementación para aves/reptiles)
- `PetFamilyFactoryManager` (gestor que selecciona la factory apropiada)

**Uso**: Permite crear animales agrupados por familia (doméstica/exótica) con características específicas.

---

### 4. **Builder** 🔨
**Ubicación**: `com.veterinary.models.pet.PetRecordBuilder`

**Propósito**: Construir objetos complejos (`PetRecord`) paso a paso, permitiendo diferentes representaciones.

**Implementación**:
```java
PetRecord record = new PetRecordBuilder()
    .setAnimalWithFamily("domestic", "perro", "Max", 3, "Labrador", "Juan")
    .setOwnerInfo("Juan", "123456789", "juan@email.com", "Calle 123", "987654321")
    .setMedicalInfo(25.5, "Al día", true, allergies, diseases)
    .setAdministrativeInfo(1, "Efectivo")
    .build();
```

**Uso**: Facilita la construcción de registros de mascotas con muchos campos opcionales.

---

### 5. **Prototype** 🧬
**Ubicación**: `com.veterinary.models.medical.MedicalRecord` y `PrototypeManager`

**Propósito**: Crear nuevos objetos copiando instancias existentes (prototipos), útil para clonar registros médicos.

**Implementación**:
```java
public class MedicalRecord implements Prototype<MedicalRecord> {
    @Override
    public MedicalRecord clone() {
        MedicalRecord clone = new MedicalRecord();
        // Copiar todos los campos...
        return clone;
    }
}
```

**Uso**: Permite clonar registros médicos para crear nuevos registros basados en plantillas existentes.

---

## 📊 Modelos y Clases Principales

### 1. **Animal** (Clase Abstracta)
**Ubicación**: `com.veterinary.models.animals.Animal`

**Responsabilidades**:
- Representar la información básica de un animal (nombre, edad, raza, dueño)
- Definir métodos abstractos para cuidado específico, enfermedades comunes y horarios de alimentación

**Subclases**:
- `Dog`: Implementación para perros
- `Cat`: Implementación para gatos
- `Bird`: Implementación para aves
- `Reptile`: Implementación para reptiles

**Métodos Abstractos**:
- `getSpecificCareInstructions()`: Lista de instrucciones de cuidado
- `getCommonDiseases()`: Enfermedades comunes del tipo
- `getFeedingSchedule()`: Horario de alimentación recomendado

---

### 2. **PetRecord** (Registro Completo)
**Ubicación**: `com.veterinary.models.pet.PetRecord`

**Responsabilidades**:
- Contener toda la información de una mascota registrada
- Agrupar información del animal, propietario, médica y administrativa

**Estructura**:
```java
public class PetRecord {
    private Animal animal;                    // Información del animal
    private String ownerName, ownerPhone, ...; // Información del propietario
    private double weight;                     // Información médica
    private String vaccinationStatus;
    private List<String> allergies;
    private int veterinarianId;                // Información administrativa
    private Map<String, Object> additionalInfo; // Información adicional
}
```

---

### 3. **VeterinarySystem** (Singleton)
**Ubicación**: `com.veterinary.services.clinic.VeterinarySystem`

**Responsabilidades**:
- Gestionar todos los registros de mascotas
- Administrar veterinarios y citas
- Proporcionar información del sistema

**Colecciones Principales**:
- `List<PetRecord> petRecords`: Registros de mascotas
- `Map<Integer, String> veterinarians`: Veterinarios disponibles
- `List<Map<String, Object>> appointments`: Citas programadas

**Métodos Principales**:
- `registerPet(PetRecord)`: Registrar nueva mascota
- `getAllPetRecords()`: Obtener todos los registros
- `findPetsByOwner(String)`: Buscar mascotas por dueño
- `scheduleAppointment(...)`: Programar cita
- `getSystemInfo()`: Información del sistema

---

### 4. **VeterinaryController** (Controlador Web)
**Ubicación**: `com.veterinary.web.controller.VeterinaryController`

**Responsabilidades**:
- Manejar las peticiones HTTP
- Coordinar entre la vista y el modelo
- Procesar formularios y devolver vistas

**Endpoints Principales**:
- `GET /`: Página de inicio
- `GET /pets`: Lista de mascotas
- `GET /pets/add`: Formulario de registro
- `POST /pets/add`: Procesar registro
- `GET /appointments`: Lista de citas
- `GET /appointments/add`: Formulario de cita

---

## 🔄 Flujo de Datos

### Flujo de Registro de Mascota

```
1. Usuario accede a /pets/add
   ↓
2. VeterinaryController.addPetForm() muestra formulario
   ↓
3. Usuario completa formulario y envía (POST)
   ↓
4. VeterinaryController.addPet() recibe datos
   ↓
5. Se crea PetRecordBuilder
   ↓
6. Builder usa PetFamilyFactoryManager para crear Animal
   ↓
7. Builder construye PetRecord completo
   ↓
8. VeterinarySystem.getInstance().registerPet(record)
   ↓
9. Redirección a /pets (lista actualizada)
```

### Flujo de Consulta de Datos

```
1. Usuario accede a /pets
   ↓
2. VeterinaryController.pets() obtiene datos
   ↓
3. VeterinarySystem.getAllPetRecords()
   ↓
4. Datos se pasan al modelo Thymeleaf
   ↓
5. Vista renderiza lista de mascotas
```

---

## 💾 Estructura de Datos

### Archivo `pets.json`
```json
[
  {
    "record_id": "PET_20250925174539_TOBY",
    "created_at": "2025-09-25T17:45:39.219988",
    "animal_info": {
      "name": "Toby",
      "age": 1,
      "breed": "Frenchpuddle",
      "owner_name": "Sebastian",
      "animal_type": "Perro",
      "care_instructions": [...],
      "common_diseases": [...],
      "feeding_schedule": {...}
    },
    "owner_info": {
      "name": "Sebastian",
      "phone": "3233147621",
      "email": "johnsbeltran9@gmail.com",
      "address": "Cra 22 # 30 - 63"
    },
    "medical_info": {
      "weight": 20.0,
      "vaccination_status": "Al día",
      "spayed_neutered": true
    },
    "administrative_info": {
      "veterinarian_id": null,
      "payment_method": "Efectivo",
      "status": "active"
    }
  }
]
```

### Archivo `veterinarians.json`
```json
[
  {
    "id": 1,
    "name": "Dr. Juan Pérez",
    "specialty": "Medicina General"
  }
]
```

### Archivo `appointments.json`
```json
[
  {
    "id": 1,
    "pet_name": "Toby",
    "date": "2025-10-01",
    "veterinarian_id": 1,
    "reason": "Consulta general",
    "status": "Programada"
  }
]
```

---

## 🚀 Cómo Ejecutar la Aplicación

### Requisitos Previos
- **Java 11 o superior**
- **Maven 3.6 o superior**
- Navegador web moderno

### Opción 1: Ejecución Rápida (Scripts)
```bash
# Desde la raíz del proyecto
cd java-app
run-web.bat          # Windows
# o
./run-web.sh          # Linux/Mac
```

### Opción 2: Ejecución Manual con Maven
```bash
cd java-app
mvn clean spring-boot:run
```

### Opción 3: Compilar y Ejecutar JAR
```bash
cd java-app
mvn clean package
java -jar target/veterinary-system-1.0.0.jar
```

### Acceso a la Aplicación
- **URL Principal**: http://localhost:8083
- **Consola H2**: http://localhost:8083/h2-console
  - JDBC URL: `jdbc:h2:mem:veterinarydb`
  - Usuario: `sa`
  - Contraseña: `password`

---

## 🔧 Configuración

### Archivo `application.yml`
```yaml
server:
  port: 8083

spring:
  application:
    name: veterinary-system
  
  thymeleaf:
    cache: false
    prefix: classpath:/templates/
    suffix: .html
  
  datasource:
    url: jdbc:h2:mem:veterinarydb
    driverClassName: org.h2.Driver
    username: sa
    password: password
  
  h2:
    console:
      enabled: true
      path: /h2-console
```

---

## 📝 Funcionalidades Principales

### 1. **Registro de Mascotas**
- Formulario multi-paso con validación
- Selección de familia (doméstica/exótica) y tipo de animal
- Captura de información del propietario
- Almacenamiento en memoria (H2) y JSON

### 2. **Gestión de Citas**
- Programación de citas médicas
- Asignación de veterinarios
- Seguimiento de estado (Programada/Completada/Cancelada)

### 3. **Consulta de Registros**
- Listado de todas las mascotas registradas
- Búsqueda por nombre de mascota
- Visualización de información completa

### 4. **Autenticación (Frontend)**
- Sistema de login/registro (simulado en frontend)
- Roles: Usuario y Veterinario
- Sesiones gestionadas en JavaScript

---

## 🧪 Casos de Uso Principales

### Caso de Uso 1: Registrar Nueva Mascota
1. Usuario accede a la sección de registro
2. Selecciona familia (doméstica/exótica)
3. Selecciona tipo de animal (perro/gato/ave/reptil)
4. Completa información básica (nombre, edad, raza)
5. Ingresa datos del propietario
6. Sistema crea `PetRecord` usando Builder
7. Sistema registra mascota usando Singleton
8. Usuario ve confirmación y puede ver el registro

### Caso de Uso 2: Programar Cita Médica
1. Usuario selecciona mascota registrada
2. Selecciona veterinario disponible
3. Ingresa fecha, hora y motivo
4. Sistema crea cita usando `VeterinarySystem.scheduleAppointment()`
5. Cita se almacena en lista de appointments
6. Usuario puede ver la cita en el listado

### Caso de Uso 3: Clonar Registro Médico (Prototype)
1. Veterinario crea registro médico para una mascota
2. Registro se guarda como prototipo
3. Para otra mascota similar, se clona el prototipo
4. Se modifica información específica
5. Se guarda como nuevo registro

---

## 🔍 Puntos Clave para Desarrolladores

### 1. **Patrón Singleton**
- **No instanciar directamente**: Siempre usar `VeterinarySystem.getInstance()`
- **Estado compartido**: Cualquier cambio afecta a toda la aplicación
- **Thread-safe**: El método `getInstance()` es sincronizado

### 2. **Factory Method vs Abstract Factory**
- **Factory Method**: Usar `AnimalFactory.createAnimal()` para crear animales individuales
- **Abstract Factory**: Usar `PetFamilyFactoryManager` cuando necesites crear familias completas

### 3. **Builder Pattern**
- **Siempre usar Builder**: No instanciar `PetRecord` directamente (constructor es privado)
- **Métodos encadenables**: Todos los métodos del builder retornan `this`
- **Validación**: El método `build()` puede validar antes de retornar

### 4. **Prototype Pattern**
- **Clonación profunda**: El método `clone()` crea copias independientes
- **Gestor de prototipos**: Usar `PrototypeManager` para almacenar y recuperar prototipos

### 5. **Persistencia**
- **En memoria**: Los datos se almacenan en memoria durante la ejecución
- **JSON**: Los archivos JSON en `data/` son para referencia, no se leen automáticamente
- **H2 Database**: Base de datos en memoria, se reinicia en cada ejecución

---

## 🐛 Debugging y Troubleshooting

### Problema: La aplicación no inicia
- Verificar que Java 11+ esté instalado: `java -version`
- Verificar que Maven esté instalado: `mvn -version`
- Revisar logs en consola para errores de compilación

### Problema: No se guardan los datos
- Los datos están en memoria, se pierden al reiniciar
- Verificar que `VeterinarySystem.getInstance()` se use correctamente
- Revisar que el método `registerPet()` se llame correctamente

### Problema: Error 404 en rutas
- Verificar que el puerto sea 8083 (configurado en `application.yml`)
- Verificar que las rutas en el controlador coincidan con las URLs
- Revisar que Thymeleaf esté configurado correctamente

---

## 📚 Referencias y Recursos

### Documentación Oficial
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Thymeleaf Documentation](https://www.thymeleaf.org/)
- [H2 Database Documentation](https://www.h2database.com/)

### Patrones de Diseño
- **Gang of Four (GoF)**: Design Patterns: Elements of Reusable Object-Oriented Software
- **Refactoring Guru**: [refactoring.guru/design-patterns](https://refactoring.guru/design-patterns)

---

## 👥 Contribuciones y Desarrollo

Este es un proyecto académico desarrollado para demostrar la implementación práctica de patrones de diseño de software.

### Áreas de Mejora Potenciales
- Implementar persistencia real con base de datos
- Agregar autenticación y autorización real
- Implementar pruebas unitarias y de integración
- Agregar API REST completa
- Mejorar manejo de errores y validaciones
- Implementar logging estructurado

---

## 📄 Licencia

Proyecto académico desarrollado en la **Universidad Cooperativa de Colombia**, bajo fines educativos.

---

**Última actualización**: 2025
**Versión**: 1.0.0
**Autor**: Equipo de Desarrollo - Veterinaria AnimalCare

