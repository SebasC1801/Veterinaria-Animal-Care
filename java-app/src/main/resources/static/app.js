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
                canRegisterPets: true,
                canManageAppointments: true,
                canSetAppointmentPriority: true,
                canDeletePets: true,
                canViewAllData: true,
                canManageSystem: true
            },
            user: {
                canManageUsers: false,
                canManagePets: false,
                canRegisterPets: true,
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

    updateConsultation(id, consultationData) {
        const consultation = this.getConsultationById(id);
        if (!consultation) {
            throw new Error('Consulta no encontrada');
        }

        // Validar campos requeridos
        if (!consultationData.date || !consultationData.time || !consultationData.reason || 
            !consultationData.description || !consultationData.veterinarian) {
            throw new Error('Todos los campos obligatorios deben ser completados');
        }

        // Actualizar campos
        if (consultationData.petId) {
            consultation.petId = parseInt(consultationData.petId, 10);
        }
        consultation.date = consultationData.date;
        consultation.time = consultationData.time;
        consultation.reason = consultationData.reason;
        consultation.description = consultationData.description;
        consultation.veterinarian = consultationData.veterinarian;
        consultation.priority = consultationData.priority || consultation.priority;
        consultation.status = consultationData.status || consultation.status;
        // Campos específicos de consulta
        consultation.diagnosis = consultationData.diagnosis || consultation.diagnosis || '';
        consultation.treatment = consultationData.treatment || consultation.treatment || '';
        consultation.notes = consultationData.notes || consultation.notes || '';
        consultation.updatedAt = new Date().toISOString();

        this.saveToStorage();
        return consultation;
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

    const permissionsBySection = {
        'registro': 'canRegisterPets',
        'registros': 'canViewAllData',
        'consultas': 'canManageAppointments',
        'citas-medicas': 'canManageAppointments'
    };

    const currentUser = authSystem && authSystem.getCurrentUser ? authSystem.getCurrentUser() : null;
    const currentRole = currentUser ? currentUser.role : null;

    // Configurar enlaces de navegación y ocultar los no permitidos
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('🔗 Enlaces encontrados:', navLinks.length);

    navLinks.forEach((link, index) => {
        const sectionId = link.getAttribute('href').substring(1);
        console.log(`  ${index + 1}. ${link.textContent.trim()} -> ${sectionId}`);

        const required = permissionsBySection[sectionId];
        const allowed = !required || (authSystem && authSystem.hasPermission(required));
        // Ocultar si no está permitido (Inicio siempre visible al no tener permiso asignado)
        link.style.display = allowed ? '' : 'none';

        link.onclick = function(e) {
            e.preventDefault();
            if (!allowed) return false;
            console.log('🔗 Click en:', this.textContent.trim());
            showSection(sectionId);
            return false;
        };
    });

    // Configurar interacciones de tarjetas en Inicio según rol
    const featureItems = document.querySelectorAll('.description-features .feature-item');
    if (featureItems.length && currentRole === 'user') {
        ensureFeatureInfoModal();
        featureItems.forEach(item => {
            const titleEl = item.querySelector('.feature-content h3');
            const title = titleEl ? titleEl.textContent.trim() : '';
            if (title === 'Registro de Mascotas') {
                item.onclick = function(e) {
                    e.preventDefault();
                    showSection('registro');
                };
            } else {
                item.onclick = function(e) {
                    e.preventDefault();
                    const info = getFeatureInfoData(title);
                    showFeatureInfoModal(info);
                };
            }
        });
    }

    console.log('✅ Navegación configurada');
}

function showSection(sectionId) {
    console.log('📄 Mostrando sección:', sectionId);

    // Verificar permisos por sección
    const sectionPermissions = {
        'registro': 'canRegisterPets',
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

    // Renderizar contenido específico de la sección para asegurar botones de edición operativos
    try {
        if (sectionId === 'citas-medicas') {
            updateAppointmentStats();
            renderAppointmentsList();
        }
    } catch (e) {
        console.error('Error al actualizar la sección', sectionId, e);
    }
}

// ====== SECCIONES: Citas y Consultas ======
function showAppointmentsSection() {
    // Gating por permisos
    if (!authSystem || !authSystem.hasPermission('canManageAppointments')) {
        const info = getFeatureInfoData('Citas Médicas');
        showFeatureInfoModal(info);
        return;
    }
    showSection('citas-medicas');
    // Actualizar estadísticas y listado al entrar
    updateAppointmentStats();
    renderAppointmentsList();
}

// Se eliminaron las vistas independientes de "consultas"; todo se gestiona en citas médicas

// ====== Citas Médicas (usa datos de ConsultationSystem) ======
function renderAppointmentsList(filtered = null) {
    const tbody = document.getElementById('appointmentsTableBody');
    if (!tbody) return;
    const data = filtered || (consultationSystem ? consultationSystem.getConsultations() : []);
    tbody.innerHTML = '';
    if (!data.length) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 10;
        td.className = 'text-center';
        td.textContent = 'No hay citas programadas';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }
    data.forEach(c => {
        const pet = veterinarySystem ? veterinarySystem.getPetById(c.petId) : null;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.id}</td>
            <td>${pet?.name || '-'}</td>
            <td>${pet?.owner?.name || '-'}</td>
            <td>${c.date || '-'}</td>
            <td>${c.time || '-'}</td>
            <td>${c.veterinarian || '-'}</td>
            <td>${c.reason || '-'}</td>
            <td>${c.priority || 'normal'}</td>
            <td class="cell-edit-status" data-appointment-id="${c.id}" tabindex="0" title="Editar estado">
                ${({scheduled:'Programada',confirmed:'Confirmada',completed:'Completada',cancelled:'Cancelada'})[c.status] || (c.status || 'scheduled')}
            </td>
            <td>
                <button type="button" class="btn btn-outline btn-edit-appointment" data-appointment-id="${c.id}" aria-label="Editar cita ${c.id}"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" onclick="deleteConsultation(${c.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tr.dataset.appointmentId = String(c.id);
        tbody.appendChild(tr);
    });

    // Asegurar delegación de eventos por si falla el inline onclick
    attachAppointmentTableDelegates();
    // Delegación para celdas de estado
    attachStatusCellDelegates();
}

function applyFilters() {
    const status = document.getElementById('filterStatus')?.value || '';
    const vet = document.getElementById('filterVet')?.value || '';
    const all = consultationSystem ? consultationSystem.getConsultations() : [];
    const filtered = all.filter(c => {
        const statusOk = !status || (c.status === status);
        const vetOk = !vet || (c.veterinarian === vet);
        return statusOk && vetOk;
    });
    renderAppointmentsList(filtered);
}

function updateAppointmentStats() {
    const all = consultationSystem ? consultationSystem.getConsultations() : [];
    const totalEl = document.getElementById('totalAppointments');
    const pendingEl = document.getElementById('pendingAppointments');
    const completedEl = document.getElementById('completedAppointments');
    const urgentEl = document.getElementById('urgentAppointments');
    if (totalEl) totalEl.textContent = all.length;
    if (pendingEl) pendingEl.textContent = all.filter(c => c.status === 'scheduled').length;
    if (completedEl) completedEl.textContent = all.filter(c => c.status === 'completed').length;
    if (urgentEl) urgentEl.textContent = all.filter(c => c.priority === 'urgent').length;
}

function openEditAppointmentModal(id) {
    try {
        if (typeof hideFeatureInfoModal === 'function') hideFeatureInfoModal();
        const parsedId = parseInt(id, 10);
        const finalId = isNaN(parsedId) ? id : parsedId;
        if (!consultationSystem) {
            showMessage('Sistema de consultas no disponible', 'error');
            return;
        }
        const consultation = consultationSystem.getConsultationById(finalId);
        if (!consultation) {
            showMessage('Cita no encontrada', 'error');
            return;
        }

        // Construye el modal si no existe
        ensureEditAppointmentModal();
        const modal = document.getElementById('editAppointmentModal');
        const form = document.getElementById('editAppointmentForm');
        if (!modal || !form) {
            showMessage('No se pudo abrir el editor de cita', 'error');
            return;
        }
        modal.dataset.dirty = 'false';
        modal.dataset.appointmentId = String(finalId);

        // Información de mascota y propietario
        const pet = veterinarySystem ? veterinarySystem.getPetById(consultation.petId) : null;
        const petName = pet ? pet.name : 'Mascota no encontrada';
        const ownerName = pet && pet.owner ? pet.owner.name : 'Propietario no encontrado';
        const ownerInput = document.getElementById('editAppointmentOwnerName');
        if (ownerInput) ownerInput.value = ownerName;
        // El modal estático no incluye un campo de nombre de mascota independiente; se refleja en el selector

        // Poblar selector de mascota
        populateEditPetSelector(consultation.petId);

        // Campos principales
        document.getElementById('editAppointmentDate').value = consultation.date || '';
        document.getElementById('editAppointmentTime').value = consultation.time || '';
        document.getElementById('editAppointmentReason').value = consultation.reason || '';
        document.getElementById('editAppointmentDescription').value = consultation.description || '';
        document.getElementById('editAppointmentVeterinarian').value = consultation.veterinarian || '';
        document.getElementById('editAppointmentPriority').value = consultation.priority || 'normal';
        document.getElementById('editAppointmentStatus').value = consultation.status || 'scheduled';

        // Campos clínicos (consultas)
        const diag = document.getElementById('editConsultationDiagnosis');
        const treat = document.getElementById('editConsultationTreatment');
        const notes = document.getElementById('editConsultationNotes');
        if (diag) diag.value = consultation.diagnosis || '';
        if (treat) treat.value = consultation.treatment || '';
        if (notes) notes.value = consultation.notes || '';

        // Mostrar modal y accesibilidad
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const first = form.querySelector('select, input, textarea, button');
            if (first) first.focus();
        }, 0);
        setupEditModalInteractions();
        setupModalClickOutside();
    } catch (err) {
        console.error('Error al abrir el modal de edición:', err);
        showMessage('No se pudo abrir el editor de cita', 'error');
    }
}

