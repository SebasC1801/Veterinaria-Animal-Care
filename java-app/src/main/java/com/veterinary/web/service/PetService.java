package com.veterinary.web.service;

import com.veterinary.web.model.Pet;
import com.veterinary.web.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {
    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public Pet create(Pet pet) {
        pet.setCreatedAt(System.currentTimeMillis());
        pet.setUpdatedAt(pet.getCreatedAt());
        return petRepository.save(pet);
    }

    public Pet update(String id, Pet updates) {
        Optional<Pet> found = petRepository.findById(id);
        if (!found.isPresent()) {
            throw new IllegalArgumentException("Mascota no encontrada");
        }
        Pet pet = found.get();
        pet.setName(updates.getName());
        pet.setAge(updates.getAge());
        pet.setBreed(updates.getBreed());
        pet.setType(updates.getType());
        pet.setFamilyType(updates.getFamilyType());
        pet.setOwnerName(updates.getOwnerName());
        pet.setOwnerPhone(updates.getOwnerPhone());
        pet.setOwnerEmail(updates.getOwnerEmail());
        pet.setUpdatedAt(System.currentTimeMillis());
        return petRepository.save(pet);
    }

    public void delete(String id) { petRepository.deleteById(id); }

    public Optional<Pet> get(String id) { return petRepository.findById(id); }

    public List<Pet> list() { return petRepository.findAll(); }
}