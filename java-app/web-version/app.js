// Veterinaria Animal Care - Aplicación Web
// JavaScript para la aplicación web

// ===== GLOBAL VARIABLES =====
let authSystem;
let consultationSystem;
let veterinarySystem;
let petToDelete = null;

// ===== AUTHENTICATION SYSTEM =====
class AuthenticationSystem {
    constructor() {
        this.users = [];
        this.currentUser = null;
        this.loadUsersFromStorage();
        
        // Define role permissions (solo: veterinarian, user)
        this.rolePermissions = {
            veterinarian: {
                canManageUsers: true,
                canManagePets: true,
                canManageAppointments: true,
                canSetAppointmentPriority: true,
                canDeletePets: true,
                canViewAllData: true,
                canManageSystem: true
            },
            user: {
                canManageUsers: false,
                canManagePets: false,
                canManageAppointments: false,
                canSetAppointmentPriority: false,
                canDeletePets: false,
                canViewAllData: false,
                canManageSystem: false
            }
        };
        
        // Initialize with default users if no users exist in localStorage
        const hasStoredUsers = localStorage.getItem('veterinaryUsers');
        if (!hasStoredUsers) {
            this.initializeDefaultUsers();
        }
    }

    initializeDefaultUsers() {
        const defaultUsers = [
            {
                id: 1,
                name: "Dr. García",
                email: "dr.garcia@veterinaria.com",
                password: "veterinario123",
                role: "veterinarian",
                phone: "+57 300 000 0001",
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: "Juan Pérez",
                email: "juan@email.com",
                password: "usuario123",
                role: "user",
                phone: "+57 300 000 0002",
                createdAt: new Date().toISOString()
            }
        ];
        
        this.users = defaultUsers;
        this.saveUsersToStorage();
    }

    registerUser(userData) {
        // Validate required fields
        if (!userData.name || !userData.email || !userData.password || !userData.role || !userData.phone) {
            throw new Error('Todos los campos son obligatorios');
        }

        // Validate name has surname
        if (userData.name.trim().split(' ').length < 2) {
            throw new Error('El nombre debe incluir nombre y apellido');
        }

        // Validate password length
        if (userData.password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }

        // Validate password confirmation
        if (userData.password !== userData.confirmPassword) {
            throw new Error('Las contraseñas no coinciden');
        }

        // Validate phone has numbers
        if (!/\d/.test(userData.phone)) {
            throw new Error('El teléfono debe contener al menos números');
        }

        // Check if email already exists
        if (this.users.find(user => user.email === userData.email)) {
            throw new Error('Este correo electrónico ya está registrado');
        }

        // Create new user
        const newUser = {
            id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1,
            name: userData.name.trim(),
            email: userData.email.trim().toLowerCase(),
            password: userData.password, // In real app, this should be hashed
            role: userData.role,
            phone: userData.phone.trim(),
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsersToStorage();
        return newUser;
    }

    loginUser(email, password, role) {
        console.log('🔍 Buscando usuario con:');
        console.log('📧 Email buscado:', email.toLowerCase());
        console.log('🔑 Password buscado:', password);
        console.log('👤 Role buscado:', role);
        
        console.log('📋 Usuarios disponibles:');
        this.users.forEach(u => {
            console.log(`- ID: ${u.id}, Email: ${u.email}, Role: ${u.role}, Password: ${u.password}`);
        });
        
        const user = this.users.find(u => 
            u.email === email.toLowerCase() && 
            u.password === password && 
            (u.role === role || (role === 'veterinarian' && (u.role === 'employee' || u.role === 'admin')))
        );

        if (!user) {
            console.log('❌ No se encontró usuario con esas credenciales exactas');
            throw new Error('Credenciales incorrectas');
        }

        console.log('✅ Usuario encontrado:', user);
        this.currentUser = user;
        this.saveCurrentUserToStorage();
        return user;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    getCurrentUser() {
        if (!this.currentUser) {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                try {
                    this.currentUser = JSON.parse(storedUser);
                    console.log('✅ Usuario cargado desde localStorage:', this.currentUser);
                } catch (error) {
                    console.error('❌ Error al parsear usuario desde localStorage:', error);
                    localStorage.removeItem('currentUser');
                    this.currentUser = null;
                }
            }
        }
        return this.currentUser;
    }

    hasRole(requiredRole) {
        const user = this.getCurrentUser();
        if (!user) return false;

        const roleHierarchy = {
            'user': 1,
            'veterinarian': 2
        };

        return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
    }

    hasPermission(permission) {
        if (!this.currentUser) return false;
        const userRole = this.currentUser.role;
        return this.rolePermissions[userRole] && this.rolePermissions[userRole][permission];
    }

    getRoleDisplayName(role) {
        const roleNames = {
            veterinarian: 'Veterinario',
            user: 'Usuario'
        };
        return roleNames[role] || role;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    saveUsersToStorage() {
        try {
            localStorage.setItem('veterinaryUsers', JSON.stringify(this.users));
            console.log('✅ Usuarios guardados en localStorage:', this.users.length, 'usuarios');
        } catch (error) {
            console.error('❌ Error al guardar usuarios en localStorage:', error);
        }
    }

    loadUsersFromStorage() {
        try {
            const stored = localStorage.getItem('veterinaryUsers');
            if (stored) {
                this.users = JSON.parse(stored).map(u => ({
                    ...u,
                    role: (u.role === 'admin' || u.role === 'employee') ? 'veterinarian' : u.role
                }));
                console.log('✅ Usuarios cargados desde localStorage:', this.users.length, 'usuarios');
            } else {
                console.log('📝 No hay usuarios guardados en localStorage');
            }
        } catch (error) {
            console.error('❌ Error al cargar usuarios desde localStorage:', error);
            this.users = [];
        }
    }

    saveCurrentUserToStorage() {
        try {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            console.log('✅ Usuario guardado en localStorage:', this.currentUser);
        } catch (error) {
            console.error('❌ Error al guardar usuario en localStorage:', error);
        }
    }
}

// ===== RESPONSIVE DESIGN - MENÚ MÓVIL =====
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('mobileMenuToggle');
    
    nav.classList.toggle('mobile-menu-open');
    toggle.classList.toggle('active');
    
    // Recalcular alto del header por cambios del menú móvil
    applyHeaderOffset();
    
    console.log('📱 Menú móvil toggled');
}

function closeMobileMenu() {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('mobileMenuToggle');
    
    nav.classList.remove('mobile-menu-open');
    toggle.classList.remove('active');

    // Recalcular alto del header al cerrar el menú
    applyHeaderOffset();
}

// Calcula dinámicamente el alto del header y lo aplica a la variable CSS
function applyHeaderOffset() {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    const height = header.offsetHeight || 0;
    document.documentElement.style.setProperty('--header-height', height + 'px');
}

// Cerrar menú móvil al hacer clic en un enlace
function setupMobileMenuHandlers() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        const nav = document.getElementById('mainNav');
        const toggle = document.getElementById('mobileMenuToggle');
        
