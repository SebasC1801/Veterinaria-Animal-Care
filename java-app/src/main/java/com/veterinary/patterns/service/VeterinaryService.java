package com.veterinary.patterns.service;

import com.veterinary.patterns.model.Pet;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class VeterinaryService {
    // Singleton Pattern Implementation
    private static VeterinaryService instance;
    private final Map<Long, Pet> pets = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);
    private final String systemName = "Veterinary Management System";
    private final String version = "1.0.0";

    private VeterinaryService() {}

    public static synchronized VeterinaryService getInstance() {
        if (instance == null) {
            instance = new VeterinaryService();
        }
        return instance;
    }

    // Pet Management Methods
    public Pet registerPet(String name, Integer age, String breed, String animalType, String familyType, String ownerName) {
        Pet pet = new Pet(name, age, breed, animalType, familyType, ownerName);
        pet.setId(idGenerator.getAndIncrement());
        pets.put(pet.getId(), pet);
        return pet;
    }

    public List<Pet> getAllPets() {
        return new ArrayList<>(pets.values());
    }

    public Pet getPetById(Long id) {
        return pets.get(id);
    }

    public Pet updatePet(Long id, Pet updatedPet) {
        Pet existingPet = pets.get(id);
        if (existingPet != null) {
            updatedPet.setId(id);
            updatedPet.setUpdatedAt(LocalDateTime.now());
            pets.put(id, updatedPet);
            return updatedPet;
        }
        return null;
    }

    public boolean deletePet(Long id) {
        return pets.remove(id) != null;
    }

    // Prototype Pattern Implementation
    public Pet clonePet(Long originalId, String newName) {
        Pet original = pets.get(originalId);
        if (original == null) {
            throw new IllegalArgumentException("Pet not found with id: " + originalId);
        }

        Pet clone = new Pet();
        clone.setId(idGenerator.getAndIncrement());
        clone.setName(newName);
        clone.setAge(original.getAge());
        clone.setBreed(original.getBreed());
        clone.setAnimalType(original.getAnimalType());
        clone.setFamilyType(original.getFamilyType());
        clone.setOwnerName(original.getOwnerName());
        clone.setOwnerPhone(original.getOwnerPhone());
        clone.setOwnerEmail(original.getOwnerEmail());
        clone.setEmergencyContact(original.getEmergencyContact());
        clone.setStatus("Activo");
        clone.setAllergies(new ArrayList<>(original.getAllergies()));
        clone.setChronicConditions(new ArrayList<>(original.getChronicConditions()));
        clone.setVaccinationStatus("Pendiente");
        clone.setCreatedAt(LocalDateTime.now());
        clone.setUpdatedAt(LocalDateTime.now());

        pets.put(clone.getId(), clone);
        return clone;
    }

    // System Information
    public Map<String, Object> getSystemInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("systemName", systemName);
        info.put("version", version);
        info.put("totalPets", pets.size());
        info.put("lastUpdated", LocalDateTime.now());
        
        // Additional properties for the template
        info.put("totalVeterinarians", 3); // Mock data
        info.put("totalAppointments", 12); // Mock data
        info.put("clinicName", "Veterinaria Patrones");
        info.put("clinicAddress", "Calle de los Patrones 123");
        info.put("clinicPhone", "+57 300 123 4567");
        
        // System configuration
        Map<String, Object> systemConfig = new HashMap<>();
        systemConfig.put("currency", "COP");
        systemConfig.put("language", "es");
        systemConfig.put("timezone", "America/Bogota");
        systemConfig.put("maxAppointmentsPerDay", 20);
        info.put("systemConfig", systemConfig);
        
        return info;
    }

    public int getTotalPets() {
        return pets.size();
    }

    public List<Pet> searchPets(String query) {
        List<Pet> results = new ArrayList<>();
        String lowerQuery = query.toLowerCase();
        
        for (Pet pet : pets.values()) {
            if (pet.getName().toLowerCase().contains(lowerQuery) ||
                pet.getBreed().toLowerCase().contains(lowerQuery) ||
                pet.getAnimalType().toLowerCase().contains(lowerQuery) ||
                pet.getOwnerName().toLowerCase().contains(lowerQuery)) {
                results.add(pet);
            }
        }
        
        return results;
    }
}
