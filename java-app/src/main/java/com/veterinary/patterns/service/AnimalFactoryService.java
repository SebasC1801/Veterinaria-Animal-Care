package com.veterinary.patterns.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnimalFactoryService {
    
    // Factory Method Pattern Implementation
    private final Map<String, List<String>> breedsByAnimalType;
    private final Map<String, List<String>> familyCharacteristics;

    public AnimalFactoryService() {
        breedsByAnimalType = new HashMap<>();
        familyCharacteristics = new HashMap<>();
        initializeData();
    }

    private void initializeData() {
        // Dog breeds
        breedsByAnimalType.put("dog", Arrays.asList(
            "Labrador Retriever", "Golden Retriever", "German Shepherd", "French Bulldog",
            "Bulldog", "Poodle", "Beagle", "Rottweiler", "German Shorthaired Pointer",
            "Yorkshire Terrier", "Siberian Husky", "Dachshund", "Boxer", "Great Dane",
            "Border Collie", "Australian Shepherd", "Cocker Spaniel", "Shih Tzu"
        ));

        // Cat breeds
        breedsByAnimalType.put("cat", Arrays.asList(
            "Persian", "Maine Coon", "British Shorthair", "Ragdoll", "American Shorthair",
            "Scottish Fold", "Sphynx", "Russian Blue", "Siamese", "Abyssinian",
            "Bengal", "Birman", "Oriental Shorthair", "Devon Rex", "Norwegian Forest Cat",
            "Manx", "Himalayan", "Burmese"
        ));

        // Bird breeds
        breedsByAnimalType.put("bird", Arrays.asList(
            "Budgerigar", "Cockatiel", "Canary", "Lovebird", "Conure",
            "African Grey Parrot", "Amazon Parrot", "Cockatoo", "Finch", "Parakeet",
            "Macaw", "Quaker Parrot", "Sun Conure", "Green Cheek Conure", "Zebra Finch",
            "Gouldian Finch", "Society Finch", "Java Sparrow"
        ));

        // Reptile breeds
        breedsByAnimalType.put("reptile", Arrays.asList(
            "Ball Python", "Corn Snake", "Leopard Gecko", "Bearded Dragon", "Blue Tongue Skink",
            "Crested Gecko", "Red-Eared Slider", "Russian Tortoise", "Green Iguana", "Monitor Lizard",
            "Chameleon", "Garter Snake", "King Snake", "Boa Constrictor", "Anole Lizard",
            "Uromastyx", "Tegu", "Gecko"
        ));

        // Family characteristics (Abstract Factory Pattern)
        familyCharacteristics.put("domestic", Arrays.asList(
            "Suitable for families", "Easy to care for", "Good with children", 
            "Common in households", "Standard veterinary care", "Regular exercise needs"
        ));

        familyCharacteristics.put("exotic", Arrays.asList(
            "Specialized care required", "Unique dietary needs", "Specialized veterinary care",
            "Specific environmental requirements", "May require permits", "Advanced care knowledge needed"
        ));
    }

    // Factory Method - Create breeds for animal type
    public List<String> getBreedsForAnimalType(String animalType) {
        return breedsByAnimalType.getOrDefault(animalType.toLowerCase(), Arrays.asList());
    }

    // Abstract Factory - Get family characteristics
    public List<String> getFamilyCharacteristics(String familyType) {
        return familyCharacteristics.getOrDefault(familyType.toLowerCase(), Arrays.asList());
    }

    // Get all available animal types
    public List<String> getAnimalTypes() {
        return Arrays.asList("dog", "cat", "bird", "reptile");
    }

    // Get all available family types
    public List<String> getFamilyTypes() {
        return Arrays.asList("domestic", "exotic");
    }

    // Validate if breed exists for animal type
    public boolean isValidBreed(String animalType, String breed) {
        List<String> breeds = getBreedsForAnimalType(animalType);
        return breeds.contains(breed);
    }

    // Get animal type information
    public Map<String, Object> getAnimalTypeInfo(String animalType) {
        Map<String, Object> info = new HashMap<>();
        info.put("type", animalType);
        info.put("breeds", getBreedsForAnimalType(animalType));
        info.put("breedCount", getBreedsForAnimalType(animalType).size());
        
        switch (animalType.toLowerCase()) {
            case "dog":
                info.put("description", "Loyal companions with various sizes and temperaments");
                info.put("lifespan", "10-15 years");
                break;
            case "cat":
                info.put("description", "Independent pets with unique personalities");
                info.put("lifespan", "12-18 years");
                break;
            case "bird":
                info.put("description", "Colorful pets with vocal abilities");
                info.put("lifespan", "5-80 years (varies by species)");
                break;
            case "reptile":
                info.put("description", "Cold-blooded pets requiring specialized care");
                info.put("lifespan", "5-50 years (varies by species)");
                break;
        }
        
        return info;
    }
}