        if (!nav.contains(event.target) && !toggle.contains(event.target)) {
            closeMobileMenu();
        }
    });
}

// ===== WIZARD DE REGISTRO =====

let currentWizardStep = 1;
const totalWizardSteps = 4;

function initializeRegistrationWizard() {
    console.log('🧙‍♂️ Inicializando wizard de registro mejorado...');
    
    // Mostrar el primer paso
    showWizardStep(1);
    updateProgressBar(1);
    updateStepHelpText(1);
    
    // Configurar eventos de clic en los pasos para navegación directa
    document.querySelectorAll('.wizard-step').forEach(step => {
        step.addEventListener('click', function() {
            const stepNumber = parseInt(this.dataset.step);
            goToStep(stepNumber);
        });
    });
    
    // Configurar eventos de los botones de navegación
    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    const submitBtn = document.getElementById('submitRegistrationBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeStep(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeStep(1));
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', submitRegistration);
    }
    
    console.log('✅ Wizard de registro mejorado inicializado correctamente');
}

// Función para navegar directamente a un paso específico
function goToStep(stepNumber) {
    // Validar que el paso sea accesible
    if (stepNumber > 1) {
        const canProceed = validateStepsUpTo(stepNumber - 1);
        if (!canProceed) {
            showNotification('Complete los pasos anteriores antes de continuar', 'warning');
            return;
        }
    }
    
    currentWizardStep = stepNumber;
    showWizardStep(stepNumber);
    updateProgressBar(stepNumber);
    updateStepHelpText(stepNumber);
}

// Función para actualizar la barra de progreso
function updateProgressBar(currentStep) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill && progressText) {
        const percentage = (currentStep / 4) * 100;
        progressFill.style.width = percentage + '%';
        progressText.innerHTML = `<i class="fas fa-chart-line"></i> ${percentage}% Completado`;
    }
}

// Función para actualizar el texto de ayuda del paso
function updateStepHelpText(currentStep) {
    const stepHelpText = document.getElementById('stepHelpText');
    const helpTexts = {
        1: 'Complete la información básica para continuar',
        2: 'Agregue los detalles físicos de la mascota',
        3: 'Proporcione los datos de contacto del propietario',
        4: 'Revise toda la información antes de guardar'
    };
    
    if (stepHelpText) {
        stepHelpText.textContent = helpTexts[currentStep] || '';
    }
}

// Función para validar pasos hasta un número específico
function validateStepsUpTo(stepNumber) {
    for (let i = 1; i <= stepNumber; i++) {
        if (!validateCurrentStep(i)) {
            return false;
        }
    }
    return true;
}

function showWizardStep(stepNumber) {
    // Ocultar todos los pasos
    for (let i = 1; i <= totalWizardSteps; i++) {
        const stepContent = document.getElementById(`step${i}`);
        const stepIndicator = document.querySelector(`.wizard-step[data-step="${i}"]`);
        
        if (stepContent) {
            stepContent.classList.remove('active');
        }
        
        if (stepIndicator) {
            stepIndicator.classList.remove('active');
        }
    }
    
    // Mostrar el paso actual
    const currentStepContent = document.getElementById(`step${stepNumber}`);
    const currentStepIndicator = document.querySelector(`.wizard-step[data-step="${stepNumber}"]`);
    
    if (currentStepContent) {
        currentStepContent.classList.add('active');
    }
    
    if (currentStepIndicator) {
        currentStepIndicator.classList.add('active');
    }
    
    // Actualizar navegación
    updateWizardNavigation(stepNumber);
}

function changeStep(direction) {
    const newStep = currentWizardStep + direction;
    
    // Validar paso actual antes de avanzar
    if (direction > 0 && !validateCurrentStep()) {
        return;
    }
    
    // Verificar límites
    if (newStep < 1 || newStep > totalWizardSteps) {
        return;
    }
    
    currentWizardStep = newStep;
    showWizardStep(currentWizardStep);
    updateProgressBar(currentWizardStep);
    updateStepHelpText(currentWizardStep);
    
    // Si llegamos al paso de confirmación, generar resumen
    if (currentWizardStep === 4) {
        generateRegistrationSummary();
    }
}

function validateCurrentStep(stepToValidate = null) {
    const stepNumber = stepToValidate || currentWizardStep;
    let isValid = true;
    let requiredFields = [];
    
    // Definir campos requeridos por paso
    switch (stepNumber) {
        case 1: // Información básica
            requiredFields = ['tipoAnimal', 'nombreMascota'];
            break;
        case 2: // Detalles del animal (sin campos obligatorios adicionales)
            break;
        case 3: // Información del propietario
            requiredFields = ['nombrePropietario', 'telefonoPropietario', 'emailPropietario'];
            break;
        case 4: // Confirmación (no requiere validación)
            return true;
    }
    
    // Validar campos requeridos
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.remove('error');
            
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            }
        }
    });
    
    // Validación específica para email
    if (stepNumber === 3) {
        const emailField = document.getElementById('emailPropietario');
        if (emailField && emailField.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
                emailField.classList.add('error');
                isValid = false;
                showNotification('Por favor, ingresa un email válido', 'error');
            }
        }
    }
    
    if (!isValid) {
        showNotification('Por favor, completa todos los campos requeridos', 'error');
    }
    
    return isValid;
}

function updateWizardNavigation(stepNumber) {
    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    const submitBtn = document.getElementById('submitRegistrationBtn');
    const stepInfo = document.querySelector('.step-info');
    
    // Actualizar información del paso
    if (stepInfo) {
        stepInfo.textContent = `Paso ${stepNumber} de ${totalWizardSteps}`;
    }
    
    // Controlar visibilidad de botones
    if (prevBtn) {
        prevBtn.style.display = stepNumber === 1 ? 'none' : 'inline-flex';
    }
    
    if (nextBtn) {
        nextBtn.style.display = stepNumber === totalWizardSteps ? 'none' : 'inline-flex';
    }
    
    if (submitBtn) {
        submitBtn.style.display = stepNumber === totalWizardSteps ? 'inline-flex' : 'none';
    }
}

