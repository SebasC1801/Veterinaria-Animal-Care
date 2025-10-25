package com.veterinary.ui;

import javax.swing.*;
import java.awt.*;
import java.util.*;
import java.util.List;

import com.veterinary.models.animals.*;
import com.veterinary.models.pet.*;
import com.veterinary.models.medical.*;
import com.veterinary.services.clinic.VeterinarySystem;

/**
 * Aplicación principal de la interfaz gráfica del sistema veterinario.
 */
public class VeterinaryApp extends JFrame {
    
    private final VeterinarySystem system;
    private JTabbedPane tabbedPane;
    
    // Paneles principales
    private JPanel homePanel;
    private JPanel petsPanel;
    private JPanel appointmentsPanel;
    private JPanel patternsPanel;
    
    /**
     * Constructor de la aplicación.
     */
    public VeterinaryApp() {
        // Obtener la instancia del sistema
        system = VeterinarySystem.getInstance();
        
        // Configurar la ventana principal
        setTitle("Sistema de Gestión Veterinaria");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        
        // Inicializar componentes
        initComponents();
    }
    
    /**
     * Inicializa los componentes de la interfaz.
     */
    private void initComponents() {
        // Crear el panel con pestañas
        tabbedPane = new JTabbedPane();
        
        // Inicializar paneles
        initHomePanel();
        initPetsPanel();
        initAppointmentsPanel();
        initPatternsPanel();
        
        // Añadir paneles al tabbed pane
        tabbedPane.addTab("Inicio", homePanel);
        tabbedPane.addTab("Mascotas", petsPanel);
        tabbedPane.addTab("Citas", appointmentsPanel);
        tabbedPane.addTab("Patrones", patternsPanel);
        
        // Añadir el tabbed pane al frame
        add(tabbedPane);
    }
    
    /**
     * Inicializa el panel de inicio.
     */
    private void initHomePanel() {
        homePanel = new JPanel();
        homePanel.setLayout(new BorderLayout());
        
        // Panel de información del sistema
        JPanel infoPanel = new JPanel(new GridLayout(0, 2, 10, 5));
        infoPanel.setBorder(BorderFactory.createTitledBorder("Información del Sistema"));
        
        Map<String, String> systemInfo = system.getSystemInfo();
        for (Map.Entry<String, String> entry : systemInfo.entrySet()) {
            infoPanel.add(new JLabel(formatLabel(entry.getKey()) + ":"));
            infoPanel.add(new JLabel(entry.getValue()));
        }
        
        // Panel de acciones rápidas
        JPanel actionsPanel = new JPanel();
        actionsPanel.setBorder(BorderFactory.createTitledBorder("Acciones Rápidas"));
        actionsPanel.setLayout(new FlowLayout());
        
        JButton newPetBtn = new JButton("Nueva Mascota");
        JButton newAppointmentBtn = new JButton("Nueva Cita");
        JButton showPatternsBtn = new JButton("Ver Patrones");
        
        actionsPanel.add(newPetBtn);
        actionsPanel.add(newAppointmentBtn);
        actionsPanel.add(showPatternsBtn);
        
        // Añadir listeners a los botones
        newPetBtn.addActionListener(e -> tabbedPane.setSelectedIndex(1));
        newAppointmentBtn.addActionListener(e -> tabbedPane.setSelectedIndex(2));
        showPatternsBtn.addActionListener(e -> tabbedPane.setSelectedIndex(3));
        
        // Añadir paneles al panel principal
        homePanel.add(infoPanel, BorderLayout.CENTER);
        homePanel.add(actionsPanel, BorderLayout.SOUTH);
    }
    
