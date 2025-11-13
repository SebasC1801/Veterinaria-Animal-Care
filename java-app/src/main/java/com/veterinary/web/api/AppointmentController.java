package com.veterinary.web.api;

import com.veterinary.web.model.Appointment;
import com.veterinary.web.service.AppointmentService;
import com.veterinary.web.repository.PetRepository;
import com.veterinary.web.model.Pet;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = {"http://localhost:5500", "http://localhost:8000", "http://localhost:8001"}, allowCredentials = "false")
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final PetRepository petRepository;

    public AppointmentController(AppointmentService appointmentService, PetRepository petRepository) {
        this.appointmentService = appointmentService;
        this.petRepository = petRepository;
    }

    @GetMapping
    public List<Appointment> list() { return appointmentService.list(); }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable String id) {
        Optional<Appointment> a = appointmentService.get(id);
        return a.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("error", "Cita no encontrada")));
    }

    @GetMapping("/pet/{petId}")
    public List<Appointment> listByPet(@PathVariable String petId) { return appointmentService.listByPet(petId); }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Appointment appointment, @RequestHeader(value = "X-User-Email", required = false) String requesterEmail, @RequestHeader(value = "X-User-Role", required = false) String requesterRole) {
        try {
            return ResponseEntity.ok(appointmentService.create(appointment));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Appointment appointment, @RequestHeader(value = "X-User-Email", required = false) String requesterEmail, @RequestHeader(value = "X-User-Role", required = false) String requesterRole) {
        try {
            Optional<Appointment> existingOpt = appointmentService.get(id);
            if (!existingOpt.isPresent()) {
                return ResponseEntity.status(404).body(Map.of("error", "Cita no encontrada"));
            }
            Appointment existing = existingOpt.get();
            boolean isUser = requesterRole != null && requesterRole.equalsIgnoreCase("user");
            if (isUser) {
                if (requesterEmail == null || requesterEmail.isBlank()) {
                    return ResponseEntity.status(403).body(Map.of("error", "Acceso denegado"));
                }
                Optional<Pet> petOpt = petRepository.findById(existing.getPetId());
                if (!petOpt.isPresent() || petOpt.get().getOwnerEmail() == null || !petOpt.get().getOwnerEmail().equalsIgnoreCase(requesterEmail)) {
                    return ResponseEntity.status(403).body(Map.of("error", "Solo puedes cancelar tus propias citas"));
                }
                String requestedStatus = appointment.getStatus();
                if (requestedStatus == null || !requestedStatus.equalsIgnoreCase("cancelada")) {
                    return ResponseEntity.status(403).body(Map.of("error", "No tienes permiso para editar la cita"));
                }
                if (existing.getStatus() != null && existing.getStatus().equalsIgnoreCase("cancelada")) {
                    return ResponseEntity.status(403).body(Map.of("error", "No puedes reactivar una cita cancelada"));
                }
                java.util.List<String> hist = existing.getHistory() != null ? new java.util.ArrayList<>(existing.getHistory()) : new java.util.ArrayList<>();
                hist.add("cancelada por " + requesterEmail + ":" + System.currentTimeMillis());
                Appointment safe = new Appointment();
                safe.setStatus("cancelada");
                safe.setHistory(hist);
                return ResponseEntity.ok(appointmentService.update(id, safe));
            }
            return ResponseEntity.ok(appointmentService.update(id, appointment));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id, @RequestHeader(value = "X-User-Email", required = false) String requesterEmail, @RequestHeader(value = "X-User-Role", required = false) String requesterRole) {
        Optional<Appointment> existingOpt = appointmentService.get(id);
        if (!existingOpt.isPresent()) {
            return ResponseEntity.status(404).body(Map.of("error", "Cita no encontrada"));
        }
        Appointment existing = existingOpt.get();
        boolean isUser = requesterRole != null && requesterRole.equalsIgnoreCase("user");
        if (isUser) {
            if (requesterEmail == null || requesterEmail.isBlank()) {
                return ResponseEntity.status(403).body(Map.of("error", "Acceso denegado"));
            }
            Optional<Pet> petOpt = petRepository.findById(existing.getPetId());
            if (!petOpt.isPresent() || petOpt.get().getOwnerEmail() == null || !petOpt.get().getOwnerEmail().equalsIgnoreCase(requesterEmail)) {
                return ResponseEntity.status(403).body(Map.of("error", "Solo puedes cancelar/eliminar tus propias citas"));
            }
        }
        appointmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}