function generateRegistrationSummary() {
    const summaryContainer = document.getElementById('registrationSummary');
    if (!summaryContainer) return;
    
    // Recopilar datos del formulario
    const formData = {
        // Información básica
        tipoAnimal: document.getElementById('tipoAnimal')?.value || '',
        nombreMascota: document.getElementById('nombreMascota')?.value || '',
        
        // Detalles del animal
        razaMascota: document.getElementById('razaMascota')?.value || 'No especificada',
        edadMascota: document.getElementById('edadMascota')?.value || 'No especificada',
        pesoMascota: document.getElementById('pesoMascota')?.value || 'No especificado',
        colorMascota: document.getElementById('colorMascota')?.value || 'No especificado',
        
        // Información del propietario
        nombrePropietario: document.getElementById('nombrePropietario')?.value || '',
        telefonoPropietario: document.getElementById('telefonoPropietario')?.value || '',
        emailPropietario: document.getElementById('emailPropietario')?.value || '',
        direccionPropietario: document.getElementById('direccionPropietario')?.value || 'No especificada',
        contactoEmergencia: document.getElementById('contactoEmergencia')?.value || 'No especificado'
    };
    
    // Generar HTML del resumen
    summaryContainer.innerHTML = `
        <div class="summary-section">
            <h3><i class="fas fa-paw"></i> Información del Animal</h3>
            <div class="summary-grid">
                <div class="summary-item">
                    <strong>Tipo de Animal:</strong>
                    ${formData.tipoAnimal}
                </div>
                <div class="summary-item">
                    <strong>Nombre:</strong>
                    ${formData.nombreMascota}
                </div>
                <div class="summary-item">
                    <strong>Raza:</strong>
                    ${formData.razaMascota}
                </div>
                <div class="summary-item">
                    <strong>Edad:</strong>
                    ${formData.edadMascota}
                </div>
                <div class="summary-item">
                    <strong>Peso:</strong>
                    ${formData.pesoMascota}
                </div>
                <div class="summary-item">
                    <strong>Color:</strong>
                    ${formData.colorMascota}
                </div>
            </div>
        </div>
        
        <div class="summary-section">
            <h3><i class="fas fa-user"></i> Información del Propietario</h3>
            <div class="summary-grid">
                <div class="summary-item">
                    <strong>Nombre:</strong>
                    ${formData.nombrePropietario}
                </div>
                <div class="summary-item">
                    <strong>Teléfono:</strong>
                    ${formData.telefonoPropietario}
                </div>
                <div class="summary-item">
                    <strong>Email:</strong>
                    ${formData.emailPropietario}
                </div>
                <div class="summary-item">
                    <strong>Dirección:</strong>
                    ${formData.direccionPropietario}
                </div>
                <div class="summary-item">
                    <strong>Contacto de Emergencia:</strong>
                    ${formData.contactoEmergencia}
                </div>
            </div>
        </div>
    `;
}

function toggleCollapsible(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('expanded');
        icon.style.transform = 'rotate(180deg)';
    }
}

function submitRegistration() {
    if (!authSystem || !authSystem.hasPermission('canManagePets')) {
        showNotification('No tienes permiso para registrar mascotas', 'error');
        return;
    }
    // Validar una vez más antes de enviar
    if (!validateAllSteps()) {
        showNotification('Por favor, revisa todos los campos requeridos', 'error');
        return;
    }
    
    try {
        // Recopilar datos del formulario
        const petData = {
            tipo: document.getElementById('tipoAnimal').value,
            nombre: document.getElementById('nombreMascota').value,
            raza: document.getElementById('razaMascota').value || 'No especificada',
            edad: document.getElementById('edadMascota').value || 'No especificada',
            peso: document.getElementById('pesoMascota').value || 'No especificado',
            color: document.getElementById('colorMascota').value || 'No especificado',
            propietario: document.getElementById('nombrePropietario').value,
            telefono: document.getElementById('telefonoPropietario').value,
            email: document.getElementById('emailPropietario').value,
            direccion: document.getElementById('direccionPropietario').value || 'No especificada',
            contactoEmergencia: document.getElementById('contactoEmergencia').value || 'No especificado'
        };
        
        // Registrar la mascota usando el sistema existente
        veterinarySystem.registerPet(petData);
        
        // Mostrar mensaje de éxito
        showNotification('¡Mascota registrada exitosamente!', 'success');
        
        // Limpiar formulario y volver al primer paso
        resetRegistrationWizard();
        
        // Actualizar la lista de mascotas si estamos en esa sección
        if (document.getElementById('mascotasSection').classList.contains('active')) {
            updatePetsList();
        }
        
        // Volver a la sección de mascotas
        setTimeout(() => {
            showSection('mascotas');
        }, 1500);
        
    } catch (error) {
        console.error('Error al registrar mascota:', error);
        showNotification('Error al registrar la mascota: ' + error.message, 'error');
    }
}

function validateAllSteps() {
    // Validar campos esenciales
    const requiredFields = [
        'tipoAnimal',
        'nombreMascota', 
        'nombrePropietario',
        'telefonoPropietario',
        'emailPropietario'
    ];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            return false;
        }
    }
    
    // Validar email
    const emailField = document.getElementById('emailPropietario');
    if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
            return false;
        }
    }
    
    return true;
}

function resetRegistrationWizard() {
    // Limpiar todos los campos del formulario
    const form = document.getElementById('registroForm');
    if (form) {
        form.reset();
    }
    
    // Volver al primer paso
    currentWizardStep = 1;
    showWizardStep(1);
    
    // Cerrar secciones colapsables
    const collapsibleContents = document.querySelectorAll('.collapsible-content');
    collapsibleContents.forEach(content => {
        content.classList.remove('expanded');
    });
    
    const collapsibleIcons = document.querySelectorAll('.collapsible-toggle i');
    collapsibleIcons.forEach(icon => {
        icon.style.transform = 'rotate(0deg)';
    });
    
    // Limpiar resumen
    const summaryContainer = document.getElementById('registrationSummary');
    if (summaryContainer) {
        summaryContainer.innerHTML = '';
    }
}

