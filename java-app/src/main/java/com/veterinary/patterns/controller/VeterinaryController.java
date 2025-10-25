package com.veterinary.patterns.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.veterinary.patterns.model.Pet;
import com.veterinary.patterns.service.AnimalFactoryService;
import com.veterinary.patterns.service.VeterinaryService;

@Controller
public class VeterinaryController {
    
    private final VeterinaryService veterinaryService;
    private final AnimalFactoryService animalFactoryService;

    public VeterinaryController(VeterinaryService veterinaryService, AnimalFactoryService animalFactoryService) {
        this.veterinaryService = veterinaryService;
        this.animalFactoryService = animalFactoryService;
    }

    @GetMapping("/")
    public String index(Model model) {
        Map<String, Object> systemInfo = veterinaryService.getSystemInfo();
        model.addAttribute("systemInfo", systemInfo);
        return "index";
    }

    @GetMapping("/registro")
    public String registro(Model model) {
        Map<String, Object> options = new java.util.HashMap<>();
        options.put("animalTypes", animalFactoryService.getAnimalTypes());
        options.put("familyTypes", animalFactoryService.getFamilyTypes());
        model.addAttribute("options", options);
        return "registro";
    }

    @GetMapping("/registro-simple")
    public String registroSimple(Model model) {
        return "registro-simple";
    }

    @PostMapping("/registro")
    public String registrarPet(@RequestParam String name,
                               @RequestParam Integer age,
                               @RequestParam String breed,
                               @RequestParam String animalType,
                               @RequestParam String familyType,
                               @RequestParam String ownerName,
                               @RequestParam(required = false) String ownerPhone,
                               @RequestParam(required = false) String ownerEmail,
                               @RequestParam(required = false) String emergencyContact,
                               Model model) {
        try {
            // Validate breed
            if (!animalFactoryService.isValidBreed(animalType, breed)) {
                model.addAttribute("error", "Raza inválida para el tipo de animal seleccionado");
                Map<String, Object> options = new java.util.HashMap<>();
                options.put("animalTypes", animalFactoryService.getAnimalTypes());
                options.put("familyTypes", animalFactoryService.getFamilyTypes());
                model.addAttribute("options", options);
                return "registro";
            }

            // Register using Singleton service
            Pet registeredPet = veterinaryService.registerPet(name, age, breed, animalType, familyType, ownerName);
            if (ownerPhone != null && !ownerPhone.trim().isEmpty()) {
                registeredPet.setOwnerPhone(ownerPhone);
            }
            if (ownerEmail != null && !ownerEmail.trim().isEmpty()) {
                registeredPet.setOwnerEmail(ownerEmail);
            }
            if (emergencyContact != null && !emergencyContact.trim().isEmpty()) {
                registeredPet.setEmergencyContact(emergencyContact);
            }
            
            model.addAttribute("success", "Mascota registrada exitosamente con ID: " + registeredPet.getId());
        } catch (Exception e) {
            model.addAttribute("error", "Error al registrar la mascota: " + e.getMessage());
        }
        
        Map<String, Object> options = new java.util.HashMap<>();
        options.put("animalTypes", animalFactoryService.getAnimalTypes());
        options.put("familyTypes", animalFactoryService.getFamilyTypes());
        model.addAttribute("options", options);
        return "registro";
    }

    @GetMapping("/registros")
    public String registros(Model model) {
        List<Pet> pets = veterinaryService.getAllPets();
        model.addAttribute("pets", pets);
        return "registros";
    }

    @GetMapping("/prototypes")
    public String prototypes(Model model) {
        List<Pet> pets = veterinaryService.getAllPets();
        model.addAttribute("pets", pets);
        return "prototypes";
    }

    @PostMapping("/clone")
    public String clonePet(@RequestParam Long petId, @RequestParam String newName, Model model) {
        try {
            // Use Prototype Pattern
            Pet clonedPet = veterinaryService.clonePet(petId, newName);
            model.addAttribute("success", "Mascota clonada exitosamente con ID: " + clonedPet.getId());
        } catch (Exception e) {
            model.addAttribute("error", "Error al clonar la mascota: " + e.getMessage());
        }
        
        List<Pet> pets = veterinaryService.getAllPets();
        model.addAttribute("pets", pets);
        return "prototypes";
    }

    @GetMapping("/patrones")
    public String patrones(Model model) {
        return "patrones";
    }

    @GetMapping("/search")
    public String search(@RequestParam String query, Model model) {
        List<Pet> pets = veterinaryService.searchPets(query);
        model.addAttribute("pets", pets);
        model.addAttribute("query", query);
        return "registros";
    }

    // API Endpoints
    @GetMapping("/api/breeds")
    @ResponseBody
    public List<String> getBreeds(@RequestParam String animalType) {
        return animalFactoryService.getBreedsForAnimalType(animalType);
    }

    @GetMapping("/api/animal-info")
    @ResponseBody
    public Map<String, Object> getAnimalInfo(@RequestParam String animalType) {
        return animalFactoryService.getAnimalTypeInfo(animalType);
    }

    @GetMapping("/api/family-characteristics")
    @ResponseBody
    public List<String> getFamilyCharacteristics(@RequestParam String familyType) {
        return animalFactoryService.getFamilyCharacteristics(familyType);
    }

    @GetMapping("/api/pets")
    @ResponseBody
    public List<Pet> getAllPetsApi() {
        return veterinaryService.getAllPets();
    }

    @GetMapping("/api/pet/{id}")
    @ResponseBody
    public Pet getPetApi(@PathVariable Long id) {
        return veterinaryService.getPetById(id);
    }

    @GetMapping("/api/system-info")
    @ResponseBody
    public Map<String, Object> getSystemInfoApi() {
        return veterinaryService.getSystemInfo();
    }
}