function closeEditAppointmentModal() {
    const modal = document.getElementById('editAppointmentModal');
    if (!modal) return;
    const isDirty = modal.dataset.dirty === 'true';
    if (isDirty) {
        const confirmClose = window.confirm('Hay cambios sin guardar. ¿Desea descartarlos?');
        if (!confirmClose) return;
    }
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    delete modal.dataset.appointmentId;
    // Limpiar el formulario
    const form = document.getElementById('editAppointmentForm');
    if (form) form.reset();
}

// Kill-switch: desactiva cualquier overlay/modal/backdrop activo que pueda bloquear la UI
function killActiveBackdrops() {
    try {
        const selectors = ['.modal', '.modal-backdrop', '[class*="backdrop"]', '[class*="overlay"]'];
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.style.display = 'none';
                el.setAttribute('aria-hidden', 'true');
            });
        });
        document.body.style.pointerEvents = 'auto';
        document.body.style.overflow = '';
    } catch (_) { /* noop */ }
}

// Función para cerrar el modal al hacer clic fuera de él
function setupModalClickOutside() {
    const modal = document.getElementById('editAppointmentModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeEditAppointmentModal();
            }
        });
    }
}

// Construye el modal de edición si no existe (responsive y a pantalla completa)
function ensureEditAppointmentModal() {
    if (document.getElementById('editAppointmentModal')) return;
    const overlay = document.createElement('div');
    overlay.id = 'editAppointmentModal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'none';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '1000';

    const container = document.createElement('div');
    container.style.background = '#fff';
    container.style.width = '95%';
    container.style.maxWidth = '1000px';
    container.style.maxHeight = '90vh';
    container.style.overflow = 'auto';
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    container.style.padding = '16px';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';

    const title = document.createElement('h2');
    title.textContent = 'Editar cita / consulta';
    title.id = 'editAppointmentModalTitle';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Cerrar';
    closeBtn.className = 'btn';
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeEditAppointmentModal();
    });

    header.appendChild(title);
    header.appendChild(closeBtn);

    const form = document.createElement('form');
    form.id = 'editAppointmentForm';
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveAppointmentEdit();
    });

    // Grid responsive
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))';
    grid.style.gap = '12px';

    // Selector de mascota
    grid.appendChild(buildLabeledSelect('Mascota', 'editAppointmentPet'));
    // Nombre de mascota (solo lectura, para consistencia visual)
    const petNameWrap = buildLabeledText('Nombre de mascota', 'editAppointmentPetName');
    grid.appendChild(petNameWrap);
    // Propietario (solo lectura)
    grid.appendChild(buildLabeledText('Propietario', 'editAppointmentOwnerName'));
    // Fecha y Hora
    grid.appendChild(buildLabeledInput('Fecha', 'editAppointmentDate', 'date', true));
    grid.appendChild(buildLabeledInput('Hora', 'editAppointmentTime', 'time', true));
    // Veterinario y prioridad
    grid.appendChild(buildLabeledInput('Veterinario', 'editAppointmentVeterinarian', 'text', true));
    grid.appendChild(buildLabeledSelect('Prioridad', 'editAppointmentPriority', [
        {value:'low', label:'Baja'},
        {value:'normal', label:'Normal'},
        {value:'high', label:'Alta'}
    ]));
    // Estado
    grid.appendChild(buildLabeledSelect('Estado', 'editAppointmentStatus', [
        {value:'scheduled', label:'Pendiente'},
        {value:'confirmed', label:'Confirmada'},
        {value:'cancelled', label:'Cancelada'},
        {value:'completed', label:'Completada'}
    ]));
    // Motivo y descripción
    grid.appendChild(buildLabeledInput('Motivo', 'editAppointmentReason', 'text', true));
    grid.appendChild(buildLabeledTextarea('Descripción', 'editAppointmentDescription', true));
    // Campos clínicos (consultas)
    grid.appendChild(buildLabeledInput('Diagnóstico', 'editAppointmentDiagnosis', 'text'));
    grid.appendChild(buildLabeledInput('Tratamiento', 'editAppointmentTreatment', 'text'));
    grid.appendChild(buildLabeledTextarea('Observaciones', 'editAppointmentNotes'));

    form.appendChild(grid);

    // Footer de acciones
    const footer = document.createElement('div');
    footer.style.display = 'flex';
    footer.style.justifyContent = 'flex-end';
    footer.style.gap = '8px';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.addEventListener('click', () => closeEditAppointmentModal());

    const saveBtn = document.createElement('button');
    saveBtn.type = 'submit';
    saveBtn.className = 'btn btn-primary';
    saveBtn.textContent = 'Guardar cambios';

    footer.appendChild(cancelBtn);
    footer.appendChild(saveBtn);

    container.appendChild(header);
    container.appendChild(form);
    container.appendChild(footer);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // Accesibilidad: cerrar con Escape
    overlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeEditAppointmentModal();
    });
}

