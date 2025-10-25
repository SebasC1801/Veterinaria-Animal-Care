/**
 * Demostración Simple de Patrones de Diseño en Java
 * Sistema Veterinario - Versión Simplificada
 * 
 * Este archivo demuestra todos los patrones implementados sin dependencias externas
 */
public class DemostracionPatrones {
    
    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println("  DEMOSTRACIÓN DE PATRONES DE DISEÑO");
        System.out.println("========================================");
        System.out.println();
        
        // 1. PATRÓN SINGLETON
        System.out.println("1. PATRÓN SINGLETON - Sistema Central");
        System.out.println("-".repeat(50));
        SistemaVeterinario sistema1 = SistemaVeterinario.getInstance();
        SistemaVeterinario sistema2 = SistemaVeterinario.getInstance();
        System.out.println("✓ Sistema 1: " + sistema1);
        System.out.println("✓ Sistema 2: " + sistema2);
        System.out.println("✓ ¿Son la misma instancia? " + (sistema1 == sistema2));
        System.out.println("✓ Nombre del sistema: " + sistema1.getNombreSistema());
        System.out.println();
        
        // 2. PATRÓN FACTORY METHOD
        System.out.println("2. PATRÓN FACTORY METHOD - Creación de Animales");
        System.out.println("-".repeat(50));
        Animal perro = FabricaAnimales.crearAnimal("perro", "Max", 3, "Labrador");
        Animal gato = FabricaAnimales.crearAnimal("gato", "Luna", 2, "Persa");
        Animal ave = FabricaAnimales.crearAnimal("ave", "Paco", 1, "Loro");
        
        System.out.println("✓ Perro creado: " + perro.getNombre() + " (" + perro.getRaza() + ")");
        System.out.println("✓ Gato creado: " + gato.getNombre() + " (" + gato.getRaza() + ")");
        System.out.println("✓ Ave creada: " + ave.getNombre() + " (" + ave.getRaza() + ")");
        System.out.println("✓ Cuidados del perro: " + perro.getCuidadosEspeciales());
        System.out.println("✓ Enfermedades comunes del gato: " + gato.getEnfermedadesComunes());
        System.out.println("✓ Horario de alimentación del ave: " + ave.getHorarioAlimentacion());
        System.out.println();
        
        // 3. PATRÓN ABSTRACT FACTORY
        System.out.println("3. PATRÓN ABSTRACT FACTORY - Familias de Mascotas");
        System.out.println("-".repeat(50));
        MascotaDomestica mascotaDomestica = FabricaFamilia.crearMascotaDomestica("Buddy", 4, "Golden Retriever", "Ana Martín");
        MascotaExotica mascotaExotica = FabricaFamilia.crearMascotaExotica("Kiwi", 2, "Guacamayo", "Roberto Silva");
        
        System.out.println("✓ Mascota doméstica: " + mascotaDomestica.getNombre());
        System.out.println("  - Cuidados especiales: " + mascotaDomestica.getCuidadosEspeciales());
        System.out.println("✓ Mascota exótica: " + mascotaExotica.getNombre());
        System.out.println("  - Cuidados especiales: " + mascotaExotica.getCuidadosEspeciales());
        System.out.println();
        
        // 4. PATRÓN BUILDER
        System.out.println("4. PATRÓN BUILDER - Construcción de Registros");
        System.out.println("-".repeat(50));
        RegistroMascota registro = new ConstructorRegistro()
            .setNombre("Rex")
            .setEdad(5)
            .setRaza("Pastor Alemán")
            .setTipoAnimal("perro")
            .setDueño("Laura Torres")
            .setTelefono("3001234567")
            .setEmail("laura@email.com")
            .setAlergias("Polen", "Ciertos medicamentos")
            .setCondicionesCronicas("Artritis")
            .construir();
        
        System.out.println("✓ Registro complejo creado:");
        System.out.println("  - Nombre: " + registro.getNombre());
        System.out.println("  - Edad: " + registro.getEdad() + " años");
        System.out.println("  - Raza: " + registro.getRaza());
        System.out.println("  - Dueño: " + registro.getDueño());
        System.out.println("  - Teléfono: " + registro.getTelefono());
        System.out.println("  - Email: " + registro.getEmail());
        System.out.println("  - Alergias: " + registro.getAlergias());
        System.out.println("  - Condiciones crónicas: " + registro.getCondicionesCronicas());
        System.out.println();
        
