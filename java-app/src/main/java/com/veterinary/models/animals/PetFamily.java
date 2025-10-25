package com.veterinary.models.animals;

/**
 * Interfaz para el patrón Abstract Factory que define la familia de mascotas.
 */
public interface PetFamily {
    
    /**
     * Crea un animal de un tipo específico dentro de esta familia.
     * 
     * @param type Tipo de animal ("perro", "gato", "ave", "reptil")
     * @param name Nombre del animal
     * @param age Edad del animal
     * @param breed Raza o especie del animal
     * @param ownerName Nombre del dueño
     * @return Instancia del animal creado
     */
    Animal createAnimal(String type, String name, int age, String breed, String ownerName);
    
    /**
     * Obtiene información sobre esta familia de mascotas.
     * 
     * @return Información de la familia
     */
    String getFamilyName();
    
    /**
     * Obtiene requisitos especiales de cuidado para esta familia.
     * 
     * @return Requisitos especiales
     */
    String getSpecialCareRequirements();
}