// Inicia flujo de nueva cita médica reutilizando el editor unificado
function scheduleNewAppointment() {
    try {
        if (!authSystem || !authSystem.hasPermission('canManageAppointments')) {
            const info = getFeatureInfoData('Citas Médicas');
            showFeatureInfoModal(info);
            return;
        }
        ensureEditAppointmentModal();
        const modal = document.getElementById('editAppointmentModal');
        const form = document.getElementById('editAppointmentForm');
        if (!modal || !form) {
            showMessage('No se pudo abrir el editor de cita', 'error');
            return;
        }
        // Estado del modal para nueva cita
        delete modal.dataset.appointmentId;
        modal.dataset.dirty = 'false';
        const title = document.getElementById('editAppointmentModalTitle');
        if (title) title.textContent = 'Nueva cita médica';

        // Limpiar y poblar campos
        form.reset();
        populateEditPetSelector(null);
        document.getElementById('editAppointmentPriority').value = 'normal';
        document.getElementById('editAppointmentStatus').value = 'scheduled';

        // Mostrar modal
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const first = form.querySelector('select, input, textarea, button');
            if (first) first.focus();
        }, 0);
        setupEditModalInteractions();
        setupModalClickOutside();
        setupRealtimeValidation();
    } catch (err) {
        console.error('Error al iniciar nueva cita:', err);
        showMessage('No se pudo iniciar el agendamiento', 'error');
    }
}