        // 5. PATRÓN PROTOTYPE
        System.out.println("5. PATRÓN PROTOTYPE - Clonación de Registros");
        System.out.println("-".repeat(50));
        RegistroMascota original = new ConstructorRegistro()
            .setNombre("Mittens")
            .setEdad(3)
            .setRaza("Siamés")
            .setTipoAnimal("gato")
            .setDueño("Pedro Ruiz")
            .setTelefono("3009876543")
            .setEmail("pedro@email.com")
            .setAlergias("Ciertos alimentos")
            .construir();
        
        System.out.println("✓ Registro original creado: " + original.getNombre());
        
        // Clonar el registro
        RegistroMascota clonado = original.clonar();
        clonado.setNombre("Mittens Jr");
        clonado.setEdad(0);
        
        System.out.println("✓ Registro clonado:");
        System.out.println("  - Nombre original: " + original.getNombre());
        System.out.println("  - Nombre clonado: " + clonado.getNombre());
        System.out.println("  - Misma raza: " + (original.getRaza().equals(clonado.getRaza())));
        System.out.println("  - Mismo dueño: " + (original.getDueño().equals(clonado.getDueño())));
        System.out.println("  - Mismas alergias: " + (original.getAlergias().equals(clonado.getAlergias())));
        System.out.println();
        
        System.out.println("========================================");
        System.out.println("  FIN DE LA DEMOSTRACIÓN");
        System.out.println("========================================");
        System.out.println();
        System.out.println("✓ Todos los patrones de diseño funcionan correctamente:");
        System.out.println("  - Singleton: Sistema central único");
        System.out.println("  - Factory Method: Creación de animales");
        System.out.println("  - Abstract Factory: Familias de mascotas");
        System.out.println("  - Builder: Construcción de registros complejos");
        System.out.println("  - Prototype: Clonación de registros");
        System.out.println();
        System.out.println("🎉 ¡Proyecto convertido exitosamente a Java!");
    }
}

// ===== IMPLEMENTACIÓN DE PATRONES =====

// 1. SINGLETON
class SistemaVeterinario {
    private static SistemaVeterinario instancia;
    private final String nombreSistema;
    
    private SistemaVeterinario() {
        this.nombreSistema = "Sistema Veterinario Patrones";
    }
    
    public static SistemaVeterinario getInstance() {
        if (instancia == null) {
            instancia = new SistemaVeterinario();
        }
        return instancia;
    }
    
    public String getNombreSistema() {
        return nombreSistema;
    }
}

// 2. FACTORY METHOD
abstract class Animal {
    protected String nombre;
    protected int edad;
    protected String raza;
    
    public Animal(String nombre, int edad, String raza) {
        this.nombre = nombre;
        this.edad = edad;
        this.raza = raza;
    }
    
    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }
    public String getRaza() { return raza; }
    
    public abstract String getCuidadosEspeciales();
    public abstract String getEnfermedadesComunes();
    public abstract String getHorarioAlimentacion();
}

class Perro extends Animal {
    public Perro(String nombre, int edad, String raza) {
        super(nombre, edad, raza);
    }
    
    @Override
    public String getCuidadosEspeciales() {
        return "Ejercicio diario, cepillado regular";
    }
    
    @Override
    public String getEnfermedadesComunes() {
        return "Displasia de cadera, problemas cardíacos";
    }
    
    @Override
    public String getHorarioAlimentacion() {
        return "2 veces al día";
    }
}

class Gato extends Animal {
    public Gato(String nombre, int edad, String raza) {
        super(nombre, edad, raza);
    }
    
    @Override
    public String getCuidadosEspeciales() {
        return "Cepillado, limpieza de arenero";
    }
    
    @Override
    public String getEnfermedadesComunes() {
        return "Problemas renales, diabetes";
    }
    
    @Override
    public String getHorarioAlimentacion() {
        return "3 veces al día";
    }
}

class Ave extends Animal {
    public Ave(String nombre, int edad, String raza) {
        super(nombre, edad, raza);
    }
    
    @Override
    public String getCuidadosEspeciales() {
        return "Jaula espaciosa, estimulación mental";
    }
    
    @Override
    public String getEnfermedadesComunes() {
        return "Problemas respiratorios, plumas";
    }
    
    @Override
    public String getHorarioAlimentacion() {
        return "Semillas frescas diarias";
    }
}

class FabricaAnimales {
    public static Animal crearAnimal(String tipo, String nombre, int edad, String raza) {
        switch (tipo.toLowerCase()) {
            case "perro":
                return new Perro(nombre, edad, raza);
            case "gato":
                return new Gato(nombre, edad, raza);
            case "ave":
                return new Ave(nombre, edad, raza);
            default:
                throw new IllegalArgumentException("Tipo de animal no soportado: " + tipo);
        }
    }
}

