package com.veterinary.web.repository;

import com.veterinary.web.model.Pet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PetRepository extends MongoRepository<Pet, String> {
    List<Pet> findByOwnerEmail(String ownerEmail);
    List<Pet> findByType(String type);
    List<Pet> findByFamilyType(String familyType);
}