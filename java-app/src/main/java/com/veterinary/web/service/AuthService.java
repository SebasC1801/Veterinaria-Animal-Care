package com.veterinary.web.service;

import com.veterinary.web.model.User;
import com.veterinary.web.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("El correo ya está registrado");
        }
        user.setCreatedAt(System.currentTimeMillis());
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isPresent() && password.equals(existing.get().getPassword())) {
            return existing.get();
        }
        throw new IllegalArgumentException("Credenciales inválidas");
    }
}