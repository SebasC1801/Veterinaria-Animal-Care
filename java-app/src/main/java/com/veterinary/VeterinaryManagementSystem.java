package com.veterinary;

import com.veterinary.patterns.service.VeterinaryService;
import com.veterinary.patterns.service.AnimalFactoryService;
import com.veterinary.patterns.builder.PetBuilder;
import com.veterinary.patterns.model.Pet;

import java.util.*;
import java.util.List;
import java.util.Scanner;

/**
 * Sistema Principal de Gestión Veterinaria
 * Implementa todos los patrones de diseño requeridos:
 * - Singleton: Sistema central de gestión
 * - Factory Method: Creación de animales
 * - Abstract Factory: Familias de mascotas
 * - Builder: Construcción de registros
 * - Prototype: Clonación de registros
 * 
 * Esta clase consolida toda la funcionalidad del proyecto Python en Java
 */
public class VeterinaryManagementSystem {
    
    private static VeterinaryManagementSystem instance;
    private final VeterinaryService veterinaryService;
    private final AnimalFactoryService animalFactoryService;
    
    private VeterinaryManagementSystem() {
        this.veterinaryService = VeterinaryService.getInstance();
        this.animalFactoryService = new AnimalFactoryService();
    }
    
    public static synchronized VeterinaryManagementSystem getInstance() {
        if (instance == null) {
            instance = new VeterinaryManagementSystem();
        }
        return instance;
    }
    
    /**
     * Demuestra todos los patrones de diseño implementados
     */
    public void demonstrateAllPatterns() {
        System.out.println("========================================");
        System.out.println("  DEMOSTRACIÓN DE PATRONES DE DISEÑO");
        System.out.println("========================================");
        System.out.println();
        
        demonstrateSingletonPattern();
        demonstrateFactoryMethodPattern();
        demonstrateAbstractFactoryPattern();
        demonstrateBuilderPattern();
        demonstratePrototypePattern();
        
        System.out.println("========================================");
        System.out.println("  FIN DE LA DEMOSTRACIÓN");
        System.out.println("========================================");
    }
    
    /**
     * 1. PATRÓN SINGLETON - Sistema Central
     */
    private void demonstrateSingletonPattern() {
        System.out.println("1. PATRÓN SINGLETON - Sistema Central");
        System.out.println("-".repeat(50));
        
        // Demostrar que siempre obtenemos la misma instancia
        VeterinaryService service1 = VeterinaryService.getInstance();
        VeterinaryService service2 = VeterinaryService.getInstance();
        
        System.out.println("✓ VeterinaryService - Misma instancia: " + (service1 == service2));
        System.out.println("✓ Sistema principal - Misma instancia: " + (this == getInstance()));
        
        // Mostrar información del sistema
        Map<String, Object> systemInfo = veterinaryService.getSystemInfo();
        System.out.println("✓ Nombre del sistema: " + systemInfo.get("systemName"));
        System.out.println("✓ Versión: " + systemInfo.get("version"));
        System.out.println("✓ Total mascotas registradas: " + veterinaryService.getTotalPets());
        System.out.println();
    }
    
    /**
     * 2. PATRÓN FACTORY METHOD - Creación de Animales
     */
    private void demonstrateFactoryMethodPattern() {
        System.out.println("2. PATRÓN FACTORY METHOD - Creación de Animales");
        System.out.println("-".repeat(50));
        
        try {
            // Demostrar Factory Method usando AnimalFactoryService
            List<String> dogBreeds = animalFactoryService.getBreedsForAnimalType("dog");
            List<String> catBreeds = animalFactoryService.getBreedsForAnimalType("cat");
            List<String> birdBreeds = animalFactoryService.getBreedsForAnimalType("bird");
            List<String> reptileBreeds = animalFactoryService.getBreedsForAnimalType("reptile");
            
            System.out.println("✓ Razas de perros disponibles: " + dogBreeds.size());
            System.out.println("  - Ejemplos: " + dogBreeds.subList(0, Math.min(3, dogBreeds.size())));
            
            System.out.println("✓ Razas de gatos disponibles: " + catBreeds.size());
            System.out.println("  - Ejemplos: " + catBreeds.subList(0, Math.min(3, catBreeds.size())));
            
            System.out.println("✓ Razas de aves disponibles: " + birdBreeds.size());
            System.out.println("  - Ejemplos: " + birdBreeds.subList(0, Math.min(3, birdBreeds.size())));
            
            System.out.println("✓ Razas de reptiles disponibles: " + reptileBreeds.size());
            System.out.println("  - Ejemplos: " + reptileBreeds.subList(0, Math.min(3, reptileBreeds.size())));
            
            // Crear mascotas usando el servicio
            Pet dog = veterinaryService.registerPet("Max", 3, "Labrador Retriever", "dog", "domestic", "Juan Pérez");
            Pet cat = veterinaryService.registerPet("Luna", 2, "Persian", "cat", "domestic", "María García");
            
            System.out.println("✓ Perro creado: " + dog.getName() + " (" + dog.getBreed() + ")");
            System.out.println("✓ Gato creado: " + cat.getName() + " (" + cat.getBreed() + ")");
            System.out.println();
            
        } catch (Exception e) {
            System.out.println("✗ Error en Factory Method: " + e.getMessage());
            System.out.println();
        }
    }
    
