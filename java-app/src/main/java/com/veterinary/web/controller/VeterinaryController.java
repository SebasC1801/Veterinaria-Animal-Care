package com.veterinary.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.veterinary.models.animals.*;
import com.veterinary.models.pet.*;
import com.veterinary.models.medical.*;
import com.veterinary.services.clinic.VeterinarySystem;

import java.util.*;

/**
 * Controlador principal para la aplicación web del sistema veterinario.
 */
@Controller
public class VeterinaryController {
    
    private final VeterinarySystem system = VeterinarySystem.getInstance();
    
    /**
     * Página de inicio.
     */
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("systemInfo", system.getSystemInfo());
        model.addAttribute("petCount", system.getAllPetRecords().size());
        model.addAttribute("vetCount", system.getVeterinarians().size());
        return "index";
    }
    
    /**
     * Página de mascotas.
     */
    @GetMapping("/pets")
    public String pets(Model model) {
        model.addAttribute("pets", system.getAllPetRecords());
        return "pets";
    }
    
    /**
     * Formulario para agregar mascota.
     */
    @GetMapping("/pets/add")
    public String addPetForm(Model model) {
        model.addAttribute("animalTypes", new String[]{"perro", "gato", "ave", "reptil"});
        model.addAttribute("familyTypes", new String[]{"domestic", "exotic"});
        return "add-pet";
    }
    
    /**
     * Procesar el formulario de agregar mascota.
     */
    @PostMapping("/pets/add")
    public String addPet(
            @RequestParam String familyType,
            @RequestParam String animalType,
            @RequestParam String name,
            @RequestParam int age,
            @RequestParam String breed,
            @RequestParam String ownerName,
            @RequestParam String ownerPhone,
            @RequestParam String ownerEmail,
            @RequestParam String ownerAddress) {
        
        try {
            PetRecordBuilder builder = new PetRecordBuilder();
            PetRecord record = builder
                .setAnimalWithFamily(familyType, animalType, name, age, breed, ownerName)
                .setOwnerInfo(ownerName, ownerPhone, ownerEmail, ownerAddress, ownerPhone)
                .build();
            
            system.registerPet(record);
            return "redirect:/pets";
        } catch (Exception e) {
            return "redirect:/error?message=" + e.getMessage();
        }
    }
    
    /**
     * Página de citas.
     */
    @GetMapping("/appointments")
    public String appointments(Model model) {
        model.addAttribute("appointments", system.getAppointments());
        model.addAttribute("vets", system.getVeterinarians());
        return "appointments";
    }
    
    /**
     * Formulario para agregar cita.
     */
    @GetMapping("/appointments/add")
    public String addAppointmentForm(Model model) {
        model.addAttribute("pets", system.getAllPetRecords());
        model.addAttribute("vets", system.getVeterinarians());
        return "add-appointment";
    }
    
    /**
     * Página de demostración de patrones.
     */
    @GetMapping("/patterns")
    public String patterns() {
        return "patterns";
    }
    
    /**
     * API para demostrar el patrón Singleton.
     */
    @GetMapping("/api/patterns/singleton")
    @ResponseBody
    public Map<String, Object> demonstrateSingleton() {
        Map<String, Object> result = new HashMap<>();
        VeterinarySystem system1 = VeterinarySystem.getInstance();
        VeterinarySystem system2 = VeterinarySystem.getInstance();
        
        result.put("system1", system1.toString());
        result.put("system2", system2.toString());
        result.put("sameInstance", system1 == system2);
        result.put("clinicName", system1.getSystemInfo().get("clinic_name"));
        
        return result;
    }
    
    /**
     * API para demostrar el patrón Factory Method.
     */
    @GetMapping("/api/patterns/factory")
    @ResponseBody
    public Map<String, Object> demonstrateFactory() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Animal dog = AnimalFactory.createAnimal("perro", "Max", 3, "Labrador", "Juan Pérez");
            Animal cat = AnimalFactory.createAnimal("gato", "Luna", 2, "Persa", "María García");
            
            result.put("success", true);
            result.put("dog", dog.toString());
            result.put("cat", cat.toString());
            result.put("dogCare", dog.getSpecificCareInstructions());
            result.put("catDiseases", cat.getCommonDiseases());
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    /**
     * API para demostrar el patrón Abstract Factory.
     */
    @GetMapping("/api/patterns/abstract-factory")
    @ResponseBody
    public Map<String, Object> demonstrateAbstractFactory() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Animal domesticDog = PetFamilyFactoryManager.createPet("domestic", "perro", "Buddy", 4, "Golden Retriever", "Ana Martín");
            Animal exoticBird = PetFamilyFactoryManager.createPet("exotic", "ave", "Kiwi", 2, "Guacamayo", "Roberto Silva");
            
            result.put("success", true);
            result.put("domesticDog", domesticDog.toString());
            result.put("exoticBird", exoticBird.toString());
            result.put("domesticInfo", PetFamilyFactoryManager.getFamilyInfo("domestic"));
            result.put("exoticInfo", PetFamilyFactoryManager.getFamilyInfo("exotic"));
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    /**
     * API para demostrar el patrón Builder.
     */
    @GetMapping("/api/patterns/builder")
    @ResponseBody
    public Map<String, Object> demonstrateBuilder() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            PetRecordBuilder builder = new PetRecordBuilder();
            List<String> allergies = new ArrayList<>();
            allergies.add("Polen");
            
            List<String> diseases = new ArrayList<>();
            diseases.add("Artritis");
            
            PetRecord record = builder
                .setAnimalWithFamily("domestic", "perro", "Rex", 5, "Pastor Alemán", "Laura Torres")
                .setOwnerInfo("Laura Torres", "3001234567", "laura@email.com", "Calle 123", "3007654321")
                .setMedicalInfo(25.5, "Al día", true, allergies, diseases)
                .setAdministrativeInfo(1, "Tarjeta")
                .build();
            
            result.put("success", true);
            result.put("record", record.toString());
            result.put("animal", record.getAnimal().getName() + " (" + record.getAnimal().getBreed() + ")");
            result.put("owner", record.getOwnerName());
            result.put("contact", record.getOwnerPhone());
            result.put("weight", record.getWeight());
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    /**
     * API para demostrar el patrón Prototype.
     */
    @GetMapping("/api/patterns/prototype")
    @ResponseBody
    public Map<String, Object> demonstratePrototype() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Crear prototipo original
            MedicalRecord original = new MedicalRecord("Max", "Infección respiratoria", "Antibióticos", "Dr. Juan Pérez");
            original.addMedication("Amoxicilina 250mg");
            original.addMedication("Antiinflamatorio");
            original.addObservation("Mejora notable después de 3 días");
            
            // Clonar el prototipo
            MedicalRecord clone = original.clone();
            clone.setPetName("Rex");
            clone.addObservation("Seguimiento necesario en 7 días");
            
            result.put("success", true);
            result.put("original", original.toString());
            result.put("originalMedications", original.getMedications());
            result.put("originalObservations", original.getObservations());
            result.put("clone", clone.toString());
            result.put("cloneMedications", clone.getMedications());
            result.put("cloneObservations", clone.getObservations());
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    /**
     * Página de error.
     */
    @GetMapping("/error")
    public String error(@RequestParam(required = false) String message, Model model) {
        model.addAttribute("errorMessage", message);
        return "error";
    }
}