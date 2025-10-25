package com.veterinary.models.pet;

import com.veterinary.models.animals.Animal;
import com.veterinary.models.animals.PetFamilyFactoryManager;
import java.util.List;
import java.util.Map;

/**
 * Builder para la construcción paso a paso de registros de mascotas.
 */
public class PetRecordBuilder {
    private PetRecord record;
    
    /**
     * Constructor que inicializa un nuevo registro vacío.
     */
    public PetRecordBuilder() {
        this.record = new PetRecord();
    }
    
    /**
     * Establece el animal con su familia correspondiente.
     * 
     * @param familyType Tipo de familia ("domestic", "exotic")
     * @param animalType Tipo de animal ("perro", "gato", "ave", "reptil")
     * @param name Nombre del animal
     * @param age Edad del animal
     * @param breed Raza o especie del animal
     * @param ownerName Nombre del dueño
     * @return El builder para encadenamiento
     */
    public PetRecordBuilder setAnimalWithFamily(String familyType, String animalType, String name, int age, String breed, String ownerName) {
        Animal animal = PetFamilyFactoryManager.createPet(familyType, animalType, name, age, breed, ownerName);
        record.setAnimal(animal);
        record.setOwnerName(ownerName);
        return this;
    }
    
    /**
     * Establece la información del propietario.
     * 
     * @param name Nombre del propietario
     * @param phone Teléfono del propietario
     * @param email Email del propietario
     * @param address Dirección del propietario
     * @param emergencyContact Contacto de emergencia
     * @return El builder para encadenamiento
     */
    public PetRecordBuilder setOwnerInfo(String name, String phone, String email, String address, String emergencyContact) {
        record.setOwnerName(name);
        record.setOwnerPhone(phone);
        record.setOwnerEmail(email);
        record.setOwnerAddress(address);
        record.setOwnerEmergencyContact(emergencyContact);
        return this;
    }
    
    /**
     * Establece la información médica.
     * 
     * @param weight Peso del animal
     * @param vaccinationStatus Estado de vacunación
     * @param sterilized Si está esterilizado
     * @param allergies Lista de alergias
     * @param chronicDiseases Lista de enfermedades crónicas
     * @return El builder para encadenamiento
     */
    public PetRecordBuilder setMedicalInfo(double weight, String vaccinationStatus, boolean sterilized, 
                                          List<String> allergies, List<String> chronicDiseases) {
        record.setWeight(weight);
        record.setVaccinationStatus(vaccinationStatus);
        record.setSterilized(sterilized);
        record.setAllergies(allergies);
        record.setChronicDiseases(chronicDiseases);
        return this;
    }
    
    /**
     * Establece la información administrativa.
     * 
     * @param veterinarianId ID del veterinario asignado
     * @param paymentMethod Método de pago preferido
     * @return El builder para encadenamiento
     */
    public PetRecordBuilder setAdministrativeInfo(int veterinarianId, String paymentMethod) {
        record.setVeterinarianId(veterinarianId);
        record.setPaymentMethod(paymentMethod);
        return this;
    }
    
    /**
     * Añade información adicional al registro.
     * 
     * @param key Clave de la información
     * @param value Valor de la información
     * @return El builder para encadenamiento
     */
    public PetRecordBuilder addAdditionalInfo(String key, Object value) {
        record.getAdditionalInfo().put(key, value);
        return this;
    }
    
    /**
     * Construye y devuelve el registro completo.
     * 
     * @return El registro de mascota construido
     */
    public PetRecord build() {
        return record;
    }
}