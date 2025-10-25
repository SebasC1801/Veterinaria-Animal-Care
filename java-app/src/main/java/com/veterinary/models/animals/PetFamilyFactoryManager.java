package com.veterinary.models.animals;

import java.util.HashMap;
import java.util.Map;

/**
 * Gestor de fábricas de familias de mascotas.
 * Implementa el patrón Abstract Factory.
 */
public class PetFamilyFactoryManager {
    
    private static final Map<String, PetFamily> factories = new HashMap<>();
    
    static {
        factories.put("domestic", new DomesticPetFamily());
        factories.put("exotic", new ExoticPetFamily());
    }
    
    /**
     * Crea una mascota de una familia y tipo específicos.
     * 
     * @param familyType Tipo de familia ("domestic", "exotic")
     * @param animalType Tipo de animal ("perro", "gato", "ave", "reptil")
     * @param name Nombre del animal
     * @param age Edad del animal
     * @param breed Raza o especie del animal
     * @param ownerName Nombre del dueño
     * @return Instancia del animal creado
     * @throws IllegalArgumentException si el tipo de familia no es válido
     */
    public static Animal createPet(String familyType, String animalType, String name, int age, String breed, String ownerName) {
        PetFamily factory = factories.get(familyType.toLowerCase());
        if (factory == null) {
            throw new IllegalArgumentException("Tipo de familia no soportado: " + familyType);
        }
        return factory.createAnimal(animalType, name, age, breed, ownerName);
    }
    
    /**
     * Obtiene información sobre una familia específica.
     * 
     * @param familyType Tipo de familia ("domestic", "exotic")
     * @return Mapa con información de la familia
     * @throws IllegalArgumentException si el tipo de familia no es válido
     */
    public static Map<String, String> getFamilyInfo(String familyType) {
        PetFamily factory = factories.get(familyType.toLowerCase());
        if (factory == null) {
            throw new IllegalArgumentException("Tipo de familia no soportado: " + familyType);
        }
        
        Map<String, String> info = new HashMap<>();
        info.put("family_name", factory.getFamilyName());
        info.put("special_care", factory.getSpecialCareRequirements());
        return info;
    }
}