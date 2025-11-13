package com.veterinary.web.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "appointments")
public class Appointment {
    @Id
    private String id;

    @Indexed
    private String petId;

    @Indexed
    private String veterinarian; // name or id for simplicity

    private String reason;
    private String description;
    private String priority; // 'alta', 'media', 'baja'
    private String type; // 'consulta', 'vacunación', etc.
    private String status; // 'pendiente', 'confirmada', 'completada', 'cancelada'

    // Simple date/time fields; can be ISO strings (e.g., 2025-11-08, 14:30)
    private String date; 
    private String time; 

    private long createdAt;
    private long updatedAt;
    private List<String> history;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getPetId() { return petId; }
    public void setPetId(String petId) { this.petId = petId; }
    public String getVeterinarian() { return veterinarian; }
    public void setVeterinarian(String veterinarian) { this.veterinarian = veterinarian; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
    public long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(long updatedAt) { this.updatedAt = updatedAt; }
    public List<String> getHistory() { return history; }
    public void setHistory(List<String> history) { this.history = history; }
}