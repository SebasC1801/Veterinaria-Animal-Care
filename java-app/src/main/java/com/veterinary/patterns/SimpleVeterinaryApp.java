package com.veterinary.patterns;

import com.veterinary.patterns.model.Pet;
import com.veterinary.patterns.service.VeterinaryService;
import com.veterinary.patterns.service.AnimalFactoryService;
import com.veterinary.patterns.builder.PetBuilder;

import java.util.List;
import java.util.Map;

public class SimpleVeterinaryApp {
    
    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println("  Veterinary Management System");
        System.out.println("========================================");
        System.out.println();
        
        // Test Singleton Pattern
        System.out.println("1. Testing Singleton Pattern...");
        VeterinaryService service1 = VeterinaryService.getInstance();
        VeterinaryService service2 = VeterinaryService.getInstance();
        System.out.println("✓ Singleton working: " + (service1 == service2));
        System.out.println();
        
        // Test Factory Method Pattern
        System.out.println("2. Testing Factory Method Pattern...");
        AnimalFactoryService factory = new AnimalFactoryService();
        List<String> dogBreeds = factory.getBreedsForAnimalType("dog");
        System.out.println("✓ Dog breeds available: " + dogBreeds.size());
        System.out.println("  Sample breeds: " + dogBreeds.subList(0, Math.min(3, dogBreeds.size())));
        System.out.println();
        
        // Test Abstract Factory Pattern
        System.out.println("3. Testing Abstract Factory Pattern...");
        List<String> domesticChars = factory.getFamilyCharacteristics("domestic");
        System.out.println("✓ Domestic characteristics: " + domesticChars.size());
        System.out.println("  Sample: " + domesticChars.subList(0, Math.min(2, domesticChars.size())));
        System.out.println();
        
        // Test Builder Pattern
        System.out.println("4. Testing Builder Pattern...");
        PetBuilder builder = new PetBuilder();
        Pet pet = builder.createBasicPet("Max", 3, "Labrador", "dog", "domestic", "Juan Pérez")
                        .setOwnerPhone("+57 300 123 4567")
                        .setOwnerEmail("juan@email.com")
                        .build();
        System.out.println("✓ Pet created with Builder: " + pet.getName());
        System.out.println("  Owner: " + pet.getOwnerName());
        System.out.println();
        
        // Test Singleton Service
        System.out.println("5. Testing Singleton Service...");
        Pet registeredPet = service1.registerPet("Luna", 2, "Persa", "cat", "domestic", "María García");
        System.out.println("✓ Pet registered: " + registeredPet.getName() + " (ID: " + registeredPet.getId() + ")");
        System.out.println();
        
        // Test Prototype Pattern
        System.out.println("6. Testing Prototype Pattern...");
        Pet clonedPet = service1.clonePet(registeredPet.getId(), "Luna Jr");
        System.out.println("✓ Pet cloned: " + clonedPet.getName() + " (ID: " + clonedPet.getId() + ")");
        System.out.println();
        
        // Show all pets
        System.out.println("7. All registered pets:");
        List<Pet> allPets = service1.getAllPets();
        for (Pet p : allPets) {
            System.out.println("  - " + p.getName() + " (" + p.getAnimalType() + ", " + p.getBreed() + ") - Owner: " + p.getOwnerName());
        }
        System.out.println();
        
        // Show system info
        System.out.println("8. System Information:");
        Map<String, Object> systemInfo = service1.getSystemInfo();
        System.out.println("  - System: " + systemInfo.get("systemName"));
        System.out.println("  - Version: " + systemInfo.get("version"));
        System.out.println("  - Total Pets: " + systemInfo.get("totalPets"));
        System.out.println();
        
        System.out.println("========================================");
        System.out.println("  All Design Patterns Working! ✓");
        System.out.println("========================================");
        System.out.println();
        System.out.println("Patterns implemented:");
        System.out.println("✓ Singleton - VeterinaryService");
        System.out.println("✓ Builder - PetBuilder");
        System.out.println("✓ Factory Method - AnimalFactoryService");
        System.out.println("✓ Abstract Factory - Family Characteristics");
        System.out.println("✓ Prototype - Pet cloning");
        System.out.println();
        System.out.println("Application completed successfully!");
    }
}
