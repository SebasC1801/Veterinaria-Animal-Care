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
    
    // Página de demostración de patrones eliminada
    
    // Endpoints de demostración de patrones eliminados
    
    
    
    
    
    
    
    
    
    /**
     * Página de error.
     */
    @GetMapping("/error")
    public String error(@RequestParam(required = false) String message, Model model) {
        model.addAttribute("errorMessage", message);
        return "error";
    }
}