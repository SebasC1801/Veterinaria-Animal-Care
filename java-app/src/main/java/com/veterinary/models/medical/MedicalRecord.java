package com.veterinary.models.medical;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Clase que representa un registro médico y que implementa el patrón Prototype.
 */
public class MedicalRecord implements Prototype<MedicalRecord> {
    private String petName;
    private String diagnosis;
    private String treatment;
    private Date date;
    private String veterinarianName;
    private List<String> medications;
    private List<String> observations;
    
    /**
     * Constructor por defecto.
     */
    public MedicalRecord() {
        this.medications = new ArrayList<>();
        this.observations = new ArrayList<>();
        this.date = new Date();
    }
    
    /**
     * Constructor con parámetros.
     * 
     * @param petName Nombre de la mascota
     * @param diagnosis Diagnóstico
     * @param treatment Tratamiento
     * @param veterinarianName Nombre del veterinario
     */
    public MedicalRecord(String petName, String diagnosis, String treatment, String veterinarianName) {
        this();
        this.petName = petName;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.veterinarianName = veterinarianName;
    }
    
    /**
     * Añade un medicamento al registro.
     * 
     * @param medication Medicamento a añadir
     */
    public void addMedication(String medication) {
        this.medications.add(medication);
    }
    
    /**
     * Añade una observación al registro.
     * 
     * @param observation Observación a añadir
     */
    public void addObservation(String observation) {
        this.observations.add(observation);
    }
    
    @Override
    public MedicalRecord clone() {
        MedicalRecord clone = new MedicalRecord();
        clone.petName = this.petName;
        clone.diagnosis = this.diagnosis;
        clone.treatment = this.treatment;
        clone.date = new Date();
        clone.veterinarianName = this.veterinarianName;
        clone.medications = new ArrayList<>(this.medications);
        clone.observations = new ArrayList<>(this.observations);
        return clone;
    }
    
    // Getters y setters
    public String getPetName() {
        return petName;
    }
    
    public void setPetName(String petName) {
        this.petName = petName;
    }
    
    public String getDiagnosis() {
        return diagnosis;
    }
    
    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }
    
    public String getTreatment() {
        return treatment;
    }
    
    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }
    
    public Date getDate() {
        return date;
    }
    
    public void setDate(Date date) {
        this.date = date;
    }
    
    public String getVeterinarianName() {
        return veterinarianName;
    }
    
    public void setVeterinarianName(String veterinarianName) {
        this.veterinarianName = veterinarianName;
    }
    
    public List<String> getMedications() {
        return medications;
    }
    
    public void setMedications(List<String> medications) {
        this.medications = medications;
    }
    
    public List<String> getObservations() {
        return observations;
    }
    
    public void setObservations(List<String> observations) {
        this.observations = observations;
    }
    
    @Override
    public String toString() {
        return "MedicalRecord [petName=" + petName + ", diagnosis=" + diagnosis + 
               ", treatment=" + treatment + ", date=" + date + 
               ", veterinarianName=" + veterinarianName + "]";
    }
}