package com.veterinary;

import com.veterinary.patterns.service.VeterinaryService;
import com.veterinary.patterns.service.AnimalFactoryService;
import com.veterinary.patterns.builder.PetBuilder;
import com.veterinary.patterns.model.Pet;

import java.util.*;

/**
 * Ejemplo de uso de la aplicación Gestor de Mascotas Veterinaria
 * Demuestra cómo usar todos los patrones implementados
 */
public class EjemploUso {

    public static void main(String[] args) {
        System.out.println("Ejemplos de uso de la aplicación Gestor de Mascotas Veterinaria");
        System.out.println("======================================================================");
        System.out.println();
        
        try {
            ejemploCompleto();
            System.out.println();
            ejemploPatrones();
            
        } catch (Exception e) {
            System.out.println("Error al ejecutar el ejemplo: " + e.getMessage());
            System.out.println("Asegúrese de que todos los archivos estén en su lugar correcto.");
            e.printStackTrace();
        }
    }

    /**
     * Ejemplo completo de uso de todos los patrones
     */
    public static void ejemploCompleto() {
        System.out.println("=== EJEMPLO COMPLETO DE USO ===\n");
        
        try {
            // 1. Singleton - Obtener el sistema veterinario
        System.out.println("1. Usando Singleton - Sistema Veterinario");
        System.out.println("----------------------------------------");
        VeterinaryService sistema = VeterinaryService.getInstance();
        Map<String, Object> info = sistema.getSystemInfo();
        System.out.println("Sistema: " + info.get("systemName"));
        System.out.println("Versión: " + info.get("version"));
        System.out.println("Clínica: " + info.get("clinicName"));
        System.out.println();
        
        // 2. Factory Method - Crear animales
        System.out.println("2. Usando Factory Method - Creación de Animales");
        System.out.println("-----------------------------------------------");
        AnimalFactoryService factory = new AnimalFactoryService();
        
        // Mostrar tipos de animales disponibles
        List<String> tiposAnimales = factory.getAnimalTypes();
        System.out.println("Tipos de animales disponibles: " + tiposAnimales);
        
        // Mostrar razas de perros
        List<String> razasPerros = factory.getBreedsForAnimalType("dog");
        System.out.println("Razas de perros disponibles: " + razasPerros.subList(0, Math.min(5, razasPerros.size())));
        System.out.println();
        
        // 3. Abstract Factory - Familias de mascotas
        System.out.println("3. Usando Abstract Factory - Familias de Mascotas");
        System.out.println("------------------------------------------------");
        List<String> caracteristicasDomesticas = factory.getFamilyCharacteristics("domestic");
        List<String> caracteristicasExoticas = factory.getFamilyCharacteristics("exotic");
        
        System.out.println("Características familia doméstica: " + caracteristicasDomesticas.subList(0, Math.min(3, caracteristicasDomesticas.size())));
            System.out.println("Características familia exótica: " + caracteristicasExoticas.subList(0, Math.min(3, caracteristicasExoticas.size())));
        System.out.println();
        
        // 4. Builder - Construir registro completo
        System.out.println("4. Usando Builder - Construcción de Registros");
        System.out.println("---------------------------------------------");
        PetBuilder builder = new PetBuilder();
        Pet registroCompleto = builder
            .setName("Max")
            .setAge(3)
            .setBreed("Labrador Retriever")
            .setAnimalType("dog")
            .setFamilyType("domestic")
            .setOwnerName("Juan Pérez")
            .setOwnerPhone("3001234567")
            .setOwnerEmail("juan@email.com")
            .setEmergencyContact("3007654321")
            .setStatus("Activo")
            .setVaccinationStatus("Al día")
            .addAllergy("Polen")
            .addAllergy("Ciertos medicamentos")
            .addChronicCondition("Artritis leve")
            .build();
        
        System.out.println("Registro completo creado:");
        System.out.println("  - Nombre: " + registroCompleto.getName());
        System.out.println("  - Edad: " + registroCompleto.getAge() + " años");
        System.out.println("  - Raza: " + registroCompleto.getBreed());
        System.out.println("  - Dueño: " + registroCompleto.getOwnerName());
        System.out.println("  - Teléfono: " + registroCompleto.getOwnerPhone());
        System.out.println("  - Email: " + registroCompleto.getOwnerEmail());
        System.out.println("  - Alergias: " + registroCompleto.getAllergies());
        System.out.println("  - Condiciones crónicas: " + registroCompleto.getChronicConditions());
        System.out.println();
        
        // Registrar en el sistema
        Pet mascotaRegistrada = sistema.registerPet(
            registroCompleto.getName(),
            registroCompleto.getAge(),
            registroCompleto.getBreed(),
            registroCompleto.getAnimalType(),
            registroCompleto.getFamilyType(),
            registroCompleto.getOwnerName()
        );
        
        System.out.println("Mascota registrada con ID: " + mascotaRegistrada.getId());
        System.out.println();
        
        // 5. Prototype - Clonar registro
        System.out.println("5. Usando Prototype - Clonación de Registros");
        System.out.println("-------------------------------------------");
        Pet mascotaClonada = sistema.clonePet(mascotaRegistrada.getId(), "Max Jr");
        
        System.out.println("Mascota clonada:");
        System.out.println("  - Nombre original: " + mascotaRegistrada.getName());
        System.out.println("  - Nombre clonado: " + mascotaClonada.getName());
        System.out.println("  - Misma raza: " + (mascotaRegistrada.getBreed().equals(mascotaClonada.getBreed())));
        System.out.println("  - Mismo dueño: " + (mascotaRegistrada.getOwnerName().equals(mascotaClonada.getOwnerName())));
        System.out.println("  - IDs diferentes: " + (!mascotaRegistrada.getId().equals(mascotaClonada.getId())));
            System.out.println();
            
        } catch (Exception e) {
            System.out.println("Error en ejemplo completo: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Ejemplo de demostración de patrones
     */
    public static void ejemploPatrones() {
        System.out.println("=== DEMOSTRACIÓN DE PATRONES ===\n");
        
        try {
            VeterinaryService sistema = VeterinaryService.getInstance();
        AnimalFactoryService factory = new AnimalFactoryService();
        
        // Crear varias mascotas de ejemplo
        System.out.println("Creando mascotas de ejemplo...");
        
        Pet perro = sistema.registerPet("Buddy", 4, "Golden Retriever", "dog", "domestic", "Ana Martín");
        Pet gato = sistema.registerPet("Luna", 2, "Persian", "cat", "domestic", "María García");
        Pet ave = sistema.registerPet("Paco", 1, "Budgerigar", "bird", "exotic", "Carlos López");
        Pet reptil = sistema.registerPet("Spike", 3, "Bearded Dragon", "reptile", "exotic", "Roberto Silva");
        
        System.out.println("✓ Perro registrado: " + perro.getName() + " (ID: " + perro.getId() + ")");
        System.out.println("✓ Gato registrado: " + gato.getName() + " (ID: " + gato.getId() + ")");
        System.out.println("✓ Ave registrada: " + ave.getName() + " (ID: " + ave.getId() + ")");
        System.out.println("✓ Reptil registrado: " + reptil.getName() + " (ID: " + reptil.getId() + ")");
        System.out.println();
        
        // Mostrar información del sistema
        Map<String, Object> infoSistema = sistema.getSystemInfo();
        System.out.println("Información del sistema:");
        System.out.println("  - Total mascotas: " + infoSistema.get("totalPets"));
        System.out.println("  - Sistema: " + infoSistema.get("systemName"));
        System.out.println("  - Clínica: " + infoSistema.get("clinicName"));
        System.out.println();
        
        // Demostrar búsqueda
        System.out.println("Buscando mascotas con 'Buddy'...");
        List<Pet> resultados = sistema.searchPets("Buddy");
        System.out.println("Resultados encontrados: " + resultados.size());
        for (Pet mascota : resultados) {
            System.out.println("  - " + mascota.getName() + " (" + mascota.getBreed() + ")");
        }
        System.out.println();
        
        // Demostrar clonación
        System.out.println("Clonando mascota 'Luna'...");
        Pet lunaClonada = sistema.clonePet(gato.getId(), "Luna Jr");
        System.out.println("✓ Luna clonada como: " + lunaClonada.getName());
        System.out.println();
        
        // Mostrar todas las mascotas
        System.out.println("Todas las mascotas registradas:");
        List<Pet> todasLasMascotas = sistema.getAllPets();
        for (Pet mascota : todasLasMascotas) {
            System.out.println("  - ID: " + mascota.getId() + " | " + mascota.getName() + 
                             " (" + mascota.getBreed() + ") | Dueño: " + mascota.getOwnerName());
        }
        System.out.println();
        
        System.out.println("=== FIN DE LA DEMOSTRACIÓN ===");
        System.out.println();
        System.out.println("✓ Todos los patrones funcionan correctamente:");
        System.out.println("  - Singleton: Sistema central único");
        System.out.println("  - Factory Method: Creación de animales");
            System.out.println("  - Abstract Factory: Familias de mascotas");
            System.out.println("  - Builder: Construcción de registros complejos");
            System.out.println("  - Prototype: Clonación de registros");
            
        } catch (Exception e) {
            System.out.println("Error en demostración de patrones: " + e.getMessage());
            e.printStackTrace();
        }
    }
}