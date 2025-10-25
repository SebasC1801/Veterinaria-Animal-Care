package com.veterinary.models.animals;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;

/**
 * Clase que representa un reptil en el sistema veterinario.
 */
public class Reptile extends Animal {
    
    /**
     * Constructor para la clase Reptile
     * 
     * @param name Nombre del reptil
     * @param age Edad del reptil
     * @param breed Especie del reptil
     * @param ownerName Nombre del dueño
     */
    public Reptile(String name, int age, String breed, String ownerName) {
        super(name, age, breed, ownerName);
    }

    @Override
    public List<String> getSpecificCareInstructions() {
        return Arrays.asList(
            "Mantener temperatura adecuada según especie",
            "Proporcionar iluminación UVB",
            "Humedad específica según especie",
            "Sustrato adecuado para el terrario",
            "Limpieza regular del hábitat"
        );
    }

    @Override
    public List<String> getCommonDiseases() {
        return Arrays.asList(
            "Enfermedad metabólica ósea",
            "Infecciones respiratorias",
            "Parásitos internos y externos",
            "Problemas de muda",
            "Estomatitis (podredumbre bucal)"
        );
    }

    @Override
    public Map<String, String> getFeedingSchedule() {
        Map<String, String> schedule = new HashMap<>();
        schedule.put("frequency", "Variable según especie");
        schedule.put("amount", "Según tamaño y especie");
        schedule.put("type", "Insectos, vegetales o presas según especie");
        schedule.put("special_notes", "Suplementos de calcio y vitaminas");
        return schedule;
    }
}