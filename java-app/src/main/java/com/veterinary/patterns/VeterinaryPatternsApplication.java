package com.veterinary.patterns;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;

import com.veterinary.patterns.service.VeterinaryService;
import com.veterinary.patterns.service.AnimalFactoryService;
import com.veterinary.patterns.builder.PetBuilder;
import com.veterinary.patterns.model.Pet;

import java.util.Map;
import java.util.List;

/**
 * Aplicación principal Spring Boot que consolida toda la funcionalidad
 * del proyecto Python en una aplicación web Java completa.
 * 
 * Esta aplicación incluye:
 * - Todos los patrones de diseño implementados
 * - Interfaz web moderna con Thymeleaf
 * - API REST completa
 * - Base de datos H2 en memoria
 * - Funcionalidades de registro, búsqueda y clonación
 */
@SpringBootApplication
public class VeterinaryPatternsApplication implements CommandLineRunner {
    
    @Autowired
    private VeterinaryService veterinaryService;
    
    @Autowired
    private AnimalFactoryService animalFactoryService;
    
    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println("  SISTEMA VETERINARIO - PATRONES JAVA");
        System.out.println("========================================");
        System.out.println("Iniciando aplicación Spring Boot...");
        System.out.println();
        
        SpringApplication.run(VeterinaryPatternsApplication.class, args);
        
