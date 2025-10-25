package com.veterinary.models.animals;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;

/**
 * Clase que representa un ave en el sistema veterinario.
 */
public class Bird extends Animal {
    
    /**
     * Constructor para la clase Bird
     * 
     * @param name Nombre del ave
     * @param age Edad del ave
     * @param breed Especie del ave
     * @param ownerName Nombre del dueño
     */
    public Bird(String name, int age, String breed, String ownerName) {
        super(name, age, breed, ownerName);
    }

    @Override
    public List<String> getSpecificCareInstructions() {
        return Arrays.asList(
            "Limpiar la jaula regularmente",
            "Proporcionar juguetes y perchas adecuadas",
            "Permitir tiempo fuera de la jaula diariamente",
            "Mantener en ambiente libre de corrientes de aire",
            "Corte de uñas periódico por profesional"
        );
    }

    @Override
    public List<String> getCommonDiseases() {
        return Arrays.asList(
            "Infecciones respiratorias",
            "Ácaros y parásitos",
            "Deficiencias nutricionales",
            "Problemas de plumaje",
            "Infecciones bacterianas"
        );
    }

    @Override
    public Map<String, String> getFeedingSchedule() {
        Map<String, String> schedule = new HashMap<>();
        schedule.put("frequency", "1-2 veces al día");
        schedule.put("amount", "Según tamaño y especie");
        schedule.put("type", "Semillas, frutas y verduras");
        schedule.put("special_notes", "Agua fresca diaria y suplementos vitamínicos");
        return schedule;
    }
}