function showNotification(message, type = 'success') {
    // Remover notificación existente si la hay
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'notification-error' : ''}`;
    
    const icon = type === 'error' ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// ===== CONSULTATION SYSTEM =====
class ConsultationSystem {
    constructor() {
        this.consultations = [];
        this.nextId = 1;
        this.loadFromStorage();
    }

    createConsultation(consultationData) {
        // Validate required fields
        if (!consultationData.petId || !consultationData.reason || !consultationData.description || 
            !consultationData.date || !consultationData.time || !consultationData.veterinarian) {
            throw new Error('Todos los campos obligatorios deben ser completados');
        }

        // Validate date is not in the past
        const consultationDateTime = new Date(`${consultationData.date}T${consultationData.time}`);
        if (consultationDateTime < new Date()) {
            throw new Error('No se pueden programar consultas en fechas pasadas');
        }

        const consultation = {
            id: this.nextId++,
            petId: parseInt(consultationData.petId),
            reason: consultationData.reason,
            description: consultationData.description,
            date: consultationData.date,
            time: consultationData.time,
            veterinarian: consultationData.veterinarian,
            priority: consultationData.priority || 'normal',
            status: 'scheduled',
            createdAt: new Date().toISOString(),
            createdBy: authSystem.getCurrentUser()?.id || 1
        };

        this.consultations.push(consultation);
        this.saveToStorage();
        return consultation;
    }

    getConsultations() {
        return this.consultations;
    }

    getConsultationById(id) {
        return this.consultations.find(c => c.id === id);
    }

    updateConsultationStatus(id, status) {
        const consultation = this.getConsultationById(id);
        if (consultation) {
            consultation.status = status;
            consultation.updatedAt = new Date().toISOString();
            this.saveToStorage();
            return consultation;
        }
        return null;
    }

    deleteConsultation(id) {
        const index = this.consultations.findIndex(c => c.id === id);
        if (index !== -1) {
            this.consultations.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    saveToStorage() {
        localStorage.setItem('veterinaryConsultations', JSON.stringify({
            consultations: this.consultations,
            nextId: this.nextId
        }));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('veterinaryConsultations');
        if (stored) {
            const data = JSON.parse(stored);
            this.consultations = data.consultations || [];
            this.nextId = data.nextId || 1;
        }
    }
}

// ===== VETERINARY SYSTEM CLASS =====
class VeterinarySystem {
    constructor() {
        this.pets = [];
        this.nextId = 1;
        this.systemInfo = {
            name: "Veterinaria AnimalCare",
            version: "1.0.0",
            clinicName: "Clínica Veterinaria AnimalCare",
            clinicAddress: "Calle Principal 123",
            clinicPhone: "300-123-4567"
        };
        
        // Cargar datos guardados
        this.loadFromStorage();
    }

    // Singleton Pattern - Una sola instancia del sistema
    static getInstance() {
        if (!VeterinarySystem.instance) {
            VeterinarySystem.instance = new VeterinarySystem();
        }
        return VeterinarySystem.instance;
    }
    
    // Guardar en localStorage
    saveToStorage() {
        try {
            const data = {
                pets: this.pets,
                nextId: this.nextId
            };
            localStorage.setItem('veterinarySystem', JSON.stringify(data));
            console.log('✅ Datos guardados en localStorage:', data);
            console.log('✅ Total mascotas guardadas:', this.pets.length);
        } catch (error) {
            console.error('❌ Error al guardar en localStorage:', error);
        }
    }

    // Cargar desde localStorage
    loadFromStorage() {
        try {
            const saved = localStorage.getItem('veterinarySystem');
            console.log('📥 Datos cargados desde localStorage:', saved);
            if (saved) {
                const data = JSON.parse(saved);
                this.pets = data.pets || [];
                this.nextId = data.nextId || 1;
                console.log('✅ Mascotas cargadas:', this.pets.length);
                console.log('✅ Datos cargados:', this.pets);
            } else {
                console.log('ℹ️ No hay datos guardados, cargando datos de ejemplo');
                // Solo cargar datos de ejemplo si no hay datos guardados
                this.loadExampleData();
            }
        } catch (error) {
            console.error('❌ Error al cargar desde localStorage:', error);
            this.loadExampleData();
        }
    }

    // Cargar datos de ejemplo solo si no hay datos guardados
    loadExampleData() {
        console.log('🔄 Cargando datos de ejemplo...');
        const examplePets = [
            {
            name: "Max",
            age: 3,
            breed: "Labrador Retriever",
                type: "dog",
                owner: "Juan Pérez"
            },
            {
            name: "Luna",
            age: 2,
                breed: "Persian",
                type: "cat", 
                owner: "María García"
            },
            {
                name: "Kiwi",
                age: 1,
                breed: "Macaw",
                type: "bird",
                owner: "Roberto Silva"
            }
        ];

        examplePets.forEach(petData => {
            console.log('🔄 Registrando mascota de ejemplo:', petData.name);
            const pet = this.createAnimal(
                petData.type,
                petData.name,
                petData.age,
                petData.breed,
                petData.owner
            );
            this.registerPet(pet);
        });
        
        console.log('✅ Datos de ejemplo cargados. Total mascotas:', this.pets.length);
    }
    
    // Factory Method Pattern - Crear diferentes tipos de animales
    createAnimal(type, name, age, breed, owner) {
        const animalTypes = {
            'dog': 'Perro',
            'cat': 'Gato', 
            'bird': 'Ave',
            'reptile': 'Reptil'
        };
        
        return {
            id: this.nextId++,
            name: name,
            age: age,
            breed: breed,
            type: type,
            typeName: animalTypes[type] || 'Animal',
            owner: owner,
            familyType: this.getFamilyType(type),
            registrationDate: new Date().toISOString(),
            status: 'Activo',
            vaccinationStatus: 'Pendiente',
            allergies: [],
            chronicConditions: []
        };
    }

    // Obtener razas por tipo de animal
    getBreedsByType(animalType) {
        const breeds = {
            'dog': [
                'Labrador Retriever', 'Golden Retriever', 'Pastor Alemán', 'Bulldog Francés',
                'Beagle', 'Poodle', 'Rottweiler', 'Yorkshire Terrier', 'Chihuahua',
                'Husky Siberiano', 'Border Collie', 'Doberman', 'Boxer', 'Maltés',
                'Shih Tzu', 'Pomerania', 'Dálmata', 'San Bernardo', 'Mastín',
                'Escribir manualmente'
            ],
            'cat': [
                'Persa', 'Siamés', 'Maine Coon', 'Ragdoll', 'British Shorthair',
                'Sphynx', 'Bengalí', 'Abisinio', 'Siberiano', 'Birmano',
                'Scottish Fold', 'Devon Rex', 'Cornish Rex', 'Oriental', 'Bombay',
                'Himalayo', 'Angora Turco', 'Manx', 'Somalí', 'Tonkinés',
                'Escribir manualmente'
            ],
            'bird': [
                'Canario', 'Periquito', 'Cockatiel', 'Agapornis', 'Diamante Mandarín',
                'Pinzón Cebra', 'Jilguero', 'Ruiseñor', 'Cardenal', 'Azulejo',
                'Cacatúa', 'Guacamayo', 'Loro Gris Africano', 'Perico Australiano',
                'Ninfa', 'Cotorra', 'Tucán', 'Colibrí', 'Pavo Real',
                'Escribir manualmente'
            ],
            'reptile': [
                'Dragón Barbudo', 'Gecko Leopardo', 'Iguana Verde', 'Camaleón',
                'Tortuga de Agua', 'Tortuga Terrestre', 'Serpiente de Maíz',
                'Pitón Real', 'Anolis', 'Escinco de Lengua Azul', 'Uromastyx',
                'Tegu', 'Monstruo de Gila', 'Dragón de Agua', 'Basilisco',
                'Camaleón Pantera', 'Gecko Crestado', 'Serpiente Rey',
                'Escribir manualmente'
            ]
        };
        return breeds[animalType] || ['Escribir manualmente'];
    }

    // Abstract Factory Pattern - Familias de mascotas
    getFamilyType(animalType) {
        const domesticTypes = ['dog', 'cat'];
        return domesticTypes.includes(animalType) ? 'domestic' : 'exotic';
    }
    
    getFamilyCharacteristics(familyType) {
        const characteristics = {
            'domestic': ['Compañía', 'Protección', 'Entretenimiento', 'Terapia'],
            'exotic': ['Colección', 'Educación', 'Conservación', 'Investigación']
        };
        return characteristics[familyType] || [];
    }

    // Builder Pattern - Construir registros complejos
    buildPet(name, age, breed, type, owner, options = {}) {
        const pet = this.createAnimal(type, name, age, breed, owner);
        
        // Aplicar opciones adicionales
        if (options.phone) pet.ownerPhone = options.phone;
        if (options.email) pet.ownerEmail = options.email;
        if (options.emergencyContact) pet.emergencyContact = options.emergencyContact;
        if (options.allergies) pet.allergies = options.allergies;
        if (options.chronicConditions) pet.chronicConditions = options.chronicConditions;
        if (options.vaccinationStatus) pet.vaccinationStatus = options.vaccinationStatus;
        
        return pet;
    }

    // Prototype Pattern - Clonar mascotas
    clonePet(originalPet, newName) {
        const cloned = {
            ...originalPet,
            id: this.nextId++,
            name: newName,
            registrationDate: new Date().toISOString()
        };
        return cloned;
    }

    // Métodos de gestión
    registerPet(pet) {
        console.log('🔵 Registrando mascota en VeterinarySystem:', pet);
        this.pets.push(pet);
        console.log('🔵 Total mascotas después del push:', this.pets.length);
        console.log('🔵 Array de mascotas:', this.pets);
        this.saveToStorage(); // Guardar automáticamente
        console.log('🔵 Mascota registrada exitosamente');
        return pet;
    }

    getAllPets() {
        return this.pets;
    }

    searchPets(query) {
        const lowerQuery = query.toLowerCase();
        return this.pets.filter(pet => 
            pet.name.toLowerCase().includes(lowerQuery) ||
            pet.breed.toLowerCase().includes(lowerQuery) ||
            pet.owner.toLowerCase().includes(lowerQuery) ||
            pet.typeName.toLowerCase().includes(lowerQuery)
        );
    }

    // Búsqueda avanzada con múltiples filtros
    advancedSearchPets(filters) {
        return this.pets.filter(pet => {
            // Filtro por nombre de mascota
            if (filters.petName && !pet.name.toLowerCase().includes(filters.petName.toLowerCase())) {
                return false;
            }
            
            // Filtro por propietario
            if (filters.owner && !pet.owner.toLowerCase().includes(filters.owner.toLowerCase())) {
                return false;
            }
            
            // Filtro por tipo de animal
            if (filters.animalType && pet.typeName.toLowerCase() !== filters.animalType.toLowerCase()) {
                return false;
            }
            
            // Filtro por raza
            if (filters.breed && !pet.breed.toLowerCase().includes(filters.breed.toLowerCase())) {
                return false;
            }
            
            // Filtro por rango de edad
            if (filters.minAge !== undefined && filters.minAge !== '' && pet.age < parseInt(filters.minAge)) {
                return false;
            }
            if (filters.maxAge !== undefined && filters.maxAge !== '' && pet.age > parseInt(filters.maxAge)) {
                return false;
            }
            
            // Filtro por familia
            if (filters.family && pet.family && !pet.family.toLowerCase().includes(filters.family.toLowerCase())) {
                return false;
            }
            
            // Filtro por estado de vacunación
            if (filters.vaccinationStatus && filters.vaccinationStatus !== 'all') {
                const isVaccinated = pet.vaccinated === true || pet.vaccinated === 'true';
                if (filters.vaccinationStatus === 'vaccinated' && !isVaccinated) {
                    return false;
                }
                if (filters.vaccinationStatus === 'not_vaccinated' && isVaccinated) {
                    return false;
                }
            }
            
            return true;
        });
    }

    getPetById(id) {
        return this.pets.find(pet => pet.id === id);
    }

    updatePet(id, updatedData) {
        const petIndex = this.pets.findIndex(pet => pet.id === id);
        if (petIndex !== -1) {
            this.pets[petIndex] = { ...this.pets[petIndex], ...updatedData };
            this.saveToStorage(); // Guardar automáticamente
            return this.pets[petIndex];
        }
        return null;
    }

    deletePet(id) {
        const petIndex = this.pets.findIndex(pet => pet.id === id);
        if (petIndex !== -1) {
            const deletedPet = this.pets.splice(petIndex, 1)[0];
            this.saveToStorage(); // Guardar automáticamente
            return deletedPet;
        }
        return null;
    }

    getSystemStats() {
        const stats = {
            totalPets: this.pets.length,
            byType: {},
            byFamily: { domestic: 0, exotic: 0 },
            lastUpdated: new Date().toLocaleString()
        };

        this.pets.forEach(pet => {
            stats.byType[pet.typeName] = (stats.byType[pet.typeName] || 0) + 1;
            stats.byFamily[pet.familyType] = (stats.byFamily[pet.familyType] || 0) + 1;
        });

        return stats;
    }
}

// Inicializar el sistema
    veterinarySystem = VeterinarySystem.getInstance();

// Funciones para manejar el selector de razas dinámico
function updateBreedOptions() {
    const animalTypeSelect = document.getElementById('animal_type');
    const breedSelect = document.getElementById('breed');
    const breedInput = document.getElementById('breed_input');
    
    if (!animalTypeSelect || !breedSelect) {
        console.error('Elementos del selector de razas no encontrados');
        return;
    }
    
    const selectedType = animalTypeSelect.value;
    console.log('Tipo de animal seleccionado:', selectedType);
    
    if (!selectedType) {
        breedSelect.innerHTML = '<option value="">Selecciona una raza</option>';
        return;
    }
    
    const breeds = veterinarySystem.getBreedsByType(selectedType);
    console.log('Razas disponibles:', breeds);
    
    // Limpiar opciones actuales
    breedSelect.innerHTML = '';
    
    // Agregar nuevas opciones
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed;
        breedSelect.appendChild(option);
    });
    
    // Resetear el input manual
    if (breedInput) {
        breedInput.style.display = 'none';
        breedInput.value = '';
    }
    
    // Asegurar que el select esté visible
    breedSelect.style.display = 'block';
}

function getSelectedBreed() {
    console.log('🔍 === GETSELECTEDBREED DEBUGGING ===');
    
    const breedSelect = document.getElementById('breed');
    const breedInput = document.getElementById('breed_input');
    
    console.log('🔍 breedSelect encontrado:', !!breedSelect);
    console.log('🔍 breedInput encontrado:', !!breedInput);
    
    if (!breedSelect) {
        console.error('❌ Elemento breed no encontrado');
        return '';
    }
    
    console.log('🔍 breedSelect.value:', breedSelect.value);
    console.log('🔍 breedSelect.style.display:', breedSelect.style.display);
    
    if (breedInput) {
        console.log('🔍 breedInput.value:', breedInput.value);
        console.log('🔍 breedInput.style.display:', breedInput.style.display);
        console.log('🔍 breedInput.offsetParent:', breedInput.offsetParent);
        
        // Verificar si el input está visible usando múltiples métodos
        const isInputVisible = breedInput.style.display === 'block' || 
                              breedInput.style.display !== 'none' ||
                              breedInput.offsetParent !== null;
        
        console.log('🔍 ¿Input manual visible?:', isInputVisible);
        
        if (isInputVisible && breedInput.value.trim() !== '') {
            console.log('🔍 Usando valor del input manual:', breedInput.value);
            return breedInput.value;
        }
    }
    
    // Usar el valor del select
    const selectedValue = breedSelect.value;
    console.log('🔍 Usando valor del select:', selectedValue);
    
    // Validar que no sea "Escribir manualmente" o vacío
    if (selectedValue === 'Escribir manualmente' || selectedValue === '' || !selectedValue) {
        console.error('❌ Raza inválida:', selectedValue);
        return '';
    }
    
    console.log('🔍 === FIN GETSELECTEDBREED ===');
    return selectedValue;
}

// Funciones de la interfaz
function configureNavigation() {
    console.log('🔗 Configurando navegación...');
    
    // Simple approach: add onclick directly to each link
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('🔗 Enlaces encontrados:', navLinks.length);
    
    navLinks.forEach((link, index) => {
        const sectionId = link.getAttribute('href').substring(1);
        console.log(`  ${index + 1}. ${link.textContent.trim()} -> ${sectionId}`);
        
        // Add onclick directly
        link.onclick = function(e) {
            e.preventDefault();
            console.log('🔗 Click en:', this.textContent.trim());
            showSection(sectionId);
            return false;
        };
    });
    
    console.log('✅ Navegación configurada');
}

function showSection(sectionId) {
    console.log('📄 Mostrando sección:', sectionId);

    // Verificar permisos por sección
    const sectionPermissions = {
        'registro': 'canManagePets',
        'registros': 'canViewAllData',
        'consultas': 'canManageAppointments',
        'citas-medicas': 'canManageAppointments'
    };
    const requiredPermission = sectionPermissions[sectionId];
    if (requiredPermission && (!authSystem || !authSystem.hasPermission(requiredPermission))) {
        showMessage('No tienes permiso para acceder a esta sección', 'error');
        sectionId = 'inicio';
    }
    
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('✅ Sección mostrada:', sectionId);
    } else {
        console.error('❌ Sección no encontrada:', sectionId);
    }
    
    // Actualizar navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}


function registerPet() {
    console.log('=== INICIANDO REGISTRO DE MASCOTA ===');
    
    const form = document.getElementById('registroForm');
    if (!form) {
        console.error('Formulario no encontrado');
        return;
    }
    
    const formData = new FormData(form);
    
    // Debugging detallado de cada campo
    console.log('🔍 === DEBUGGING FORMULARIO ===');
    console.log('🔍 name:', formData.get('name'));
    console.log('🔍 age:', formData.get('age'));
    console.log('🔍 animalType:', formData.get('animalType'));
    console.log('🔍 owner:', formData.get('ownerName'));
    console.log('🔍 phone:', formData.get('ownerPhone'));
    console.log('🔍 email:', formData.get('ownerEmail'));
    
    // Debugging del selector de razas
    const breedSelectElement = document.getElementById('breed');
    const breedInputElement = document.getElementById('breed_input');
    console.log('🔍 breedSelect:', breedSelectElement);
    console.log('🔍 breedSelect.value:', breedSelectElement ? breedSelectElement.value : 'NO ENCONTRADO');
    console.log('🔍 breedInput:', breedInputElement);
    console.log('🔍 breedInput.value:', breedInputElement ? breedInputElement.value : 'NO ENCONTRADO');
    console.log('🔍 breedInput.style.display:', breedInputElement ? breedInputElement.style.display : 'NO ENCONTRADO');
    
    const selectedBreed = getSelectedBreed();
    console.log('🔍 Raza seleccionada por getSelectedBreed():', selectedBreed);
    
    const petData = {
        name: formData.get('name'),
        age: parseInt(formData.get('age')),
        breed: selectedBreed,
        type: formData.get('animalType'),
        owner: formData.get('ownerName'),
        phone: formData.get('ownerPhone'),
        email: formData.get('ownerEmail')
    };
    
    console.log('🔍 === FIN DEBUGGING FORMULARIO ===');
    console.log('Datos del formulario:', petData);
    console.log('Raza obtenida:', petData.breed);
    
    if (!petData.name || !petData.age || !petData.breed || !petData.type || !petData.owner || !petData.phone) {
        console.error('❌ Campos obligatorios faltantes:', {
            name: petData.name,
            age: petData.age,
            breed: petData.breed,
            type: petData.type,
            owner: petData.owner,
            phone: petData.phone
        });
        
        // Crear mensaje específico de campos faltantes
        const camposFaltantes = [];
        if (!petData.name) camposFaltantes.push('Nombre de la mascota');
        if (!petData.age) camposFaltantes.push('Edad');
        if (!petData.breed) camposFaltantes.push('Raza');
        if (!petData.type) camposFaltantes.push('Tipo de animal');
        if (!petData.owner) camposFaltantes.push('Nombre del dueño');
        if (!petData.phone) camposFaltantes.push('Teléfono');
        
        const mensaje = `Campos obligatorios faltantes: ${camposFaltantes.join(', ')}`;
        showMessage(mensaje, 'error');
        return;
    }
    
    // Validar que el nombre del dueño tenga apellido (al menos 2 palabras)
    if (petData.owner && petData.owner.trim().split(' ').length < 2) {
        console.error('❌ Nombre del dueño debe incluir apellido');
        showMessage('El nombre del dueño debe incluir nombre y apellido', 'error');
        return;
    }
    
    // Validar que el teléfono tenga al menos números
    if (petData.phone && !/\d/.test(petData.phone)) {
        console.error('❌ Teléfono debe contener al menos números');
        showMessage('El teléfono debe contener al menos números', 'error');
        return;
    }
    
    if (petData.breed === 'Escribir manualmente' || petData.breed.trim() === '') {
        console.error('❌ Raza inválida:', petData.breed);
        showMessage('Por favor selecciona o escribe una raza válida', 'error');
        return;
    }
    
    // Validación adicional de edad
    if (isNaN(petData.age) || petData.age <= 0) {
        console.error('❌ Edad inválida:', petData.age);
        showMessage('Por favor ingresa una edad válida', 'error');
        return;
    }
    
    console.log('✅ Todos los campos son válidos, procediendo con el registro...');
    
    console.log('Creando mascota con datos válidos...');
    const pet = veterinarySystem.buildPet(
        petData.name,
        petData.age,
        petData.breed,
        petData.type,
        petData.owner,
        {
            phone: petData.phone,
            email: petData.email
        }
    );
    
    console.log('Mascota creada:', pet);
    
    console.log('Registrando mascota en el sistema...');
    veterinarySystem.registerPet(pet);
    
    console.log('Total mascotas después del registro:', veterinarySystem.getAllPets().length);
    
    form.reset();
    
    // Resetear el selector de razas
    const breedSelectReset = document.getElementById('breed');
    const breedInputReset = document.getElementById('breed_input');
    if (breedSelectReset) breedSelectReset.style.display = 'block';
    if (breedInputReset) breedInputReset.style.display = 'none';
    
    showMessage('Mascota registrada exitosamente con ID: ' + pet.id, 'success');
    
    console.log('Actualizando lista de mascotas...');
    updatePetsList();
    showSystemStats();
    
    console.log('=== REGISTRO COMPLETADO ===');
}

function searchPets() {
    const query = document.getElementById('search-input').value.trim();
    if (!query) {
        showMessage('Ingresa un término de búsqueda', 'warning');
        return;
    }
    
    const results = veterinarySystem.searchPets(query);
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const container = document.getElementById('search-results');
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">No se encontraron mascotas con ese término</div>';
        return;
    }
    
    let html = '<div class="results-grid">';
    results.forEach(pet => {
        html += `
            <div class="pet-card">
                <h4>${pet.name}</h4>
                <p><strong>Raza:</strong> ${pet.breed}</p>
                <p><strong>Tipo:</strong> ${pet.typeName}</p>
                <p><strong>Edad:</strong> ${pet.age} años</p>
                <p><strong>Dueño:</strong> ${pet.owner}</p>
                <p><strong>Familia:</strong> ${pet.familyType}</p>
                <p><strong>Estado:</strong> ${pet.status}</p>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function updatePetsList(filterName = null) {
    console.log('🟡 === ACTUALIZANDO LISTA DE MASCOTAS ===');
    const pets = veterinarySystem.getAllPets();
    const container = document.getElementById('petsTableBody');
    
    console.log('🟡 Mascotas obtenidas del sistema:', pets);
    console.log('🟡 Cantidad de mascotas:', pets.length);
    console.log('🟡 Container encontrado:', container);
    
    if (!container) {
        console.error('❌ Container petsTableBody no encontrado');
        return;
    }
    
    if (pets.length === 0) {
        console.log('🟡 No hay mascotas, mostrando mensaje vacío');
        container.innerHTML = '<tr><td colspan="8" class="text-center">No hay mascotas registradas</td></tr>';
        return;
    }
    
    // Aplicar filtro por nombre si corresponde
    let filteredPets = pets;
    const query = filterName !== null ? filterName : (document.getElementById('petSearchInput')?.value || '').trim().toLowerCase();
    if (query) {
        filteredPets = pets.filter(p => (p.name || '').toLowerCase().includes(query));
    }

    console.log('🟡 Generando HTML para', filteredPets.length, 'mascotas');
    let html = '';
    filteredPets.forEach((pet, index) => {
        console.log(`🟡 Procesando mascota ${index + 1}:`, pet);
        html += `
        <tr>
            <td>${pet.id}</td>
            <td>${pet.name}</td>
            <td>${pet.age}</td>
            <td>${pet.breed}</td>
            <td>${pet.typeName}</td>
            <td>${pet.familyType}</td>
            <td>${pet.owner}</td>
            <td>
                <div class="action-buttons">
                    ${authSystem && authSystem.hasPermission('canManagePets') ? `
                        <button onclick="editPet(${pet.id})" class="btn btn-primary btn-sm">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button onclick="clonePet(${pet.id})" class="btn btn-secondary btn-sm">
                            <i class="fas fa-copy"></i> Clonar
                        </button>
                        <button onclick="deletePet(${pet.id})" class="btn btn-danger btn-sm">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    ` : `
                        <span class="text-muted">Sin permisos para acciones</span>
                    `}
                </div>
            </td>
        </tr>
        `;
    });
    
    console.log('🟡 HTML generado:', html);
    container.innerHTML = html;
    console.log('🟡 === LISTA ACTUALIZADA ===');
}

