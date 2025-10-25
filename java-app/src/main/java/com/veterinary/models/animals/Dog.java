package com.veterinary.models.animals;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;

/**
 * Clase que representa un perro en el sistema veterinario.
 */
public class Dog extends Animal {
    
    /**
     * Constructor para la clase Dog
     * 
     * @param name Nombre del perro
     * @param age Edad del perro
     * @param breed Raza del perro
     * @param ownerName Nombre del dueño
     */
    public Dog(String name, int age, String breed, String ownerName) {
        super(name, age, breed, ownerName);
    }

    @Override
    public List<String> getSpecificCareInstructions() {
        return Arrays.asList(
            "Pasear al menos dos veces al día",
            "Cepillar regularmente para evitar caída de pelo",
            "Mantener las uñas cortas",
            "Revisar y limpiar orejas semanalmente",
            "Baño mensual o según necesidad"
        );
    }

    @Override
    public List<String> getCommonDiseases() {
        return Arrays.asList(
            "Displasia de cadera",
            "Enfermedad periodontal",
            "Otitis",
            "Alergias cutáneas",
            "Parvovirus"
        );
    }

    @Override
    public Map<String, String> getFeedingSchedule() {
        Map<String, String> schedule = new HashMap<>();
        schedule.put("frequency", "2-3 veces al día");
        schedule.put("amount", "Según peso y actividad");
        schedule.put("type", "Alimento balanceado para perros");
        schedule.put("special_notes", "Mantener agua fresca disponible siempre");
        return schedule;
    }
}