        System.out.println();
        System.out.println("✓ Aplicación iniciada correctamente");
        System.out.println("✓ Disponible en: http://localhost:8080");
        System.out.println("✓ Consola H2: http://localhost:8080/h2-console");
        System.out.println("========================================");
    }
    
    @Override
    public void run(String... args) throws Exception {
        // Inicializar datos de ejemplo si no existen
        initializeSampleData();
        
        // Mostrar información del sistema
        showSystemInfo();
        
        // Demostrar patrones si se solicita
        if (args.length > 0 && args[0].equals("--demo")) {
            demonstratePatterns();
        }
    }
    
    /**
     * Inicializa datos de ejemplo para demostrar el sistema
     */
    private void initializeSampleData() {
        List<com.veterinary.patterns.model.Pet> existingPets = veterinaryService.getAllPets();
        
        if (existingPets.isEmpty()) {
            System.out.println("Inicializando datos de ejemplo...");
            
            // Crear mascotas de ejemplo usando diferentes patrones
            try {
                // Usando Factory Method y Builder
                PetBuilder builder = new PetBuilder();
                
                // Perro doméstico
                Pet dog = builder
                    .setName("Max")
                    .setAge(3)
                    .setBreed("Labrador Retriever")
                    .setAnimalType("dog")
                    .setFamilyType("domestic")
                    .setOwnerName("Juan Pérez")
                    .setOwnerPhone("3001234567")
                    .setOwnerEmail("juan@email.com")
                    .setStatus("Activo")
                    .setVaccinationStatus("Al día")
                    .addAllergy("Polen")
                    .build();
                
                veterinaryService.registerPet(dog.getName(), dog.getAge(), dog.getBreed(), 
                    dog.getAnimalType(), dog.getFamilyType(), dog.getOwnerName());
                
                // Gato exótico
                Pet cat = builder.reset()
                    .setName("Luna")
                    .setAge(2)
                    .setBreed("Persian")
                    .setAnimalType("cat")
                    .setFamilyType("exotic")
                    .setOwnerName("María García")
                    .setOwnerPhone("3007654321")
                    .setOwnerEmail("maria@email.com")
                    .setStatus("Activo")
                    .setVaccinationStatus("Pendiente")
                    .addChronicCondition("Asma")
                    .build();
                
                veterinaryService.registerPet(cat.getName(), cat.getAge(), cat.getBreed(), 
                    cat.getAnimalType(), cat.getFamilyType(), cat.getOwnerName());
                
                // Ave doméstica
                Pet bird = builder.reset()
                    .setName("Paco")
                    .setAge(1)
                    .setBreed("Budgerigar")
                    .setAnimalType("bird")
                    .setFamilyType("domestic")
                    .setOwnerName("Carlos López")
                    .setOwnerPhone("3009876543")
                    .setOwnerEmail("carlos@email.com")
                    .setStatus("Activo")
                    .setVaccinationStatus("Al día")
                    .build();
                
                veterinaryService.registerPet(bird.getName(), bird.getAge(), bird.getBreed(), 
                    bird.getAnimalType(), bird.getFamilyType(), bird.getOwnerName());
                
                // Reptil exótico
                Pet reptile = builder.reset()
                    .setName("Spike")
                    .setAge(4)
                    .setBreed("Bearded Dragon")
                    .setAnimalType("reptile")
                    .setFamilyType("exotic")
                    .setOwnerName("Ana Martín")
                    .setOwnerPhone("3004567890")
                    .setOwnerEmail("ana@email.com")
                    .setStatus("Activo")
                    .setVaccinationStatus("Pendiente")
                    .addAllergy("Ciertos sustratos")
                    .build();
                
                veterinaryService.registerPet(reptile.getName(), reptile.getAge(), reptile.getBreed(), 
                    reptile.getAnimalType(), reptile.getFamilyType(), reptile.getOwnerName());
                
                System.out.println("✓ Datos de ejemplo creados exitosamente");
                
            } catch (Exception e) {
                System.out.println("✗ Error al crear datos de ejemplo: " + e.getMessage());
            }
        }
    }
    
    /**
     * Muestra información del sistema
     */
    private void showSystemInfo() {
        Map<String, Object> systemInfo = veterinaryService.getSystemInfo();
        
        System.out.println("INFORMACIÓN DEL SISTEMA:");
        System.out.println("-".repeat(30));
        System.out.println("Sistema: " + systemInfo.get("systemName"));
        System.out.println("Versión: " + systemInfo.get("version"));
        System.out.println("Total mascotas: " + systemInfo.get("totalPets"));
        System.out.println("Clínica: " + systemInfo.get("clinicName"));
        System.out.println("Dirección: " + systemInfo.get("clinicAddress"));
        System.out.println("Teléfono: " + systemInfo.get("clinicPhone"));
        System.out.println();
    }
    
    /**
     * Demuestra todos los patrones implementados
     */
    private void demonstratePatterns() {
        System.out.println("DEMOSTRACIÓN DE PATRONES:");
        System.out.println("-".repeat(30));
        
        // Singleton
        System.out.println("1. Singleton: " + (veterinaryService == VeterinaryService.getInstance()));
        
        // Factory Method
        List<String> dogBreeds = animalFactoryService.getBreedsForAnimalType("dog");
        System.out.println("2. Factory Method: " + dogBreeds.size() + " razas de perros disponibles");
        
        // Abstract Factory
        List<String> domesticChars = animalFactoryService.getFamilyCharacteristics("domestic");
        System.out.println("3. Abstract Factory: " + domesticChars.size() + " características domésticas");
        
        // Builder
        try {
            PetBuilder builder = new PetBuilder();
            Pet testPet = builder
                .setName("Test")
                .setAge(1)
                .setBreed("Test Breed")
                .setAnimalType("dog")
                .setFamilyType("domestic")
                .setOwnerName("Test Owner")
                .build();
            System.out.println("4. Builder: Registro creado exitosamente - " + testPet.getName());
        } catch (Exception e) {
            System.out.println("4. Builder: Error - " + e.getMessage());
        }
        
        // Prototype
        List<Pet> pets = veterinaryService.getAllPets();
        if (!pets.isEmpty()) {
            try {
                Pet cloned = veterinaryService.clonePet(pets.get(0).getId(), "Cloned Pet");
                System.out.println("5. Prototype: Mascota clonada exitosamente - " + cloned.getName());
            } catch (Exception e) {
                System.out.println("5. Prototype: Error - " + e.getMessage());
            }
        } else {
            System.out.println("5. Prototype: No hay mascotas para clonar");
        }
        
        System.out.println();
    }
}