// Buscar por nombre desde la barra con lupa
function filterPetsByName() {
    const input = document.getElementById('petSearchInput');
    const value = (input?.value || '').trim().toLowerCase();
    updatePetsList(value);
}

function editPet(petId) {
    if (!authSystem || !authSystem.hasPermission('canManagePets')) {
        showMessage('No tienes permiso para editar mascotas', 'error');
        return;
    }
    const pet = veterinarySystem.getPetById(petId);
    if (!pet) {
        showMessage('Mascota no encontrada', 'error');
        return;
    }
    
    // Crear formulario de edición
    const editForm = document.createElement('div');
    editForm.className = 'edit-modal';
    editForm.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Editar Mascota: ${pet.name}</h3>
                <button onclick="closeEditModal()" class="close-btn">&times;</button>
            </div>
            <form id="editPetForm" class="edit-form">
                <div class="form-group">
                    <label for="editName">Nombre *</label>
                    <input type="text" id="editName" name="name" value="${pet.name}" required>
                </div>
                <div class="form-group">
                    <label for="editAge">Edad *</label>
                    <input type="number" id="editAge" name="age" value="${pet.age}" required>
                </div>
                <div class="form-group">
                    <label for="editBreed">Raza *</label>
                    <input type="text" id="editBreed" name="breed" value="${pet.breed}" required>
                </div>
                <div class="form-group">
                    <label for="editOwner">Dueño *</label>
                    <input type="text" id="editOwner" name="owner" value="${pet.owner}" required>
                </div>
                <div class="form-group">
                    <label for="editPhone">Teléfono</label>
                    <input type="text" id="editPhone" name="phone" value="${pet.ownerPhone || ''}">
                </div>
                <div class="form-group">
                    <label for="editEmail">Email</label>
                    <input type="email" id="editEmail" name="email" value="${pet.ownerEmail || ''}">
                </div>
                <div class="form-actions">
                    <button type="button" onclick="closeEditModal()" class="btn btn-secondary">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(editForm);
    
    // Manejar envío del formulario
    document.getElementById('editPetForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        const updatedData = {
            name: formData.get('name'),
            age: parseInt(formData.get('age')),
            breed: formData.get('breed'),
            owner: formData.get('owner'),
            ownerPhone: formData.get('phone'),
            ownerEmail: formData.get('email')
        };
        
        if (!authSystem || !authSystem.hasPermission('canManagePets')) {
            showMessage('No tienes permiso para actualizar mascotas', 'error');
            return;
        }
        
        const updatedPet = veterinarySystem.updatePet(petId, updatedData);
        if (updatedPet) {
            showMessage('Mascota actualizada exitosamente', 'success');
            updatePetsList();
            showSystemStats();
            closeEditModal();
        } else {
            showMessage('Error al actualizar la mascota', 'error');
        }
    });
}

