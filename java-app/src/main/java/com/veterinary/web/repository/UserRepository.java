package com.veterinary.web.repository;

import com.veterinary.web.model.User;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class UserRepository {
    private final Map<String, User> users = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public UserRepository() {
        // Usuarios de prueba precargados
        User veterinarian = new User();
        veterinarian.setId("1");
        veterinarian.setName("Dr. Juan Pérez");
        veterinarian.setEmail("veterinario@test.com");
        veterinarian.setPassword("123456");
        veterinarian.setRole("veterinarian");
        veterinarian.setPhone("555-0001");
        veterinarian.setCreatedAt(System.currentTimeMillis());
        users.put(veterinarian.getEmail(), veterinarian);

        User user = new User();
        user.setId("2");
        user.setName("María García");
        user.setEmail("usuario@test.com");
        user.setPassword("123456");
        user.setRole("user");
        user.setPhone("555-0002");
        user.setCreatedAt(System.currentTimeMillis());
        users.put(user.getEmail(), user);
    }

    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(users.get(email));
    }

    public User save(User user) {
        if (user.getId() == null) {
            user.setId(String.valueOf(idGenerator.getAndIncrement()));
        }
        users.put(user.getEmail(), user);
        return user;
    }

    public List<User> findAll() {
        return new ArrayList<>(users.values());
    }

    public Optional<User> findById(String id) {
        return users.values().stream()
                .filter(u -> u.getId().equals(id))
                .findFirst();
    }

    public void deleteById(String id) {
        users.values().removeIf(u -> u.getId().equals(id));
    }
}