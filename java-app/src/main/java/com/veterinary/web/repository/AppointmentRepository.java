package com.veterinary.web.repository;

import com.veterinary.web.model.Appointment;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class AppointmentRepository {
    private final Map<String, Appointment> appointments = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public List<Appointment> findByVeterinarianAndDate(String veterinarian, String date) {
        return appointments.values().stream()
                .filter(a -> veterinarian.equals(a.getVeterinarian()) && date.equals(a.getDate()))
                .collect(Collectors.toList());
    }

    public List<Appointment> findByPetId(String petId) {
        return appointments.values().stream()
                .filter(a -> petId.equals(a.getPetId()))
                .collect(Collectors.toList());
    }

    public List<Appointment> findByStatus(String status) {
        return appointments.values().stream()
                .filter(a -> status.equals(a.getStatus()))
                .collect(Collectors.toList());
    }

    public Appointment save(Appointment appointment) {
        if (appointment.getId() == null) {
            appointment.setId(String.valueOf(idGenerator.getAndIncrement()));
        }
        appointment.setUpdatedAt(System.currentTimeMillis());
        appointments.put(appointment.getId(), appointment);
        return appointment;
    }

    public List<Appointment> findAll() {
        return new ArrayList<>(appointments.values());
    }

    public Optional<Appointment> findById(String id) {
        return Optional.ofNullable(appointments.get(id));
    }

    public void deleteById(String id) {
        appointments.remove(id);
    }
}