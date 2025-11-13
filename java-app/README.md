# Sistema de Gestión Veterinaria - Java

Este proyecto es una conversión a Java del sistema de gestión veterinaria originalmente desarrollado en Python. Está enfocado en funcionalidades reales de gestión de mascotas, citas y soporte web con Spring Boot.

## Arquitectura del Dominio

- Modelos y servicios orientados a la gestión veterinaria: creación de animales, registros de mascotas y controles médicos.
- Organización por paquetes: `models`, `services` y `web` para mantener separación de responsabilidades.

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
│       │           ├── ui/                # (legacy opcional)
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
├── run.bat                # Script para ejecutar la aplicación de escritorio (opcional)
└── run-web.bat            # Script para ejecutar la aplicación web
```

## Requisitos

- Java 11 o superior
- Maven

## Cómo Ejecutar

### Aplicación de Escritorio (opcional)

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

La aplicación web estará disponible en: http://localhost:8085

### Configurar MongoDB por variable de entorno

Puedes sobreescribir la URI de MongoDB sin editar `application.yml` usando una variable de entorno:

- En Windows PowerShell (mismo terminal donde ejecutarás el backend):

```
$env:SPRING_DATA_MONGODB_URI="mongodb+srv://USUARIO:CONTRASENA@HOST/BD?retryWrites=true&w=majority"
mvn -q spring-boot:run -DskipTests
```

- Alternativamente puedes usar `MONGODB_URI`:

```
$env:MONGODB_URI="mongodb+srv://USUARIO:CONTRASENA@HOST/BD?retryWrites=true&w=majority"
mvn -q spring-boot:run -DskipTests
```

Si no defines variables, se usará la URI por defecto definida en `application.yml`.

## Permisos y roles

- Veterinario:
  - Puede gestionar citas (crear, editar estado, cancelar) y ver todas las citas.
  - Mantiene todas las funcionalidades existentes.

- Usuario:
  - Puede agendar nuevas citas médicas (fecha/hora disponibles, motivo, confirmación).
  - Puede cancelar únicamente sus propias citas (requiere confirmación; se registra en historial y se notifica en la interfaz).
  - No puede editar citas ni cambiar su estado por ningún método; se ocultan opciones de edición en la UI y se valida en backend.
  - No puede reactivar citas canceladas.

Notas técnicas:
- El frontend adiciona encabezados `X-User-Email` y `X-User-Role` en creación y cancelación de citas.
- El backend valida que un usuario solo pueda cancelar citas de mascotas cuyo `ownerEmail` coincide con su correo y rechaza ediciones.

## Notas sobre la Conversión

Este proyecto es una conversión de Python a Java, manteniendo la estructura funcional y enfocando el sistema en flujos reales de Animal Care. Se retiraron materiales y rutas de demostración de “patrones”.

## Funcionalidades

- Registro y gestión de mascotas
- Programación de citas veterinarias
- Interfaz web y de escritorio (opcional)

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
