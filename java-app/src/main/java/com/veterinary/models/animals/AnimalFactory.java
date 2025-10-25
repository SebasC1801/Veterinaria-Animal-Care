package com.veterinary.models.animals;

/**
 * Factory Method para la creación de diferentes tipos de animales.
 */
public class AnimalFactory {
    
    /**
     * Crea un animal según el tipo especificado.
     * 
     * @param type Tipo de animal ("perro", "gato", "ave", "reptil")
     * @param name Nombre del animal
     * @param age Edad del animal
     * @param breed Raza o especie del animal
     * @param ownerName Nombre del dueño
     * @return Instancia del animal creado
     * @throws IllegalArgumentException si el tipo de animal no es válido
     */
    public static Animal createAnimal(String type, String name, int age, String breed, String ownerName) {
        switch (type.toLowerCase()) {
            case "perro":
                return new Dog(name, age, breed, ownerName);
            case "gato":
                return new Cat(name, age, breed, ownerName);
            case "ave":
                return new Bird(name, age, breed, ownerName);
            case "reptil":
                return new Reptile(name, age, breed, ownerName);
            default:
                throw new IllegalArgumentException("Tipo de animal no soportado: " + type);
        }
    }
}