// Validaciones en tiempo real para evitar datos inválidos
function setupRealtimeValidation() {
    const dateEl = document.getElementById('editAppointmentDate');
    const timeEl = document.getElementById('editAppointmentTime');
    const vetEl = document.getElementById('editAppointmentVeterinarian');
    const reasonEl = document.getElementById('editAppointmentReason');
    const descEl = document.getElementById('editAppointmentDescription');
    const petSel = document.getElementById('editAppointmentPet');

    const validateDateTime = () => {
        const d = dateEl?.value;
        const t = timeEl?.value;
        if (!d || !t) return; // requerido ya lo maneja checkValidity
        const dt = new Date(`${d}T${t}`);
        const now = new Date();
        if (dt < now) {
            dateEl.setCustomValidity('Fecha/Hora no puede ser pasada');
            timeEl.setCustomValidity('Fecha/Hora no puede ser pasada');
        } else {
            dateEl.setCustomValidity('');
            timeEl.setCustomValidity('');
        }
    };

    [dateEl, timeEl].forEach(el => el && el.addEventListener('input', () => {
        validateDateTime();
        el.reportValidity();
    }));

    const requireText = (el) => {
        if (!el) return;
        el.addEventListener('input', () => {
            if (el.value && el.value.trim().length > 0) {
                el.setCustomValidity('');
            } else {
                el.setCustomValidity('Campo requerido');
            }
            el.reportValidity();
        });
    };
    requireText(vetEl);
    requireText(reasonEl);
    requireText(descEl);

    if (petSel) {
        petSel.addEventListener('change', () => {
            if (!petSel.value) {
                petSel.setCustomValidity('Seleccione una mascota');
            } else {
                petSel.setCustomValidity('');
            }
            petSel.reportValidity();
        });
    }
}

function buildLabeledInput(label, id, type = 'text', required = false) {
    const wrap = document.createElement('label');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.gap = '4px';
    wrap.textContent = label;
    const input = document.createElement('input');
    input.id = id;
    input.type = type;
    if (required) input.required = true;
    input.addEventListener('input', markModalDirty);
    wrap.appendChild(input);
    return wrap;
}

function buildLabeledTextarea(label, id, required = false) {
    const wrap = document.createElement('label');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.gap = '4px';
    wrap.textContent = label;
    const ta = document.createElement('textarea');
    ta.id = id;
    ta.rows = 3;
    if (required) ta.required = true;
    ta.addEventListener('input', markModalDirty);
    wrap.appendChild(ta);
    return wrap;
}

function buildLabeledSelect(label, id, options = null) {
    const wrap = document.createElement('label');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.gap = '4px';
    wrap.textContent = label;
    const sel = document.createElement('select');
    sel.id = id;
    sel.addEventListener('change', markModalDirty);
    if (Array.isArray(options)) {
        options.forEach(opt => {
            const o = document.createElement('option');
            o.value = opt.value;
            o.textContent = opt.label;
            sel.appendChild(o);
        });
    }
    wrap.appendChild(sel);
    return wrap;
}

function buildLabeledText(label, id) {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    const cap = document.createElement('span');
    cap.textContent = label;
    const text = document.createElement('div');
    text.id = id;
    text.setAttribute('aria-live', 'polite');
    text.style.padding = '8px';
    text.style.background = '#f5f5f5';
    text.style.borderRadius = '4px';
    wrap.appendChild(cap);
    wrap.appendChild(text);
    return wrap;
}

function markModalDirty() {
    const modal = document.getElementById('editAppointmentModal');
    if (modal) modal.dataset.dirty = 'true';
}

function setupEditModalInteractions() {
    const petSel = document.getElementById('editAppointmentPet');
    if (petSel) {
        petSel.addEventListener('change', () => {
            const petId = parseInt(petSel.value, 10);
            const pet = veterinarySystem ? veterinarySystem.getPetById(petId) : null;
            const ownerInput = document.getElementById('editAppointmentOwnerName');
            if (ownerInput) ownerInput.value = pet?.owner?.name || '';
        });
    }
}

