package com.veterinary.web.api;

import com.veterinary.web.model.Appointment;
import com.veterinary.web.service.AppointmentService;
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

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
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
    public ResponseEntity<?> create(@RequestBody Appointment appointment) {
        try {
            return ResponseEntity.ok(appointmentService.create(appointment));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Appointment appointment) {
        try {
            return ResponseEntity.ok(appointmentService.update(id, appointment));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        appointmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}