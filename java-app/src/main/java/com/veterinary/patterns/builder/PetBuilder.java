package com.veterinary.patterns.builder;

import com.veterinary.patterns.model.Pet;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PetBuilder {
    // Builder Pattern Implementation
    private Pet pet;

    public PetBuilder() {
        this.pet = new Pet();
    }

    // Basic Information
    public PetBuilder setName(String name) {
        pet.setName(name);
        return this;
    }

    public PetBuilder setAge(Integer age) {
        pet.setAge(age);
        return this;
    }

    public PetBuilder setBreed(String breed) {
        pet.setBreed(breed);
        return this;
    }

    public PetBuilder setAnimalType(String animalType) {
        pet.setAnimalType(animalType);
        return this;
    }

    public PetBuilder setFamilyType(String familyType) {
        pet.setFamilyType(familyType);
        return this;
    }

    // Owner Information
    public PetBuilder setOwnerName(String ownerName) {
        pet.setOwnerName(ownerName);
        return this;
    }

    public PetBuilder setOwnerPhone(String ownerPhone) {
        pet.setOwnerPhone(ownerPhone);
        return this;
    }

    public PetBuilder setOwnerEmail(String ownerEmail) {
        pet.setOwnerEmail(ownerEmail);
        return this;
    }

    public PetBuilder setEmergencyContact(String emergencyContact) {
        pet.setEmergencyContact(emergencyContact);
        return this;
    }

    // Medical Information
    public PetBuilder setStatus(String status) {
        pet.setStatus(status);
        return this;
    }

    public PetBuilder addAllergy(String allergy) {
        if (pet.getAllergies() == null) {
            pet.setAllergies(new ArrayList<>());
        }
        pet.getAllergies().add(allergy);
        return this;
    }

    public PetBuilder setAllergies(List<String> allergies) {
        pet.setAllergies(allergies != null ? new ArrayList<>(allergies) : new ArrayList<>());
        return this;
    }

    public PetBuilder addChronicCondition(String condition) {
        if (pet.getChronicConditions() == null) {
            pet.setChronicConditions(new ArrayList<>());
        }
        pet.getChronicConditions().add(condition);
        return this;
    }

    public PetBuilder setChronicConditions(List<String> conditions) {
        pet.setChronicConditions(conditions != null ? new ArrayList<>(conditions) : new ArrayList<>());
        return this;
    }

    public PetBuilder setVaccinationStatus(String vaccinationStatus) {
        pet.setVaccinationStatus(vaccinationStatus);
        return this;
    }

    // Administrative Information
    public PetBuilder setId(Long id) {
        pet.setId(id);
        return this;
    }

    public PetBuilder setCreatedAt(LocalDateTime createdAt) {
        pet.setCreatedAt(createdAt);
        return this;
    }

    public PetBuilder setUpdatedAt(LocalDateTime updatedAt) {
        pet.setUpdatedAt(updatedAt);
        return this;
    }

    // Convenience methods for common scenarios
    public PetBuilder createBasicPet(String name, Integer age, String breed, String animalType, String familyType, String ownerName) {
        return setName(name)
                .setAge(age)
                .setBreed(breed)
                .setAnimalType(animalType)
                .setFamilyType(familyType)
                .setOwnerName(ownerName)
                .setStatus("Activo")
                .setVaccinationStatus("Pendiente");
    }

    public PetBuilder createCompletePet(String name, Integer age, String breed, String animalType, String familyType,
                                       String ownerName, String ownerPhone, String ownerEmail, String emergencyContact) {
        return createBasicPet(name, age, breed, animalType, familyType, ownerName)
                .setOwnerPhone(ownerPhone)
                .setOwnerEmail(ownerEmail)
                .setEmergencyContact(emergencyContact);
    }

    // Build method
    public Pet build() {
        // Set default timestamps if not already set
        if (pet.getCreatedAt() == null) {
            pet.setCreatedAt(LocalDateTime.now());
        }
        if (pet.getUpdatedAt() == null) {
            pet.setUpdatedAt(LocalDateTime.now());
        }

        // Validate required fields
        validatePet();

        return pet;
    }

    private void validatePet() {
        if (pet.getName() == null || pet.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Pet name is required");
        }
        if (pet.getAge() == null || pet.getAge() < 0) {
            throw new IllegalArgumentException("Valid pet age is required");
        }
        if (pet.getBreed() == null || pet.getBreed().trim().isEmpty()) {
            throw new IllegalArgumentException("Pet breed is required");
        }
        if (pet.getAnimalType() == null || pet.getAnimalType().trim().isEmpty()) {
            throw new IllegalArgumentException("Animal type is required");
        }
        if (pet.getFamilyType() == null || pet.getFamilyType().trim().isEmpty()) {
            throw new IllegalArgumentException("Family type is required");
        }
        if (pet.getOwnerName() == null || pet.getOwnerName().trim().isEmpty()) {
            throw new IllegalArgumentException("Owner name is required");
        }
    }

    // Reset builder for reuse
    public PetBuilder reset() {
        this.pet = new Pet();
        return this;
    }
}