function populateEditPetSelector(selectedPetId = null) {
    const sel = document.getElementById('editAppointmentPet');
    if (!sel) return;
    sel.innerHTML = '';
    const pets = veterinarySystem ? veterinarySystem.getAllPets() : [];
    pets.forEach(p => {
        const opt = document.createElement('option');
        opt.value = String(p.id);
        opt.textContent = `${p.name} (${p.type} - ${p.breed || '-'})`;
        if (selectedPetId && p.id === selectedPetId) opt.selected = true;
        sel.appendChild(opt);
    });
    // Actualizar el propietario mostrado según la selección inicial
    const ownerInput = document.getElementById('editAppointmentOwnerName');
    if (ownerInput) {
        const petId = parseInt(sel.value, 10);
        const pet = veterinarySystem ? veterinarySystem.getPetById(petId) : null;
        ownerInput.value = pet?.owner?.name || '';
    }
}

// Delegación segura para botones de edición en la tabla
function attachAppointmentTableDelegates() {
    const tbody = document.getElementById('appointmentsTableBody');
    if (!tbody || tbody._editDelegatesAttached) return;
    tbody.addEventListener('click', (e) => {
        const btn = e.target.closest('button.btn-edit-appointment');
        if (!btn) return;
        const tr = btn.closest('tr');
        const idText = btn.dataset.appointmentId || tr?.dataset?.appointmentId || tr?.querySelector('td')?.textContent;
        const id = parseInt(idText, 10);
        if (!isNaN(id)) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Click editar capturado (cita):', id);
            // Guardar contra reentrada en menos de 300ms
            const now = Date.now();
            if (!tbody._lastEditTs || (now - tbody._lastEditTs) > 300) {
                tbody._lastEditTs = now;
                killActiveBackdrops();
                requestAnimationFrame(() => openEditAppointmentModal(id));
            }
        }
    });
    tbody._editDelegatesAttached = true;
}

// Delegación para botones de edición en la lista de consultas
function attachConsultationTableDelegates() {
    const tbody = document.getElementById('consultationsTableBody');
    if (!tbody || tbody._editDelegatesAttached) return;
    tbody.addEventListener('click', (e) => {
        const btn = e.target.closest('button.btn-edit-appointment');
        if (!btn) return;
        const tr = btn.closest('tr');
        const idText = btn.dataset.appointmentId || tr?.dataset?.appointmentId || tr?.querySelector('td')?.textContent;
        const id = parseInt(idText, 10);
        if (!isNaN(id)) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Click editar capturado (consulta):', id);
            const now = Date.now();
            if (!tbody._lastEditTs || (now - tbody._lastEditTs) > 300) {
                tbody._lastEditTs = now;
                killActiveBackdrops();
                requestAnimationFrame(() => openEditAppointmentModal(id));
            }
        }
    });
    tbody._editDelegatesAttached = true;
}

// Delegación para celdas de estado en ambas tablas
function attachStatusCellDelegates() {
    const bindStatusDelegates = (tbodyId) => {
        const tbody = document.getElementById(tbodyId);
        if (!tbody || tbody._statusDelegatesAttached) return;
        tbody.addEventListener('click', (e) => {
            const statusCell = e.target.closest('.cell-edit-status');
            if (!statusCell) return;
            const tr = statusCell.closest('tr');
            const idText = tr?.dataset?.appointmentId || tr?.querySelector('td')?.textContent || statusCell?.dataset?.appointmentId;
            const id = parseInt(idText, 10);
            if (!isNaN(id)) {
                e.preventDefault();
                e.stopPropagation();
                killActiveBackdrops();
                requestAnimationFrame(() => {
                    openEditAppointmentModal(id);
                    setTimeout(() => document.getElementById('editAppointmentStatus')?.focus(), 0);
                });
            }
        });
        tbody.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const statusCell = e.target.closest('.cell-edit-status');
            if (!statusCell) return;
            const tr = statusCell.closest('tr');
            const idText = tr?.dataset?.appointmentId || tr?.querySelector('td')?.textContent || statusCell?.dataset?.appointmentId;
            const id = parseInt(idText, 10);
            if (!isNaN(id)) {
                e.preventDefault();
                e.stopPropagation();
                killActiveBackdrops();
                requestAnimationFrame(() => {
                    openEditAppointmentModal(id);
                    setTimeout(() => document.getElementById('editAppointmentStatus')?.focus(), 0);
                });
            }
        });
        tbody._statusDelegatesAttached = true;
    };
    bindStatusDelegates('appointmentsTableBody');
    bindStatusDelegates('consultationsTableBody');
}