// Variable global para almacenar el ID de la mascota a eliminar

function deletePet(petId) {
    if (!authSystem || !authSystem.hasPermission('canManagePets')) {
        showMessage('No tienes permiso para eliminar mascotas', 'error');
        return;
    }
    const pet = veterinarySystem.getPetById(petId);
    if (!pet) {
        showMessage('Mascota no encontrada', 'error');
        return;
    }
    
    // Almacenar el ID para confirmación posterior
    petToDelete = petId;
    
    // Mostrar información de la mascota en el modal
    document.getElementById('deletePetName').textContent = pet.name;
    document.getElementById('deletePetOwner').textContent = pet.owner;
    
    // Mostrar el modal
    document.getElementById('deleteModal').style.display = 'flex';
}

function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    petToDelete = null;
}

function confirmDelete() {
    if (!authSystem || !authSystem.hasPermission('canManagePets')) {
        showMessage('No tienes permiso para eliminar mascotas', 'error');
        closeDeleteModal();
        return;
    }
    if (petToDelete) {
        const deletedPet = veterinarySystem.deletePet(petToDelete);
        if (deletedPet) {
            showMessage(`Mascota ${deletedPet.name} eliminada exitosamente`, 'success');
            updatePetsList();
            showSystemStats();
        } else {
            showMessage('Error al eliminar la mascota', 'error');
        }
        closeDeleteModal();
    }
}

