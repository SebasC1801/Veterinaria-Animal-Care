# Veterinary Management System - Simple Version

## Overview
This is a simplified version of the Veterinary Management System that implements the required design patterns without complex dependencies. The application has been simplified to avoid Lombok compatibility issues.

## Design Patterns Implemented

### 1. Singleton Pattern
- **Class**: `SimpleVeterinaryService`
- **Purpose**: Ensures only one instance of the veterinary system exists
- **Implementation**: Private constructor with static getInstance() method

### 2. Builder Pattern
- **Class**: `SimplePet` constructor
- **Purpose**: Creates pet objects step by step
- **Implementation**: Constructor with multiple parameters for building complex objects

### 3. Factory Method Pattern
- **Class**: `SimpleSelectionService`
- **Purpose**: Creates different types of animal breeds based on animal type
- **Implementation**: Methods that return specific breed lists for each animal type

### 4. Abstract Factory Pattern
- **Class**: `SimpleSelectionService` (simplified)
- **Purpose**: Creates families of related objects (animal types and their breeds)
- **Implementation**: Service that provides breed families for different animal types

### 5. Prototype Pattern
- **Class**: `SimpleVeterinaryService.clonePet()`
- **Purpose**: Clones existing pet records to create new ones
- **Implementation**: Method that creates copies of existing pets with new IDs

## Features

### Core Functionality
- ✅ Pet registration with validation
- ✅ Pet listing and management
- ✅ Pet cloning (Prototype pattern)
- ✅ Dynamic breed selection based on animal type
- ✅ System information display
- ✅ Web interface with custom CSS

### Animal Types Supported
- **Dogs**: 14 popular breeds
- **Cats**: 14 popular breeds  
- **Birds**: 14 popular breeds
- **Reptiles**: 14 popular breeds

## How to Run

### Option 1: Using Maven (if installed)
```bash
cd java-app
mvn clean compile
mvn spring-boot:run
```

### Option 2: Using the provided script
```bash
cd java-app
run-simple.bat
```

### Option 3: Using an IDE
1. Open the project in your IDE (IntelliJ IDEA, Eclipse, VS Code)
2. Run the main class: `com.veterinary.patterns.VeterinaryPatternsApplication`
3. Access the application at: http://localhost:8080

## Application Structure

```
java-app/
├── src/main/java/com/veterinary/patterns/
│   ├── VeterinaryPatternsApplication.java    # Main Spring Boot class
│   ├── controller/
│   │   └── SimpleVeterinaryController.java   # Web controller
│   ├── model/
│   │   └── SimplePet.java                    # Pet data model
│   └── service/
│       ├── SimpleVeterinaryService.java      # Singleton service
│       └── SimpleSelectionService.java       # Factory service
├── src/main/resources/
│   ├── application.yml                       # Spring Boot configuration
│   ├── templates/                            # Thymeleaf templates
│   └── static/                               # CSS and JavaScript
└── pom.xml                                   # Maven configuration
```

## Web Interface

### Pages Available
- **Home** (`/`): System dashboard with statistics
- **Registration** (`/registro`): Pet registration form with dynamic breed selection
- **Records** (`/registros`): List of all registered pets
- **Prototypes** (`/prototypes`): Pet cloning interface
- **Patterns** (`/patrones`): Design patterns documentation

### API Endpoints
- `GET /api/breeds?animalType={type}`: Returns breeds for specific animal type

## Technical Details

### Dependencies
- Spring Boot 2.7.0
- Spring Web MVC
- Thymeleaf (template engine)
- H2 Database (in-memory)
- Jackson (JSON processing)

### Key Features
- **No Lombok**: All getters/setters written manually to avoid compatibility issues
- **Custom CSS**: Modern, responsive design without Bootstrap
- **Dynamic Selection**: JavaScript-powered breed selection
- **Singleton Service**: Thread-safe singleton implementation
- **Prototype Cloning**: Deep copy functionality for pet records

## Troubleshooting

### Common Issues

1. **Maven not found**
   - Install Maven and add it to your PATH
   - Or use an IDE to run the application

2. **Port 8080 already in use**
   - Change the port in `application.yml`
   - Or stop the process using port 8080

3. **Compilation errors**
   - Ensure Java 11+ is installed
   - Check that all dependencies are resolved

## Design Pattern Examples

### Singleton Usage
```java
SimpleVeterinaryService service = SimpleVeterinaryService.getInstance();
```

### Builder Usage
```java
SimplePet pet = new SimplePet("Max", 3, "Labrador", "dog", "John Doe");
```

### Factory Usage
```java
List<String> dogBreeds = selectionService.getBreedsForAnimalType("dog");
```

### Prototype Usage
```java
SimplePet clone = veterinaryService.clonePet(originalId, "New Name");
```

## Future Enhancements
- Database persistence
- User authentication
- Advanced search and filtering
- Medical record management
- Appointment scheduling
- Report generation
