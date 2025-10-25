package com.veterinary.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Aplicación web del sistema veterinario utilizando Spring Boot.
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.veterinary.web")
public class VeterinaryWebApp {
    
    /**
     * Método principal para iniciar la aplicación web.
     * @param args Argumentos de línea de comandos
     */
    public static void main(String[] args) {
        SpringApplication.run(VeterinaryWebApp.class, args);
    }
}