    /**
     * 3. PATRÓN ABSTRACT FACTORY - Familias de Mascotas
     */
    private void demonstrateAbstractFactoryPattern() {
        System.out.println("3. PATRÓN ABSTRACT FACTORY - Familias de Mascotas");
        System.out.println("-".repeat(50));
        
        try {
            // Demostrar Abstract Factory usando AnimalFactoryService
            List<String> domesticChars = animalFactoryService.getFamilyCharacteristics("domestic");
            List<String> exoticChars = animalFactoryService.getFamilyCharacteristics("exotic");
            
            System.out.println("✓ Características familia doméstica: " + domesticChars.size());
            System.out.println("  - Ejemplos: " + domesticChars.subList(0, Math.min(3, domesticChars.size())));
            
            System.out.println("✓ Características familia exótica: " + exoticChars.size());
            System.out.println("  - Ejemplos: " + exoticChars.subList(0, Math.min(3, exoticChars.size())));
            
            // Crear mascotas de diferentes familias
            Pet domesticDog = veterinaryService.registerPet("Buddy", 4, "Golden Retriever", "dog", "domestic", "Ana Martín");
            Pet exoticBird = veterinaryService.registerPet("Kiwi", 2, "Macaw", "bird", "exotic", "Roberto Silva");
            Pet domesticCat = veterinaryService.registerPet("Whiskers", 3, "Maine Coon", "cat", "domestic", "Laura Torres");
            Pet exoticReptile = veterinaryService.registerPet("Rex", 5, "Bearded Dragon", "reptile", "exotic", "Pedro Ruiz");
            
            System.out.println("✓ Perro doméstico: " + domesticDog.getName() + " (" + domesticDog.getFamilyType() + ")");
            System.out.println("✓ Ave exótica: " + exoticBird.getName() + " (" + exoticBird.getFamilyType() + ")");
            System.out.println("✓ Gato doméstico: " + domesticCat.getName() + " (" + domesticCat.getFamilyType() + ")");
            System.out.println("✓ Reptil exótico: " + exoticReptile.getName() + " (" + exoticReptile.getFamilyType() + ")");
            
            // Mostrar información de tipos de familia
            List<String> familyTypes = animalFactoryService.getFamilyTypes();
            System.out.println("✓ Tipos de familia disponibles: " + familyTypes);
            System.out.println();
            
        } catch (Exception e) {
            System.out.println("✗ Error en Abstract Factory: " + e.getMessage());
            System.out.println();
        }
    }
    
    /**
     * 4. PATRÓN BUILDER - Construcción de Registros
     */
    private void demonstrateBuilderPattern() {
        System.out.println("4. PATRÓN BUILDER - Construcción de Registros");
        System.out.println("-".repeat(50));
        
        try {
            // Construir registro completo usando Builder
            PetBuilder builder = new PetBuilder();
            Pet complexPet = builder
                .setName("Rex")
                .setAge(5)
                .setBreed("Pastor Alemán")
                .setAnimalType("dog")
                .setFamilyType("domestic")
                .setOwnerName("Laura Torres")
                .setOwnerPhone("3001234567")
                .setOwnerEmail("laura@email.com")
                .setEmergencyContact("3007654321")
                .setStatus("Activo")
                .setVaccinationStatus("Al día")
                .addAllergy("Polen")
                .addAllergy("Ciertos medicamentos")
                .addChronicCondition("Artritis")
                .build();
            
            System.out.println("✓ Registro complejo creado:");
            System.out.println("  - Nombre: " + complexPet.getName());
            System.out.println("  - Edad: " + complexPet.getAge() + " años");
            System.out.println("  - Raza: " + complexPet.getBreed());
            System.out.println("  - Dueño: " + complexPet.getOwnerName());
            System.out.println("  - Teléfono: " + complexPet.getOwnerPhone());
            System.out.println("  - Email: " + complexPet.getOwnerEmail());
            System.out.println("  - Alergias: " + complexPet.getAllergies());
            System.out.println("  - Condiciones crónicas: " + complexPet.getChronicConditions());
            System.out.println("  - Estado de vacunación: " + complexPet.getVaccinationStatus());
            
            // Registrar en el sistema
            veterinaryService.registerPet(complexPet.getName(), complexPet.getAge(), 
                complexPet.getBreed(), complexPet.getAnimalType(), 
                complexPet.getFamilyType(), complexPet.getOwnerName());
            
            System.out.println("✓ Registro guardado en el sistema");
            System.out.println();
            
        } catch (Exception e) {
            System.out.println("✗ Error en Builder: " + e.getMessage());
            System.out.println();
        }
    }
    
