package com.veterinary.web.repository;

import com.veterinary.web.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByVeterinarianAndDate(String veterinarian, String date);
    List<Appointment> findByPetId(String petId);
    List<Appointment> findByStatus(String status);
}