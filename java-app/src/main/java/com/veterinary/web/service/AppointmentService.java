package com.veterinary.web.service;

import com.veterinary.web.model.Appointment;
import com.veterinary.web.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment create(Appointment appointment) {
        // Validar solapamiento: mismo veterinario, misma fecha y hora
        List<Appointment> sameDay = appointmentRepository.findByVeterinarianAndDate(appointment.getVeterinarian(), appointment.getDate());
        boolean overlap = sameDay.stream().anyMatch(a -> a.getTime().equals(appointment.getTime()) && !"cancelada".equalsIgnoreCase(a.getStatus()));
        if (overlap) {
            throw new IllegalArgumentException("Conflicto: el veterinario ya tiene una cita en ese horario");
        }
        appointment.setStatus(appointment.getStatus() == null ? "pendiente" : appointment.getStatus());
        long now = System.currentTimeMillis();
        appointment.setCreatedAt(now);
        appointment.setUpdatedAt(now);
        if (appointment.getHistory() == null) {
            appointment.setHistory(new java.util.ArrayList<>());
        }
        appointment.getHistory().add("creada:" + now);
        return appointmentRepository.save(appointment);
    }

    public Appointment update(String id, Appointment updates) {
        Optional<Appointment> found = appointmentRepository.findById(id);
        if (!found.isPresent()) {
            throw new IllegalArgumentException("Cita no encontrada");
        }
        Appointment a = found.get();
        boolean veterinarianChanged = updates.getVeterinarian() != null && !updates.getVeterinarian().equals(a.getVeterinarian());
        boolean dateChanged = updates.getDate() != null && !updates.getDate().equals(a.getDate());
        boolean timeChanged = updates.getTime() != null && !updates.getTime().equals(a.getTime());
        if (veterinarianChanged || dateChanged || timeChanged) {
            String vet = updates.getVeterinarian() != null ? updates.getVeterinarian() : a.getVeterinarian();
            String date = updates.getDate() != null ? updates.getDate() : a.getDate();
            String time = updates.getTime() != null ? updates.getTime() : a.getTime();
            List<Appointment> sameDay = appointmentRepository.findByVeterinarianAndDate(vet, date);
            boolean overlap = sameDay.stream().anyMatch(ap -> ap.getTime().equals(time) && !ap.getId().equals(a.getId()) && !"cancelada".equalsIgnoreCase(ap.getStatus()));
            if (overlap) {
                throw new IllegalArgumentException("Conflicto: el veterinario ya tiene una cita en ese horario");
            }
            a.setVeterinarian(vet);
            a.setDate(date);
            a.setTime(time);
        }
        if (updates.getReason() != null) a.setReason(updates.getReason());
        if (updates.getDescription() != null) a.setDescription(updates.getDescription());
        if (updates.getPriority() != null) a.setPriority(updates.getPriority());
        if (updates.getType() != null) a.setType(updates.getType());
        if (updates.getStatus() != null) a.setStatus(updates.getStatus());
        if (updates.getHistory() != null) a.setHistory(updates.getHistory());
        a.setUpdatedAt(System.currentTimeMillis());
        return appointmentRepository.save(a);
    }

    public void delete(String id) { appointmentRepository.deleteById(id); }

    public Optional<Appointment> get(String id) { return appointmentRepository.findById(id); }

    public List<Appointment> list() { return appointmentRepository.findAll(); }

    public List<Appointment> listByPet(String petId) { return appointmentRepository.findByPetId(petId); }
}