    /**
     * 5. PATRÓN PROTOTYPE - Clonación de Registros
     */
    private void demonstratePrototypePattern() {
        System.out.println("5. PATRÓN PROTOTYPE - Clonación de Registros");
        System.out.println("-".repeat(50));
        
        try {
            // Crear un registro original usando Builder
            PetBuilder builder = new PetBuilder();
            Pet originalPet = builder
                .setName("Mittens")
                .setAge(3)
                .setBreed("Siamés")
                .setAnimalType("cat")
                .setFamilyType("domestic")
                .setOwnerName("Pedro Ruiz")
                .setOwnerPhone("3009876543")
                .setOwnerEmail("pedro@email.com")
                .setStatus("Activo")
                .setVaccinationStatus("Al día")
                .addAllergy("Ciertos alimentos")
                .build();
            
            System.out.println("✓ Registro original creado: " + originalPet.getName());
            
            // Registrar en el sistema
            veterinaryService.registerPet(originalPet.getName(), originalPet.getAge(), 
                originalPet.getBreed(), originalPet.getAnimalType(), 
                originalPet.getFamilyType(), originalPet.getOwnerName());
            
            // Obtener el ID del registro registrado
            List<Pet> pets = veterinaryService.getAllPets();
            Long originalId = pets.get(pets.size() - 1).getId();
            
            // Clonar usando Prototype Pattern
            Pet clonedPet = veterinaryService.clonePet(originalId, "Mittens Jr");
            
            System.out.println("✓ Registro clonado:");
            System.out.println("  - Nombre original: " + originalPet.getName());
            System.out.println("  - Nombre clonado: " + clonedPet.getName());
            System.out.println("  - Misma raza: " + (originalPet.getBreed().equals(clonedPet.getBreed())));
            System.out.println("  - Mismo dueño: " + (originalPet.getOwnerName().equals(clonedPet.getOwnerName())));
            System.out.println("  - Mismas alergias: " + (originalPet.getAllergies().equals(clonedPet.getAllergies())));
            System.out.println("  - IDs diferentes: " + (!originalPet.getId().equals(clonedPet.getId())));
            
            System.out.println("✓ Prototype Pattern funcionando correctamente");
            System.out.println();
            
        } catch (Exception e) {
            System.out.println("✗ Error en Prototype: " + e.getMessage());
            System.out.println();
        }
    }
    
    /**
     * Muestra un menú interactivo para el usuario
     */
    public void showInteractiveMenu() {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("========================================");
        System.out.println("  SISTEMA DE GESTIÓN VETERINARIA");
        System.out.println("========================================");
        System.out.println();
        
        while (true) {
            System.out.println("Opciones disponibles:");
            System.out.println("1. Demostrar todos los patrones de diseño");
            System.out.println("2. Registrar nueva mascota");
            System.out.println("3. Ver todas las mascotas registradas");
            System.out.println("4. Buscar mascotas");
            System.out.println("5. Clonar mascota existente");
            System.out.println("6. Ver información del sistema");
            System.out.println("7. Salir");
            System.out.println();
            
            System.out.print("Seleccione una opción (1-7): ");
            String choice = scanner.nextLine().trim();
            
            switch (choice) {
                case "1":
                    demonstrateAllPatterns();
                    break;
                    
                case "2":
                    registerNewPet(scanner);
                    break;
                    
                case "3":
                    showAllPets();
                    break;
                    
                case "4":
                    searchPets(scanner);
                    break;
                    
                case "5":
                    clonePet(scanner);
                    break;
                    
                case "6":
                    showSystemInfo();
                    break;
                    
                case "7":
                    System.out.println("¡Hasta luego!");
                    scanner.close();
                    return;
                    
                default:
                    System.out.println("Opción inválida. Por favor seleccione 1-7.");
            }
            
            System.out.println();
            System.out.println("Presione Enter para continuar...");
            scanner.nextLine();
        }
    }
    