function closeEditModal() {
    const modal = document.querySelector('.edit-modal');
    if (modal) {
        modal.remove();
    }
}

function clonePet(petId) {
    if (!authSystem || !authSystem.hasPermission('canManagePets')) {
        showMessage('No tienes permiso para clonar mascotas', 'error');
        return;
    }
    const originalPet = veterinarySystem.getPetById(petId);
    if (!originalPet) {
        showMessage('Mascota no encontrada', 'error');
        return;
    }
    
    const newName = prompt('Ingresa el nuevo nombre para la mascota clonada:', originalPet.name + ' Jr');
    if (!newName) return;
    
    const clonedPet = veterinarySystem.clonePet(originalPet, newName);
    veterinarySystem.registerPet(clonedPet);
    
    showMessage('Mascota clonada exitosamente: ' + clonedPet.name, 'success');
    updatePetsList();
}

function showSystemStats() {
    console.log('🟢 === MOSTRANDO ESTADÍSTICAS ===');
    const stats = veterinarySystem.getSystemStats();
    console.log('🟢 Estadísticas obtenidas:', stats);
    
    // Update individual stat elements
    const totalPetsElement = document.getElementById('totalPets');
    if (totalPetsElement) {
        totalPetsElement.textContent = stats.totalPets;
        console.log('✅ Total mascotas actualizado:', stats.totalPets);
    } else {
        console.error('❌ Elemento totalPets no encontrado');
    }
    
    console.log('🟢 Estadísticas actualizadas correctamente');
}

function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Agregar al DOM
    document.body.appendChild(messageDiv);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

