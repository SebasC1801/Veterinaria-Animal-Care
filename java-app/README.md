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

## Integración de Citas Médicas (Consultas unificadas)

Esta versión integra por completo la antigua sección de "Consultas" dentro de "Citas Médicas", manteniendo todas sus funcionalidades en un único flujo:

- Botón `Agendar Cita Médica` dentro de la sección de citas que abre el editor unificado.
- Edición de estados directamente en la misma interfaz (sin navegar a otra sección).
- Conserva el listado, filtros, prioridades, veterinarios y acciones previamente disponibles en "Consultas".
- Validaciones en tiempo real para garantizar consistencia de datos.

### Validaciones en tiempo real
- Fecha y hora no pueden estar en el pasado.
- Selección de mascota obligatoria.
- Campos obligatorios: veterinario, motivo, descripción.
- Indicaciones visuales y mensajes de error inmediatos en el editor.

### Flujo unificado
- Agendar: abre el editor con nuevo registro, valida y guarda.
- Editar: reabre el editor con datos existentes, permite cambio de estado y actualizaciones.
- Estados: actualizables en la misma vista; el listado refleja el cambio al instante.
- Consistencia: los datos mostrados coinciden con lo seleccionado/ingresado.

### Pruebas recomendadas
- Flujo completo de agendamiento (crear → validar → guardar → listar).
- Modificación de estados y verificación de reflejo inmediato en la tabla.
- Validación de datos en tiempo real (errores preventivos y mensajes).
- Rendimiento con listados extensos y filtros activos.
- Experiencia de usuario: accesibilidad y retroalimentación clara.

### Cambios técnicos clave
- `app.js`: se implementó `scheduleNewAppointment()` para iniciar creación desde "Citas Médicas".
- `saveAppointmentEdit()` ahora permite crear y actualizar en un mismo flujo.
- Eliminación del caso `'consultas'` en `showSection()` y de `showConsultationForm()`/`showConsultationList()`.
- Redirección del acceso rápido de consultas al flujo de "Citas Médicas".
- Validaciones integradas dentro del modal de edición/creación.

### Uso
- En `index.html`, en la sección `Citas Médicas`, haz clic en `Agendar Cita Médica`.
- Completa los campos requeridos; los errores se muestran al instante si falta información.
- Guarda para crear o actualizar; los cambios se reflejan inmediatamente en el listado.

Si encuentras inconsistencias o comportamientos inesperados, revisa `java-app/src/main/resources/static/js/app.js` para las funciones del flujo y valida que el navegador no tenga caché de scripts.
