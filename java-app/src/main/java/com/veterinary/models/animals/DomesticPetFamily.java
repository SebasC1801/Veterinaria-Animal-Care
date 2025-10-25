package com.veterinary.models.animals;

/**
 * Implementación de la familia de mascotas domésticas.
 */
public class DomesticPetFamily implements PetFamily {

    @Override
    public Animal createAnimal(String type, String name, int age, String breed, String ownerName) {
        Animal animal = AnimalFactory.createAnimal(type, name, age, breed, ownerName);
        
        // Aquí podríamos añadir características específicas de animales domésticos
        // Por ejemplo, mediante composición o decoración
        
        return animal;
    }

    @Override
    public String getFamilyName() {
        return "Mascotas Domésticas";
    }

    @Override
    public String getSpecialCareRequirements() {
        return "Vacunación regular, desparasitación periódica, revisiones veterinarias anuales";
    }
}