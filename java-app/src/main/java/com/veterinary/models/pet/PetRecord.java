package com.veterinary.models.pet;

import com.veterinary.models.animals.Animal;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * Clase que representa un registro completo de una mascota.
 */
public class PetRecord {
    // Información del animal
    private Animal animal;
    
    // Información del propietario
    private String ownerName;
    private String ownerPhone;
    private String ownerEmail;
    private String ownerAddress;
    private String ownerEmergencyContact;
    
    // Información médica
    private double weight;
    private String vaccinationStatus;
    private boolean sterilized;
    private List<String> allergies;
    private List<String> chronicDiseases;
    
    // Información administrativa
    private int veterinarianId;
    private String paymentMethod;
    private Map<String, Object> additionalInfo;
    
    // Constructor privado para usar con el Builder
    PetRecord() {
        this.additionalInfo = new HashMap<>();
    }
    
    // Getters y setters
    public Animal getAnimal() {
        return animal;
    }
    
    void setAnimal(Animal animal) {
        this.animal = animal;
    }
    
    public String getOwnerName() {
        return ownerName;
    }
    
    void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }
    
    public String getOwnerPhone() {
        return ownerPhone;
    }
    
    void setOwnerPhone(String ownerPhone) {
        this.ownerPhone = ownerPhone;
    }
    
    public String getOwnerEmail() {
        return ownerEmail;
    }
    
    void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }
    
    public String getOwnerAddress() {
        return ownerAddress;
    }
    
    void setOwnerAddress(String ownerAddress) {
        this.ownerAddress = ownerAddress;
    }
    
    public String getOwnerEmergencyContact() {
        return ownerEmergencyContact;
    }
    
    void setOwnerEmergencyContact(String ownerEmergencyContact) {
        this.ownerEmergencyContact = ownerEmergencyContact;
    }
    
    public double getWeight() {
        return weight;
    }
    
    void setWeight(double weight) {
        this.weight = weight;
    }
    
    public String getVaccinationStatus() {
        return vaccinationStatus;
    }
    
    void setVaccinationStatus(String vaccinationStatus) {
        this.vaccinationStatus = vaccinationStatus;
    }
    
    public boolean isSterilized() {
        return sterilized;
    }
    
    void setSterilized(boolean sterilized) {
        this.sterilized = sterilized;
    }
    
    public List<String> getAllergies() {
        return allergies;
    }
    
    void setAllergies(List<String> allergies) {
        this.allergies = allergies;
    }
    
    public List<String> getChronicDiseases() {
        return chronicDiseases;
    }
    
    void setChronicDiseases(List<String> chronicDiseases) {
        this.chronicDiseases = chronicDiseases;
    }
    
    public int getVeterinarianId() {
        return veterinarianId;
    }
    
    void setVeterinarianId(int veterinarianId) {
        this.veterinarianId = veterinarianId;
    }
    
    public String getPaymentMethod() {
        return paymentMethod;
    }
    
    void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    
    public Map<String, Object> getAdditionalInfo() {
        return additionalInfo;
    }
    
    void setAdditionalInfo(Map<String, Object> additionalInfo) {
        this.additionalInfo = additionalInfo;
    }
    
    @Override
    public String toString() {
        return "PetRecord [animal=" + animal + ", ownerName=" + ownerName + ", weight=" + weight + 
               ", vaccinationStatus=" + vaccinationStatus + ", veterinarianId=" + veterinarianId + "]";
    }
}