# Sistema de Gestión Veterinaria - Java

Este proyecto es una conversión a Java del sistema de gestión veterinaria originalmente desarrollado en Python. Implementa varios patrones de diseño para demostrar su aplicación práctica en un sistema real.

## Patrones de Diseño Implementados

1. **Singleton**: Implementado en `VeterinarySystem.java` para garantizar una única instancia del sistema.
2. **Factory Method**: Implementado en `AnimalFactory.java` para crear diferentes tipos de animales.
3. **Abstract Factory**: Implementado en `PetFamily.java`, `DomesticPetFamily.java` y `ExoticPetFamily.java` para crear familias de mascotas relacionadas.
4. **Builder**: Implementado en `PetRecordBuilder.java` para construir registros de mascotas complejos paso a paso.
5. **Prototype**: Implementado en `Prototype.java`, `MedicalRecord.java` y `PrototypeManager.java` para clonar objetos existentes.

## Estructura del Proyecto

```
java-app/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── veterinary/
│       │           ├── models/
│       │           │   ├── animals/       # Factory Method pattern
│       │           │   │   ├── Animal.java
│       │           │   │   ├── Dog.java
│       │           │   │   ├── Cat.java
│       │           │   │   ├── Bird.java
│       │           │   │   ├── Reptile.java
│       │           │   │   ├── AnimalFactory.java
│       │           │   │   ├── PetFamily.java
│       │           │   │   ├── DomesticPetFamily.java
│       │           │   │   ├── ExoticPetFamily.java
│       │           │   │   └── PetFamilyFactoryManager.java
│       │           │   ├── pet/           # Builder pattern
│       │           │   │   ├── PetRecord.java
│       │           │   │   └── PetRecordBuilder.java
│       │           │   └── medical/       # Prototype pattern
│       │           │       ├── Prototype.java
│       │           │       ├── MedicalRecord.java
│       │           │       └── PrototypeManager.java
│       │           ├── services/
│       │           │   └── clinic/        # Singleton pattern
│       │           │       └── VeterinarySystem.java
│       │           ├── ui/                # Aplicación de escritorio
│       │           │   └── VeterinaryApp.java
│       │           ├── web/               # Aplicación web Spring Boot
│       │           │   ├── VeterinaryWebApp.java
│       │           │   └── controller/
│       │           │       └── VeterinaryController.java
│       │           └── Main.java
│       └── resources/
│           ├── application.yml
│           ├── static/
│           │   ├── css/
│           │   └── js/
│           └── templates/
├── pom.xml
├── run.bat                # Script para ejecutar la aplicación de escritorio
└── run-web.bat            # Script para ejecutar la aplicación web
```

## Requisitos

- Java 11 o superior
- Maven

## Cómo Ejecutar

### Aplicación de Escritorio

Para ejecutar la aplicación de escritorio con interfaz gráfica Swing:

```
./run.bat
```

O manualmente:

```
mvn clean compile exec:java -Dexec.mainClass="com.veterinary.Main"
```

### Aplicación Web

Para ejecutar la aplicación web con Spring Boot:

```
./run-web.bat
```

O manualmente:

```
mvn clean spring-boot:run -Dspring-boot.run.mainClass="com.veterinary.web.VeterinaryWebApp"
```

La aplicación web estará disponible en: http://localhost:8080

## Notas sobre la Conversión

Este proyecto es una conversión de Python a Java, manteniendo la misma estructura y patrones de diseño. La versión Java incluye:

1. Implementación completa de los modelos y servicios
2. Interfaz gráfica de usuario con Swing
3. Aplicación web con Spring Boot
4. Demostración interactiva de los patrones de diseño

## Funcionalidades

- Registro y gestión de mascotas
- Programación de citas veterinarias
- Demostración interactiva de patrones de diseño
- Interfaz web y de escritorio
