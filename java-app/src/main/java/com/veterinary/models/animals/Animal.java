package com.veterinary.models.animals;

import java.util.List;
import java.util.Map;

/**
 * Clase abstracta que representa un animal en el sistema veterinario.
 */
public abstract class Animal {
    protected String name;
    protected int age;
    protected String breed;
    protected String ownerName;

    /**
     * Constructor para la clase Animal
     * 
     * @param name Nombre del animal
     * @param age Edad del animal
     * @param breed Raza del animal
     * @param ownerName Nombre del dueño
     */
    public Animal(String name, int age, String breed, String ownerName) {
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.ownerName = ownerName;
    }

    /**
     * Obtiene instrucciones específicas de cuidado para este tipo de animal
     * 
     * @return Lista de instrucciones de cuidado
     */
    public abstract List<String> getSpecificCareInstructions();

    /**
     * Obtiene enfermedades comunes para este tipo de animal
     * 
     * @return Lista de enfermedades comunes
     */
    public abstract List<String> getCommonDiseases();

    /**
     * Obtiene el horario de alimentación recomendado
     * 
     * @return Mapa con información del horario de alimentación
     */
    public abstract Map<String, String> getFeedingSchedule();

    // Getters y setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + " [name=" + name + ", age=" + age + ", breed=" + breed + ", ownerName=" + ownerName + "]";
    }
}