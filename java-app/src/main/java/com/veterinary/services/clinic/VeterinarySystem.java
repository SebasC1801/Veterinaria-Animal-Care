package com.veterinary.services.clinic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.veterinary.models.pet.PetRecord;

/**
 * Sistema central de gestión veterinaria.
 * Implementa el patrón Singleton.
 */
public class VeterinarySystem {
    // Instancia única del sistema
    private static VeterinarySystem instance;
    
    // Datos del sistema
    private String clinicName;
    private String address;
    private String phone;
    private String email;
    
    // Colecciones de datos
    private List<PetRecord> petRecords;
    private Map<Integer, String> veterinarians;
    private List<Map<String, Object>> appointments;
    
    /**
     * Constructor privado para evitar instanciación directa.
     */
    private VeterinarySystem() {
        // Inicialización de datos por defecto
        this.clinicName = "Veterinaria AnimalCare";
        this.phone = "+57 323 314 7621";
        this.email = "john.ceballosbel@campusucc.edu.co";
        
        // Inicialización de colecciones
        this.petRecords = new ArrayList<>();
        this.veterinarians = new HashMap<>();
        this.appointments = new ArrayList<>();
        
        // Añadir algunos veterinarios de ejemplo
        this.veterinarians.put(1, "Dr. Juan Pérez");
        this.veterinarians.put(2, "Dra. María García");
        this.veterinarians.put(3, "Dr. Carlos López");
    }
    
    /**
     * Obtiene la instancia única del sistema.
     * 
     * @return Instancia del sistema
     */
    public static synchronized VeterinarySystem getInstance() {
        if (instance == null) {
            instance = new VeterinarySystem();
        }
        return instance;
    }
    
    /**
     * Registra una mascota en el sistema.
     * 
     * @param record Registro de la mascota
     */
    public void registerPet(PetRecord record) {
        petRecords.add(record);
    }
    
    /**
     * Obtiene todos los registros de mascotas.
     * 
     * @return Lista de registros
     */
    public List<PetRecord> getAllPetRecords() {
        return new ArrayList<>(petRecords);
    }
    
    /**
     * Busca registros de mascotas por nombre del dueño.
     * 
     * @param ownerName Nombre del dueño
     * @return Lista de registros encontrados
     */
    public List<PetRecord> findPetsByOwner(String ownerName) {
        List<PetRecord> result = new ArrayList<>();
        for (PetRecord record : petRecords) {
            if (record.getOwnerName().equalsIgnoreCase(ownerName)) {
                result.add(record);
            }
        }
        return result;
    }
    
    /**
     * Programa una cita.
     * 
     * @param petName Nombre de la mascota
     * @param date Fecha de la cita
     * @param veterinarianId ID del veterinario
     * @param reason Motivo de la cita
     * @return ID de la cita
     */
    public int scheduleAppointment(String petName, String date, int veterinarianId, String reason) {
        Map<String, Object> appointment = new HashMap<>();
        appointment.put("id", appointments.size() + 1);
        appointment.put("pet_name", petName);
        appointment.put("date", date);
        appointment.put("veterinarian_id", veterinarianId);
        appointment.put("reason", reason);
        appointment.put("status", "Programada");
        
        appointments.add(appointment);
        return (int) appointment.get("id");
    }
    
    /**
     * Obtiene información del sistema.
     * 
     * @return Mapa con información del sistema
     */
    public Map<String, String> getSystemInfo() {
        Map<String, String> info = new HashMap<>();
        info.put("clinic_name", clinicName);
        info.put("address", address);
        info.put("phone", phone);
        info.put("email", email);
        info.put("pet_count", String.valueOf(petRecords.size()));
        info.put("veterinarian_count", String.valueOf(veterinarians.size()));
        info.put("appointment_count", String.valueOf(appointments.size()));
        return info;
    }
    
    /**
     * Obtiene la lista de veterinarios.
     * 
     * @return Mapa de veterinarios (ID -> Nombre)
     */
    public Map<Integer, String> getVeterinarians() {
        return new HashMap<>(veterinarians);
    }
    
    /**
     * Obtiene la lista de citas.
     * 
     * @return Lista de citas
     */
    public List<Map<String, Object>> getAppointments() {
        return new ArrayList<>(appointments);
    }
    
    // Getters y setters para datos básicos
    public String getClinicName() {
        return clinicName;
    }
    
    public void setClinicName(String clinicName) {
        this.clinicName = clinicName;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
}