function saveAppointmentEdit() {
    const modal = document.getElementById('editAppointmentModal');
    if (!modal) return;
    
    const parsedId = modal.dataset.appointmentId ? parseInt(modal.dataset.appointmentId, 10) : NaN;

    // Validar formulario
    const form = document.getElementById('editAppointmentForm');
    if (!form || !form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Obtener datos del formulario (cita/consulta)
    const consultationData = {
        petId: parseInt(document.getElementById('editAppointmentPet')?.value || '0', 10) || undefined,
        date: document.getElementById('editAppointmentDate').value,
        time: document.getElementById('editAppointmentTime').value,
        reason: document.getElementById('editAppointmentReason').value,
        description: document.getElementById('editAppointmentDescription').value,
        veterinarian: document.getElementById('editAppointmentVeterinarian').value,
        priority: document.getElementById('editAppointmentPriority').value,
        status: document.getElementById('editAppointmentStatus').value,
        diagnosis: document.getElementById('editAppointmentDiagnosis')?.value || '',
        treatment: document.getElementById('editAppointmentTreatment')?.value || '',
        notes: document.getElementById('editAppointmentNotes')?.value || ''
    };

    try {
        if (!consultationSystem) {
            showMessage('Sistema de consultas no disponible', 'error');
            return;
        }
        
        if (!isNaN(parsedId)) {
            // Actualizar existente
            consultationSystem.updateConsultation(parsedId, consultationData);
            showMessage('Cita médica actualizada correctamente', 'success');
        } else {
            // Crear nueva
            const created = consultationSystem.createConsultation(consultationData);
            showMessage(`Cita #${created.id} creada correctamente`, 'success');
        }
        closeEditAppointmentModal();
        renderAppointmentsList();
        updateAppointmentStats();
    } catch (e) {
        console.error('Error al actualizar la cita:', e);
        showMessage(e.message || 'Error al actualizar la cita', 'error');
    }
}

// ====== Consultas (lista y formulario) ======
function renderConsultationsList() {
    const tbody = document.getElementById('consultationsTableBody');
    if (!tbody) return;
    const data = consultationSystem ? consultationSystem.getConsultations() : [];
    tbody.innerHTML = '';
    if (!data.length) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 9;
        td.className = 'text-center';
        td.textContent = 'No hay consultas programadas';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }
    data.forEach(c => {
        const pet = veterinarySystem ? veterinarySystem.getPetById(c.petId) : null;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.id}</td>
            <td>${pet?.name || '-'}</td>
            <td>${pet?.owner?.name || '-'}</td>
            <td>${c.date || '-'}</td>
            <td>${c.time || '-'}</td>
            <td>${c.veterinarian || '-'}</td>
            <td>${c.reason || '-'}</td>
            <td class="cell-edit-status" data-appointment-id="${c.id}" tabindex="0" title="Editar estado">
                ${({scheduled:'Programada',confirmed:'Confirmada',completed:'Completada',cancelled:'Cancelada'})[c.status] || (c.status || 'scheduled')}
            </td>
            <td>
                <button type="button" class="btn btn-outline btn-edit-appointment" data-appointment-id="${c.id}" aria-label="Editar consulta ${c.id}"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" onclick="deleteConsultation(${c.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tr.dataset.appointmentId = String(c.id);
        tbody.appendChild(tr);
    });

    // Asegurar delegación segura para edición
    attachConsultationTableDelegates();
    // Delegación para celdas de estado
    attachStatusCellDelegates();
}

function deleteConsultation(id) {
    try {
        if (!authSystem || !authSystem.hasPermission('canManageAppointments')) {
            showMessage('No tienes permiso para eliminar consultas', 'error');
            return;
        }
        if (consultationSystem) consultationSystem.deleteConsultation(id);
        showMessage('Consulta eliminada', 'success');
        renderConsultationsList();
        renderAppointmentsList();
        updateAppointmentStats();
    } catch (e) {
        showMessage('Error al eliminar consulta', 'error');
    }
}

function populateConsultationPets() {
    const petSelect = document.getElementById('consultationPet');
    const ownerInput = document.getElementById('consultationOwner');
    if (!petSelect) return;
    const pets = veterinarySystem ? veterinarySystem.getAllPets() : [];
    petSelect.innerHTML = '<option value="">Selecciona una mascota</option>';
    pets.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.name} (${p.owner?.name || 'Sin dueño'})`;
        petSelect.appendChild(opt);
    });
    petSelect.onchange = () => {
        const id = parseInt(petSelect.value, 10);
        const pet = veterinarySystem ? veterinarySystem.getPetById(id) : null;
        if (ownerInput) ownerInput.value = pet?.owner?.name || '';
    };
}

// Quick entry desde la tarjeta de inicio
function showQuickConsultationModal() {
    if (!authSystem || !authSystem.hasPermission('canManageAppointments')) {
        const info = getFeatureInfoData('Citas Médicas');
        showFeatureInfoModal(info);
        return;
    }
    // Llevar a citas médicas y abrir el editor para crear nueva cita
    showSection('citas-medicas');
    scheduleNewAppointment();
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

// Eliminada funcionalidad de clonado de mascotas

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

function updateUserInfo() {
    try {
        const infoContainer = document.getElementById('userInfo') || document.querySelector('.banner-user-info');
        const nameEl = document.getElementById('userName');
        const roleEl = document.getElementById('userRole');
        const current = authSystem && authSystem.getCurrentUser ? authSystem.getCurrentUser() : null;
        if (!infoContainer || !nameEl || !roleEl) return;
        if (current) {
            nameEl.textContent = current.name || '';
            roleEl.textContent = (authSystem && authSystem.getRoleDisplayName) ? authSystem.getRoleDisplayName(current.role) : (current.role || '');
            infoContainer.classList.add('visible');
        } else {
            nameEl.textContent = '';
            roleEl.textContent = '';
            infoContainer.classList.remove('visible');
        }
    } catch (e) {
        console.error('Error actualizando info de usuario en banner:', e);
    }
}

// ====== AUTH HANDLERS & UI INIT ======
function showRegisterForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'block';
}

function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.style.display = 'none';
    if (loginForm) loginForm.style.display = 'block';
}

function handleRegister(event) {
    event.preventDefault();
    try {
        const userData = {
            name: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value,
            confirmPassword: document.getElementById('registerConfirmPassword').value,
            role: document.getElementById('registerRole').value,
            phone: document.getElementById('registerPhone').value
        };
        if (!authSystem) authSystem = new AuthenticationSystem();
        const newUser = authSystem.registerUser(userData);
        showMessage('Cuenta creada para ' + newUser.name, 'success');
        showLoginForm();
        const loginEmailEl = document.getElementById('loginEmail');
        const loginRoleEl = document.getElementById('loginRole');
        const loginPasswordEl = document.getElementById('loginPassword');
        if (loginEmailEl) loginEmailEl.value = newUser.email;
        if (loginRoleEl) loginRoleEl.value = newUser.role;
        if (loginPasswordEl) loginPasswordEl.focus();
    } catch (error) {
        showMessage(error.message || 'Error al registrar', 'error');
    }
}

function handleLogin(event) {
    event.preventDefault();
    try {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const role = document.getElementById('loginRole').value;
        if (!authSystem) authSystem = new AuthenticationSystem();
        const user = authSystem.loginUser(email, password, role);
        showMessage('Bienvenido ' + user.name + ' (' + authSystem.getRoleDisplayName(user.role) + ')', 'success');
        // Show main UI
        const authContainer = document.getElementById('authContainer');
        const header = document.getElementById('mainHeader');
        const main = document.getElementById('mainContent');
        if (authContainer) authContainer.style.display = 'none';
        if (header) header.style.display = 'block';
        if (main) main.style.display = 'block';

        applyHeaderOffset();
        setupMobileMenuHandlers();
        configureNavigation();
        updateUserInfo();
        const nextSection = (user.role === 'user') ? 'registro' : 'inicio';
        showSection(nextSection);
        updatePetsList();
        showSystemStats();
    } catch (error) {
        showMessage(error.message || 'Credenciales incorrectas', 'error');
    }
}

function logout() {
    if (authSystem) {
        authSystem.logout();
    }
    // Reset UI to auth
    const authContainer = document.getElementById('authContainer');
    const header = document.getElementById('mainHeader');
    const main = document.getElementById('mainContent');
    if (authContainer) authContainer.style.display = 'block';
    if (header) header.style.display = 'none';
    if (main) main.style.display = 'none';
    showLoginForm();
    showMessage('Sesión cerrada', 'info');
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize systems
    try {
        authSystem = new AuthenticationSystem();
    } catch (e) {
        console.error('Error inicializando auth:', e);
    }
    try {
        consultationSystem = new ConsultationSystem();
    } catch (e) {
        console.error('Error inicializando consultas:', e);
    }
    try {
        veterinarySystem = VeterinarySystem.getInstance();
    } catch (e) {
        console.error('Error inicializando sistema veterinario:', e);
    }

    applyHeaderOffset();
    setupMobileMenuHandlers();
    initializeRegistrationWizard();
    configureNavigation();
    setupModalClickOutside();

    // Wire up envío del formulario de consultas
    const consultationForm = document.getElementById('consultationFormElement');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!authSystem || !authSystem.hasPermission('canManageAppointments')) {
                showMessage('No tienes permiso para crear consultas', 'error');
                return;
            }
            try {
                const petId = parseInt(document.getElementById('consultationPet').value, 10);
                const data = {
                    petId,
                    date: document.getElementById('consultationDate').value,
                    time: document.getElementById('consultationTime').value,
                    veterinarian: document.getElementById('consultationVet').value,
                    reason: document.getElementById('consultationReason').value,
                    description: document.getElementById('consultationDescription').value,
                    priority: document.getElementById('consultationPriority')?.value || 'normal',
                    status: 'scheduled'
                };
                consultationSystem.createConsultation(data);
                showMessage('Consulta creada correctamente', 'success');
                hideConsultationForm();
                renderConsultationsList();
                updateAppointmentStats();
                renderAppointmentsList();
            } catch (err) {
                showMessage(err.message || 'Error al crear la consulta', 'error');
            }
        });
    }

    // Auto-login if user stored
    const current = authSystem && authSystem.getCurrentUser();
    if (current) {
        // Show header and main
        const authContainer = document.getElementById('authContainer');
        const header = document.getElementById('mainHeader');
        const main = document.getElementById('mainContent');
        if (authContainer) authContainer.style.display = 'none';
        if (header) header.style.display = 'block';
        if (main) main.style.display = 'block';
        updateUserInfo();
        const nextSection = (current.role === 'user') ? 'registro' : 'inicio';
        showSection(nextSection);
        updatePetsList();
        showSystemStats();
        showMessage('Sesión restaurada para ' + current.name, 'success');
    } else {
        showLoginForm();
        updateUserInfo();
    }
});

// === Feature Info Modal: solo para rol Usuario ===
function getFeatureInfoData(title) {
    const infoMap = {
        'Gestión de Consultas': {
            title: 'Gestión de Consultas',
            description: 'Como usuario, puedes conocer cómo funcionan las consultas, pero su creación y administración está reservada a personal autorizado.',
            points: [
                'Programación de consultas por veterinarios autorizados',
                'Seguimiento del historial clínico de la mascota',
                'Prescripción y control de tratamientos',
                'Acceso restringido según rol'
            ],
            showGoRegistro: true
        },
        'Citas Médicas': {
            title: 'Citas Médicas',
            description: 'La gestión de citas permite organizar agendas y prioridades. Como usuario, puedes conocer el proceso, pero no administrar citas.',
            points: [
                'Asignación de veterinarios y horarios',
                'Priorización según urgencia (normal, alta, urgente)',
                'Visualización de estado: programada, completada o cancelada',
                'Gestión disponible solo para veterinarios'
            ],
            showGoRegistro: true
        },
        'Control de Accesos': {
            title: 'Control de Accesos',
            description: 'El sistema maneja permisos por rol para proteger tu información y definir acciones disponibles.',
            points: [
                'Usuario: registrar mascotas y consultar información',
                'Veterinario: gestionar citas y consultas',
                'Acceso basado en permisos específicos por sección'
            ],
            showGoRegistro: true
        },
        'Estadísticas y Reportes': {
            title: 'Estadísticas y Reportes',
            description: 'Indicadores en tiempo real del sistema. Como usuario, puedes conocer qué se reporta sin visualizar datos detallados.',
            points: [
                'Total de mascotas registradas en el sistema',
                'Citas programadas y su estado',
                'Consultas registradas por el personal',
                'Datos agregados para administración'
            ],
            showGoRegistro: true
        },
        'Seguridad y Privacidad': {
            title: 'Seguridad y Privacidad',
            description: 'Protegemos tus datos con prácticas de seguridad y acceso controlado.',
            points: [
                'Encriptación y almacenamiento responsable',
                'Acceso limitado por rol y permisos',
                'Sesiones controladas y cierre seguro',
                'Cumplimiento de buenas prácticas de privacidad'
            ],
            showGoRegistro: true
        }
    };
    return infoMap[title] || { title, description: 'Información no disponible', points: [], showGoRegistro: true };
}

function ensureFeatureInfoModal() {
    if (document.getElementById('featureInfoModal')) return;

    const style = document.createElement('style');
    style.textContent = `
    .feature-info-modal { position: fixed; inset: 0; display: none; z-index: 2147483647; display: flex; justify-content: center; align-items: flex-start; padding: 160px 16px 32px; box-sizing: border-box; }
    .feature-info-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(2px); z-index: 1; }
    .feature-info-dialog { position: relative; width: 100%; max-width: 760px; max-height: 80vh; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: var(--shadow-lg); overflow: auto; z-index: 2; }
    .feature-info-header { padding: 16px 20px; border-bottom: 1px solid var(--gray-200); background: var(--gray-50); }
    .feature-info-body { padding: 20px; }
    .feature-info-body p { margin-bottom: 12px; color: var(--gray-700); }
    .feature-info-list { margin: 0; padding-left: 18px; }
    .feature-info-list li { margin: 6px 0; color: var(--gray-800); }
    .feature-info-actions { display: flex; justify-content: flex-end; gap: 8px; padding: 16px 20px; border-top: 1px solid var(--gray-200); }
    @media (max-width: 480px) { .feature-info-dialog { max-width: 95%; } .feature-info-modal { padding-top: 140px; } }
    `;
    document.head.appendChild(style);

    const modal = document.createElement('div');
    modal.id = 'featureInfoModal';
    modal.className = 'feature-info-modal';
    modal.innerHTML = `
        <div class="feature-info-backdrop"></div>
        <div class="feature-info-dialog">
            <div class="feature-info-header">
                <h3 id="featureInfoTitle" class="section-title" style="margin: 0;"></h3>
            </div>
            <div class="feature-info-body">
                <p id="featureInfoDesc"></p>
                <ul id="featureInfoList" class="feature-info-list"></ul>
            </div>
            <div class="feature-info-actions">
                <button id="featureInfoClose" class="btn btn-outline"><i class="fas fa-times"></i> Cerrar</button>
                <button id="featureInfoGoRegistro" class="btn btn-primary" style="display:none"><i class="fas fa-paw"></i> Ir a Registro</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.feature-info-backdrop').addEventListener('click', hideFeatureInfoModal);
    document.getElementById('featureInfoClose').addEventListener('click', hideFeatureInfoModal);
    document.getElementById('featureInfoGoRegistro').addEventListener('click', function() {
        hideFeatureInfoModal();
        showSection('registro');
    });
}

function showFeatureInfoModal(info) {
    ensureFeatureInfoModal();
    const modal = document.getElementById('featureInfoModal');
    const titleEl = document.getElementById('featureInfoTitle');
    const descEl = document.getElementById('featureInfoDesc');
    const listEl = document.getElementById('featureInfoList');
    const goBtn = document.getElementById('featureInfoGoRegistro');

    titleEl.textContent = info.title || 'Información';
    descEl.textContent = info.description || '';
    listEl.innerHTML = '';
    (info.points || []).forEach(p => {
        const li = document.createElement('li');
        li.textContent = p;
        listEl.appendChild(li);
    });
    goBtn.style.display = info.showGoRegistro ? '' : 'none';

    modal.style.display = 'flex';
}

function hideFeatureInfoModal() {
    const modal = document.getElementById('featureInfoModal');
    if (modal) modal.style.display = 'none';
}

