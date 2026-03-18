package com.veterinary.web.repository;

import com.veterinary.web.model.Pet;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class PetRepository {
    private final Map<String, Pet> pets = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public List<Pet> findByOwnerEmail(String ownerEmail) {
        return pets.values().stream()
                .filter(p -> ownerEmail.equals(p.getOwnerEmail()))
                .collect(Collectors.toList());
    }

    public List<Pet> findByType(String type) {
        return pets.values().stream()
                .filter(p -> type.equals(p.getType()))
                .collect(Collectors.toList());
    }

    public List<Pet> findByFamilyType(String familyType) {
        return pets.values().stream()
                .filter(p -> familyType.equals(p.getFamilyType()))
                .collect(Collectors.toList());
    }

    public Pet save(Pet pet) {
        if (pet.getId() == null) {
            pet.setId(String.valueOf(idGenerator.getAndIncrement()));
        }
        pet.setUpdatedAt(System.currentTimeMillis());
        pets.put(pet.getId(), pet);
        return pet;
    }

    public List<Pet> findAll() {
        return new ArrayList<>(pets.values());
    }

    public Optional<Pet> findById(String id) {
        return Optional.ofNullable(pets.get(id));
    }

    public void deleteById(String id) {
        pets.remove(id);
    }
}