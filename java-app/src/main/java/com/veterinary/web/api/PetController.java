package com.veterinary.web.api;

import com.veterinary.web.model.Pet;
import com.veterinary.web.service.PetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = {"http://localhost:5500", "http://localhost:8000", "http://localhost:8001"}, allowCredentials = "false")
public class PetController {
    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public List<Pet> list() { return petService.list(); }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable String id) {
        Optional<Pet> pet = petService.get(id);
        return pet.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("error", "Mascota no encontrada")));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Pet pet) {
        try {
            return ResponseEntity.ok(petService.create(pet));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Pet pet) {
        try {
            return ResponseEntity.ok(petService.update(id, pet));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        petService.delete(id);
        return ResponseEntity.noContent().build();
    }
}