    /**
     * Inicializa el panel de mascotas.
     */
    private void initPetsPanel() {
        petsPanel = new JPanel(new BorderLayout());
        
        // Panel de lista de mascotas
        JPanel listPanel = new JPanel(new BorderLayout());
        listPanel.setBorder(BorderFactory.createTitledBorder("Mascotas Registradas"));
        
        DefaultListModel<String> petListModel = new DefaultListModel<>();
        JList<String> petList = new JList<>(petListModel);
        JScrollPane scrollPane = new JScrollPane(petList);
        
        // Cargar mascotas existentes
        for (PetRecord record : system.getAllPetRecords()) {
            petListModel.addElement(record.getAnimal().getName() + " - " + record.getAnimal().getBreed());
        }
        
        listPanel.add(scrollPane, BorderLayout.CENTER);
        
        // Panel de formulario
        JPanel formPanel = new JPanel(new GridLayout(0, 2, 10, 5));
        formPanel.setBorder(BorderFactory.createTitledBorder("Registro de Mascota"));
        
        // Campos del formulario
        JTextField nameField = new JTextField();
        JTextField ageField = new JTextField();
        JTextField breedField = new JTextField();
        JTextField ownerField = new JTextField();
        
        String[] animalTypes = {"perro", "gato", "ave", "reptil"};
        JComboBox<String> typeCombo = new JComboBox<>(animalTypes);
        
        String[] familyTypes = {"domestic", "exotic"};
        JComboBox<String> familyCombo = new JComboBox<>(familyTypes);
        
        // Añadir campos al formulario
        formPanel.add(new JLabel("Tipo de Familia:"));
        formPanel.add(familyCombo);
        formPanel.add(new JLabel("Tipo de Animal:"));
        formPanel.add(typeCombo);
        formPanel.add(new JLabel("Nombre:"));
        formPanel.add(nameField);
        formPanel.add(new JLabel("Edad:"));
        formPanel.add(ageField);
        formPanel.add(new JLabel("Raza/Especie:"));
        formPanel.add(breedField);
        formPanel.add(new JLabel("Dueño:"));
        formPanel.add(ownerField);
        
        // Botón de registro
        JButton registerBtn = new JButton("Registrar");
        registerBtn.addActionListener(e -> {
            try {
                String familyType = (String) familyCombo.getSelectedItem();
                String animalType = (String) typeCombo.getSelectedItem();
                String name = nameField.getText();
                int age = Integer.parseInt(ageField.getText());
                String breed = breedField.getText();
                String owner = ownerField.getText();
                
                // Crear registro usando el patrón Builder
                PetRecordBuilder builder = new PetRecordBuilder();
                PetRecord record = builder
                    .setAnimalWithFamily(familyType, animalType, name, age, breed, owner)
                    .build();
                
                // Registrar en el sistema
                system.registerPet(record);
                
                // Actualizar lista
                petListModel.addElement(name + " - " + breed);
                
                // Limpiar formulario
                nameField.setText("");
                ageField.setText("");
                breedField.setText("");
                ownerField.setText("");
                
                JOptionPane.showMessageDialog(this, "Mascota registrada con éxito", "Registro", JOptionPane.INFORMATION_MESSAGE);
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(this, "La edad debe ser un número", "Error", JOptionPane.ERROR_MESSAGE);
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Error al registrar: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        });
        
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(registerBtn);
        
        // Añadir paneles al panel principal
        petsPanel.add(listPanel, BorderLayout.WEST);
        petsPanel.add(formPanel, BorderLayout.CENTER);
        petsPanel.add(buttonPanel, BorderLayout.SOUTH);
    }
    
    /**
     * Inicializa el panel de citas.
     */
    private void initAppointmentsPanel() {
        appointmentsPanel = new JPanel(new BorderLayout());
        
        // Panel de lista de citas
        JPanel listPanel = new JPanel(new BorderLayout());
        listPanel.setBorder(BorderFactory.createTitledBorder("Citas Programadas"));
        
        String[] columnNames = {"ID", "Mascota", "Fecha", "Veterinario", "Motivo", "Estado"};
        Object[][] data = new Object[0][6];
        
        JTable appointmentsTable = new JTable(data, columnNames);
        JScrollPane scrollPane = new JScrollPane(appointmentsTable);
        
        listPanel.add(scrollPane, BorderLayout.CENTER);
        
        // Panel de formulario
        JPanel formPanel = new JPanel(new GridLayout(0, 2, 10, 5));
        formPanel.setBorder(BorderFactory.createTitledBorder("Nueva Cita"));
        
        JTextField petField = new JTextField();
        JTextField dateField = new JTextField();
        JTextField reasonField = new JTextField();
        
        // Obtener veterinarios del sistema
        Map<Integer, String> vets = system.getVeterinarians();
        String[] vetNames = new String[vets.size()];
        Integer[] vetIds = new Integer[vets.size()];
        
        int i = 0;
        for (Map.Entry<Integer, String> entry : vets.entrySet()) {
            vetIds[i] = entry.getKey();
            vetNames[i] = entry.getValue();
            i++;
        }
        
        JComboBox<String> vetCombo = new JComboBox<>(vetNames);
        
        // Añadir campos al formulario
        formPanel.add(new JLabel("Mascota:"));
        formPanel.add(petField);
        formPanel.add(new JLabel("Fecha (DD/MM/YYYY):"));
        formPanel.add(dateField);
        formPanel.add(new JLabel("Veterinario:"));
        formPanel.add(vetCombo);
        formPanel.add(new JLabel("Motivo:"));
        formPanel.add(reasonField);
        
        // Botón de programación
        JButton scheduleBtn = new JButton("Programar Cita");
        scheduleBtn.addActionListener(e -> {
            try {
                String pet = petField.getText();
                String date = dateField.getText();
                int vetIndex = vetCombo.getSelectedIndex();
                int vetId = vetIds[vetIndex];
                String reason = reasonField.getText();
                
                // Programar cita
                int appointmentId = system.scheduleAppointment(pet, date, vetId, reason);
                
                // Limpiar formulario
                petField.setText("");
                dateField.setText("");
                reasonField.setText("");
                
                JOptionPane.showMessageDialog(this, "Cita programada con ID: " + appointmentId, "Cita", JOptionPane.INFORMATION_MESSAGE);
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Error al programar: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        });
        
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(scheduleBtn);
        
        // Añadir paneles al panel principal
        appointmentsPanel.add(listPanel, BorderLayout.CENTER);
        appointmentsPanel.add(formPanel, BorderLayout.SOUTH);
        appointmentsPanel.add(buttonPanel, BorderLayout.EAST);
    }
    
    /**
     * Inicializa el panel de demostración de patrones.
     */
    private void initPatternsPanel() {
        patternsPanel = new JPanel();
        patternsPanel.setLayout(new BoxLayout(patternsPanel, BoxLayout.Y_AXIS));
        
        // Crear paneles para cada patrón
        JPanel singletonPanel = createPatternPanel("Singleton", 
            "El sistema veterinario es un Singleton, garantizando una única instancia en toda la aplicación.",
            () -> demonstrateSingleton());
        
        JPanel factoryPanel = createPatternPanel("Factory Method", 
            "Permite crear diferentes tipos de animales sin especificar sus clases concretas.",
            () -> demonstrateFactoryMethod());
        
        JPanel abstractFactoryPanel = createPatternPanel("Abstract Factory", 
            "Crea familias de objetos relacionados (mascotas domésticas y exóticas).",
            () -> demonstrateAbstractFactory());
        
        JPanel builderPanel = createPatternPanel("Builder", 
            "Construye objetos complejos (registros de mascotas) paso a paso.",
            () -> demonstrateBuilder());
        
        JPanel prototypePanel = createPatternPanel("Prototype", 
            "Permite clonar objetos existentes (registros médicos) sin acoplar el código a sus clases.",
            () -> demonstratePrototype());
        
        // Añadir paneles al panel principal
        patternsPanel.add(singletonPanel);
        patternsPanel.add(factoryPanel);
        patternsPanel.add(abstractFactoryPanel);
        patternsPanel.add(builderPanel);
        patternsPanel.add(prototypePanel);
    }
    
    /**
     * Crea un panel para demostrar un patrón específico.
     */
    private JPanel createPatternPanel(String patternName, String description, Runnable demonstrationAction) {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBorder(BorderFactory.createTitledBorder(patternName));
        
        JTextArea descArea = new JTextArea(description);
        descArea.setEditable(false);
        descArea.setLineWrap(true);
        descArea.setWrapStyleWord(true);
        
        JButton demoBtn = new JButton("Demostrar");
        demoBtn.addActionListener(e -> demonstrationAction.run());
        
        panel.add(descArea, BorderLayout.CENTER);
        panel.add(demoBtn, BorderLayout.EAST);
        
        return panel;
    }
    
    /**
     * Demuestra el patrón Singleton.
     */
    private void demonstrateSingleton() {
        VeterinarySystem system1 = VeterinarySystem.getInstance();
        VeterinarySystem system2 = VeterinarySystem.getInstance();
        
        String message = "Sistema 1: " + system1 + "\n" +
                         "Sistema 2: " + system2 + "\n" +
                         "¿Son la misma instancia? " + (system1 == system2) + "\n" +
                         "Información del sistema: " + system1.getSystemInfo().get("clinic_name");
        
        showDemonstrationResult("Singleton", message);
    }
    
    /**
     * Demuestra el patrón Factory Method.
     */
    private void demonstrateFactoryMethod() {
        try {
            Animal dog = AnimalFactory.createAnimal("perro", "Max", 3, "Labrador", "Juan Pérez");
            Animal cat = AnimalFactory.createAnimal("gato", "Luna", 2, "Persa", "María García");
            Animal bird = AnimalFactory.createAnimal("ave", "Paco", 1, "Loro", "Carlos López");
            
            String message = "Perro creado: " + dog + "\n" +
                             "Gato creado: " + cat + "\n" +
                             "Ave creada: " + bird + "\n" +
                             "Cuidados del perro: " + dog.getSpecificCareInstructions().get(0) + "...\n" +
                             "Enfermedades comunes del gato: " + cat.getCommonDiseases().get(0) + "...\n" +
                             "Horario de alimentación del ave: " + bird.getFeedingSchedule().get("frequency");
            
            showDemonstrationResult("Factory Method", message);
        } catch (Exception e) {
            showDemonstrationResult("Factory Method", "Error: " + e.getMessage());
        }
    }
    
    /**
     * Demuestra el patrón Abstract Factory.
     */
    private void demonstrateAbstractFactory() {
        try {
            Animal domesticDog = PetFamilyFactoryManager.createPet("domestic", "perro", "Buddy", 4, "Golden Retriever", "Ana Martín");
            Animal exoticBird = PetFamilyFactoryManager.createPet("exotic", "ave", "Kiwi", 2, "Guacamayo", "Roberto Silva");
            
            Map<String, String> domesticInfo = PetFamilyFactoryManager.getFamilyInfo("domestic");
            Map<String, String> exoticInfo = PetFamilyFactoryManager.getFamilyInfo("exotic");
            
            String message = "Perro doméstico: " + domesticDog + "\n" +
                             "Ave exótica: " + exoticBird + "\n" +
                             "Familia doméstica: " + domesticInfo.get("family_name") + "\n" +
                             "Familia exótica: " + exoticInfo.get("family_name");
            
            showDemonstrationResult("Abstract Factory", message);
        } catch (Exception e) {
            showDemonstrationResult("Abstract Factory", "Error: " + e.getMessage());
        }
    }
    
    /**
     * Demuestra el patrón Builder.
     */
    private void demonstrateBuilder() {
        try {
            PetRecordBuilder builder = new PetRecordBuilder();
            List<String> allergies = new ArrayList<>();
            allergies.add("Polen");
            
            List<String> diseases = new ArrayList<>();
            diseases.add("Artritis");
            
            PetRecord record = builder
                .setAnimalWithFamily("domestic", "perro", "Rex", 5, "Pastor Alemán", "Laura Torres")
                .setOwnerInfo("Laura Torres", "3001234567", "laura@email.com", "Calle 123", "3007654321")
                .setMedicalInfo(25.5, "Al día", true, allergies, diseases)
                .setAdministrativeInfo(1, "Tarjeta")
                .build();
            
            String message = "Registro creado: " + record + "\n" +
                             "Animal: " + record.getAnimal().getName() + " (" + record.getAnimal().getBreed() + ")\n" +
                             "Dueño: " + record.getOwnerName() + "\n" +
                             "Contacto: " + record.getOwnerPhone() + "\n" +
                             "Peso: " + record.getWeight() + " kg\n" +
                             "Vacunación: " + record.getVaccinationStatus();
            
            showDemonstrationResult("Builder", message);
        } catch (Exception e) {
            showDemonstrationResult("Builder", "Error: " + e.getMessage());
        }
    }
    
    /**
     * Demuestra el patrón Prototype.
     */
    private void demonstratePrototype() {
        try {
            // Crear prototipo original
            MedicalRecord original = new MedicalRecord("Max", "Infección respiratoria", "Antibióticos", "Dr. Juan Pérez");
            original.addMedication("Amoxicilina 250mg");
            original.addMedication("Antiinflamatorio");
            original.addObservation("Mejora notable después de 3 días");
            
            // Clonar el prototipo
            MedicalRecord clone = original.clone();
            clone.setPetName("Rex");
            clone.addObservation("Seguimiento necesario en 7 días");
            
            String message = "Original: " + original + "\n" +
                             "Medicamentos original: " + original.getMedications().size() + "\n" +
                             "Observaciones original: " + original.getObservations().size() + "\n\n" +
                             "Clon: " + clone + "\n" +
                             "Medicamentos clon: " + clone.getMedications().size() + "\n" +
                             "Observaciones clon: " + clone.getObservations().size();
            
            showDemonstrationResult("Prototype", message);
        } catch (Exception e) {
            showDemonstrationResult("Prototype", "Error: " + e.getMessage());
        }
    }
    
    /**
     * Muestra el resultado de una demostración de patrón.
     */
    private void showDemonstrationResult(String patternName, String message) {
        JTextArea textArea = new JTextArea(message);
        textArea.setEditable(false);
        textArea.setLineWrap(true);
        textArea.setWrapStyleWord(true);
        
        JScrollPane scrollPane = new JScrollPane(textArea);
        scrollPane.setPreferredSize(new Dimension(400, 300));
        
        JOptionPane.showMessageDialog(this, scrollPane, "Demostración: " + patternName, JOptionPane.INFORMATION_MESSAGE);
    }
    
    /**
     * Formatea una etiqueta para mostrarla en la interfaz.
     */
    private String formatLabel(String key) {
        String[] words = key.split("_");
        StringBuilder result = new StringBuilder();
        
        for (String word : words) {
            if (word.length() > 0) {
                result.append(Character.toUpperCase(word.charAt(0)))
                      .append(word.substring(1))
                      .append(" ");
            }
        }
        
        return result.toString().trim();
    }
    
    /**
     * Método principal para iniciar la aplicación.
     */
    public static void main(String[] args) {
        // Usar el look and feel del sistema
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            System.err.println("No se pudo establecer el look and feel del sistema: " + e.getMessage());
        }
        
        // Iniciar la aplicación en el EDT
        SwingUtilities.invokeLater(() -> {
            VeterinaryApp app = new VeterinaryApp();
            app.setVisible(true);
        });
    }
}