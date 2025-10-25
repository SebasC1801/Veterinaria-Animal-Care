package com.veterinary.patterns.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/test")
    public String test(Model model) {
        model.addAttribute("message", "¡La aplicación está funcionando correctamente!");
        model.addAttribute("timestamp", java.time.LocalDateTime.now());
        return "test";
    }
}
