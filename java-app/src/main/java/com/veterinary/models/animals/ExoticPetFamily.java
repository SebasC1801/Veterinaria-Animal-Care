package com.veterinary.models.animals;

/**
 * Implementación de la familia de mascotas exóticas.
 */
public class ExoticPetFamily implements PetFamily {

    @Override
    public Animal createAnimal(String type, String name, int age, String breed, String ownerName) {
        Animal animal = AnimalFactory.createAnimal(type, name, age, breed, ownerName);
        
        // Aquí podríamos añadir características específicas de animales exóticos
        // Por ejemplo, mediante composición o decoración
        
        return animal;
    }

    @Override
    public String getFamilyName() {
        return "Mascotas Exóticas";
    }

    @Override
    public String getSpecialCareRequirements() {
        return "Hábitat especializado, dieta específica, control de temperatura, posibles permisos legales";
    }
}