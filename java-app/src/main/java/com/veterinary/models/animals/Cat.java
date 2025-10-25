package com.veterinary.models.animals;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;

/**
 * Clase que representa un gato en el sistema veterinario.
 */
public class Cat extends Animal {
    
    /**
     * Constructor para la clase Cat
     * 
     * @param name Nombre del gato
     * @param age Edad del gato
     * @param breed Raza del gato
     * @param ownerName Nombre del dueño
     */
    public Cat(String name, int age, String breed, String ownerName) {
        super(name, age, breed, ownerName);
    }

    @Override
    public List<String> getSpecificCareInstructions() {
        return Arrays.asList(
            "Limpiar la caja de arena diariamente",
            "Cepillar regularmente para evitar bolas de pelo",
            "Proporcionar rascadores para mantener uñas saludables",
            "Jugar diariamente para estimulación mental",
            "Revisión dental periódica"
        );
    }

    @Override
    public List<String> getCommonDiseases() {
        return Arrays.asList(
            "Enfermedad renal crónica",
            "Hipertiroidismo",
            "Enfermedad periodontal",
            "Infecciones del tracto urinario",
            "Diabetes mellitus"
        );
    }

    @Override
    public Map<String, String> getFeedingSchedule() {
        Map<String, String> schedule = new HashMap<>();
        schedule.put("frequency", "2-3 veces al día");
        schedule.put("amount", "Según peso y actividad");
        schedule.put("type", "Alimento balanceado para gatos");
        schedule.put("special_notes", "Mantener agua fresca disponible siempre");
        return schedule;
    }
}