    private void registerNewPet(Scanner scanner) {
        System.out.println("=== REGISTRO DE NUEVA MASCOTA ===");
        
        System.out.print("Nombre de la mascota: ");
        String name = scanner.nextLine().trim();
        
        System.out.print("Edad: ");
        int age = Integer.parseInt(scanner.nextLine().trim());
        
        System.out.print("Raza: ");
        String breed = scanner.nextLine().trim();
        
        System.out.println("Tipos de animal disponibles: dog, cat, bird, reptile");
        System.out.print("Tipo de animal: ");
        String animalType = scanner.nextLine().trim();
        
        System.out.println("Tipos de familia disponibles: domestic, exotic");
        System.out.print("Tipo de familia: ");
        String familyType = scanner.nextLine().trim();
        
        System.out.print("Nombre del dueño: ");
        String ownerName = scanner.nextLine().trim();
        
        try {
            Pet pet = veterinaryService.registerPet(name, age, breed, animalType, familyType, ownerName);
            System.out.println("✓ Mascota registrada exitosamente con ID: " + pet.getId());
        } catch (Exception e) {
            System.out.println("✗ Error al registrar la mascota: " + e.getMessage());
        }
    }
    
    private void showAllPets() {
        System.out.println("=== TODAS LAS MASCOTAS REGISTRADAS ===");
        List<Pet> pets = veterinaryService.getAllPets();
        
        if (pets.isEmpty()) {
            System.out.println("No hay mascotas registradas.");
            return;
        }
        
        for (Pet pet : pets) {
            System.out.println("ID: " + pet.getId() + " | " + pet.getName() + " (" + pet.getBreed() + ") | Dueño: " + pet.getOwnerName());
        }
    }
    
    private void searchPets(Scanner scanner) {
        System.out.println("=== BÚSQUEDA DE MASCOTAS ===");
        System.out.print("Ingrese término de búsqueda: ");
        String query = scanner.nextLine().trim();
        
        List<Pet> results = veterinaryService.searchPets(query);
        
        if (results.isEmpty()) {
            System.out.println("No se encontraron mascotas con ese término.");
            return;
        }
        
        System.out.println("Resultados encontrados:");
        for (Pet pet : results) {
            System.out.println("ID: " + pet.getId() + " | " + pet.getName() + " (" + pet.getBreed() + ") | Dueño: " + pet.getOwnerName());
        }
    }
    
    private void clonePet(Scanner scanner) {
        System.out.println("=== CLONAR MASCOTA ===");
        
        List<Pet> pets = veterinaryService.getAllPets();
        if (pets.isEmpty()) {
            System.out.println("No hay mascotas registradas para clonar.");
            return;
        }
        
        System.out.println("Mascotas disponibles:");
        for (Pet pet : pets) {
            System.out.println("ID: " + pet.getId() + " | " + pet.getName() + " (" + pet.getBreed() + ")");
        }
        
        System.out.print("Ingrese ID de la mascota a clonar: ");
        Long petId = Long.valueOf(scanner.nextLine().trim());
        
        System.out.print("Nuevo nombre para la mascota clonada: ");
        String newName = scanner.nextLine().trim();
        
        try {
            Pet clonedPet = veterinaryService.clonePet(petId, newName);
            System.out.println("✓ Mascota clonada exitosamente con ID: " + clonedPet.getId());
        } catch (Exception e) {
            System.out.println("✗ Error al clonar la mascota: " + e.getMessage());
        }
    }
    
    private void showSystemInfo() {
        System.out.println("=== INFORMACIÓN DEL SISTEMA ===");
        Map<String, Object> systemInfo = veterinaryService.getSystemInfo();
        
        System.out.println("Nombre del sistema: " + systemInfo.get("systemName"));
        System.out.println("Versión: " + systemInfo.get("version"));
        System.out.println("Total mascotas: " + systemInfo.get("totalPets"));
        System.out.println("Última actualización: " + systemInfo.get("lastUpdated"));
        System.out.println("Nombre de la clínica: " + systemInfo.get("clinicName"));
        System.out.println("Dirección: " + systemInfo.get("clinicAddress"));
        System.out.println("Teléfono: " + systemInfo.get("clinicPhone"));
    }
    
    /**
     * Método principal para ejecutar la aplicación
     */
    public static void main(String[] args) {
        VeterinaryManagementSystem system = VeterinaryManagementSystem.getInstance();
        
        if (args.length > 0 && args[0].equals("--demo")) {
            // Modo demostración automática
            system.demonstrateAllPatterns();
        } else {
            // Modo interactivo
            system.showInteractiveMenu();
        }
    }
}