// 3. ABSTRACT FACTORY
abstract class Mascota {
    protected String nombre;
    protected int edad;
    protected String raza;
    protected String dueño;
    
    public Mascota(String nombre, int edad, String raza, String dueño) {
        this.nombre = nombre;
        this.edad = edad;
        this.raza = raza;
        this.dueño = dueño;
    }
    
    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }
    public String getRaza() { return raza; }
    public String getDueño() { return dueño; }
    
    public abstract String getCuidadosEspeciales();
}

class MascotaDomestica extends Mascota {
    public MascotaDomestica(String nombre, int edad, String raza, String dueño) {
        super(nombre, edad, raza, dueño);
    }
    
    @Override
    public String getCuidadosEspeciales() {
        return "Cuidados estándar, ambiente familiar, fácil manejo";
    }
}

class MascotaExotica extends Mascota {
    public MascotaExotica(String nombre, int edad, String raza, String dueño) {
        super(nombre, edad, raza, dueño);
    }
    
    @Override
    public String getCuidadosEspeciales() {
        return "Cuidados especializados, ambiente controlado, permisos especiales";
    }
}

class FabricaFamilia {
    public static MascotaDomestica crearMascotaDomestica(String nombre, int edad, String raza, String dueño) {
        return new MascotaDomestica(nombre, edad, raza, dueño);
    }
    
    public static MascotaExotica crearMascotaExotica(String nombre, int edad, String raza, String dueño) {
        return new MascotaExotica(nombre, edad, raza, dueño);
    }
}

// 4. BUILDER
class RegistroMascota {
    private String nombre;
    private int edad;
    private String raza;
    private String tipoAnimal;
    private String dueño;
    private String telefono;
    private String email;
    private String alergias;
    private String condicionesCronicas;
    
    // Constructor público para usar con Builder
    public RegistroMascota() {}
    
    // Getters
    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }
    public String getRaza() { return raza; }
    public String getTipoAnimal() { return tipoAnimal; }
    public String getDueño() { return dueño; }
    public String getTelefono() { return telefono; }
    public String getEmail() { return email; }
    public String getAlergias() { return alergias; }
    public String getCondicionesCronicas() { return condicionesCronicas; }
    
    // Setters para Builder
    public void setNombre(String nombre) { this.nombre = nombre; }
    public void setEdad(int edad) { this.edad = edad; }
    public void setRaza(String raza) { this.raza = raza; }
    public void setTipoAnimal(String tipoAnimal) { this.tipoAnimal = tipoAnimal; }
    public void setDueño(String dueño) { this.dueño = dueño; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public void setEmail(String email) { this.email = email; }
    public void setAlergias(String alergias) { this.alergias = alergias; }
    public void setCondicionesCronicas(String condicionesCronicas) { this.condicionesCronicas = condicionesCronicas; }
    
    // Método para clonación (Prototype)
    public RegistroMascota clonar() {
        RegistroMascota clon = new RegistroMascota();
        clon.nombre = this.nombre;
        clon.edad = this.edad;
        clon.raza = this.raza;
        clon.tipoAnimal = this.tipoAnimal;
        clon.dueño = this.dueño;
        clon.telefono = this.telefono;
        clon.email = this.email;
        clon.alergias = this.alergias;
        clon.condicionesCronicas = this.condicionesCronicas;
        return clon;
    }
}

class ConstructorRegistro {
    private final RegistroMascota registro;
    
    public ConstructorRegistro() {
        this.registro = new RegistroMascota();
    }
    
    public ConstructorRegistro setNombre(String nombre) {
        registro.setNombre(nombre);
        return this;
    }
    
    public ConstructorRegistro setEdad(int edad) {
        registro.setEdad(edad);
        return this;
    }
    
    public ConstructorRegistro setRaza(String raza) {
        registro.setRaza(raza);
        return this;
    }
    
    public ConstructorRegistro setTipoAnimal(String tipoAnimal) {
        registro.setTipoAnimal(tipoAnimal);
        return this;
    }
    
    public ConstructorRegistro setDueño(String dueño) {
        registro.setDueño(dueño);
        return this;
    }
    
    public ConstructorRegistro setTelefono(String telefono) {
        registro.setTelefono(telefono);
        return this;
    }
    
    public ConstructorRegistro setEmail(String email) {
        registro.setEmail(email);
        return this;
    }
    
    public ConstructorRegistro setAlergias(String... alergias) {
        registro.setAlergias(String.join(", ", alergias));
        return this;
    }
    
    public ConstructorRegistro setCondicionesCronicas(String... condiciones) {
        registro.setCondicionesCronicas(String.join(", ", condiciones));
        return this;
    }
    
    public RegistroMascota construir() {
        return registro;
    }
}

