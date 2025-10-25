/**
 * JavaScript principal para la aplicación Veterinaria Patrones
 * Funciones comunes y utilidades
 */

// Función para mostrar notificaciones toast
function mostrarToast(tipo, mensaje, duracion = 5000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    
    const icon = getToastIcon(tipo);
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas ${icon}"></i>
            <span>${mensaje}</span>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Auto-remove después de la duración especificada
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duracion);
    
    // Click para cerrar
    toast.addEventListener('click', () => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    });
}

function getToastIcon(tipo) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[tipo] || 'fa-info-circle';
}

// Función para hacer peticiones AJAX
async function hacerPeticion(url, opciones = {}) {
    const configuracion = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...opciones
    };
    
    try {
        const respuesta = await fetch(url, configuracion);
        const datos = await respuesta.json();
        
        if (!respuesta.ok) {
            throw new Error(datos.message || 'Error en la petición');
        }
        
        return datos;
    } catch (error) {
        console.error('Error en petición:', error);
        throw error;
    }
}

// Función para formatear fechas
function formatearFecha(fecha) {
    if (!fecha) return 'No especificada';
    
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función para formatear números
function formatearNumero(numero, decimales = 0) {
    if (numero === null || numero === undefined) return 'N/A';
    return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales
    }).format(numero);
}

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar teléfono
function validarTelefono(telefono) {
    const regex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
    return regex.test(telefono);
}

// Función para mostrar modal de confirmación
function mostrarConfirmacion(titulo, mensaje, callback) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${titulo}</h3>
                <button class="modal-close" onclick="cerrarModal(this)">&times;</button>
            </div>
            <div class="modal-body">
                <p>${mensaje}</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="cerrarModal(this)">Cancelar</button>
                <button class="btn btn-danger" onclick="confirmarAccion(this)">Confirmar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Función para cerrar modal
    window.cerrarModal = function(elemento) {
        const modal = elemento.closest('.modal');
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };
    
    // Función para confirmar acción
    window.confirmarAccion = function(elemento) {
        const modal = elemento.closest('.modal');
        callback();
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal(e.target);
        }
    });
}

// Función para cargar datos de una tabla
async function cargarTabla(url, tablaId, columnas) {
    try {
        const datos = await hacerPeticion(url);
        const tabla = document.getElementById(tablaId);
        
        if (!tabla) return;
        
        // Limpiar tabla existente
        const tbody = tabla.querySelector('tbody');
        if (tbody) {
            tbody.innerHTML = '';
        }
        
        // Crear filas
        datos.forEach(item => {
            const fila = document.createElement('tr');
            
            columnas.forEach(columna => {
                const celda = document.createElement('td');
                
                if (typeof columna === 'string') {
                    celda.textContent = item[columna] || '';
                } else if (typeof columna === 'function') {
                    celda.innerHTML = columna(item);
                } else if (columna.propiedad) {
                    celda.innerHTML = columna.formato ? columna.formato(item[columna.propiedad]) : item[columna.propiedad];
                }
                
                fila.appendChild(celda);
            });
            
            tbody.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar tabla:', error);
        mostrarToast('error', 'Error al cargar los datos');
    }
}

// Función para crear badges
function crearBadge(texto, tipo = 'primary') {
    return `<span class="badge badge-${tipo}">${texto}</span>`;
}

// Función para crear botones de acción
function crearBotonesAccion(id, acciones = []) {
    let botones = '';
    
    acciones.forEach(accion => {
        const icono = accion.icono || 'fa-edit';
        const clase = accion.clase || 'btn-outline';
        const titulo = accion.titulo || 'Acción';
        
        botones += `
            <button class="btn ${clase} btn-sm" 
                    onclick="${accion.funcion}(${id})" 
                    title="${titulo}">
                <i class="fas ${icono}"></i>
            </button>
        `;
    });
    
    return botones;
}

// Función para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Función para copiar al portapapeles
async function copiarAlPortapapeles(texto) {
    try {
        await navigator.clipboard.writeText(texto);
        mostrarToast('success', 'Copiado al portapapeles');
    } catch (error) {
        console.error('Error al copiar:', error);
        mostrarToast('error', 'Error al copiar al portapapeles');
    }
}

// Función para exportar datos como CSV
function exportarCSV(datos, nombreArchivo = 'datos.csv') {
    if (!datos || datos.length === 0) {
        mostrarToast('warning', 'No hay datos para exportar');
        return;
    }
    
    const columnas = Object.keys(datos[0]);
    const csvContent = [
        columnas.join(','),
        ...datos.map(fila => 
            columnas.map(columna => 
                `"${fila[columna] || ''}"`
            ).join(',')
        )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', nombreArchivo);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Función para mostrar loading en botones
function mostrarLoading(boton, texto = 'Cargando...') {
    const textoOriginal = boton.innerHTML;
    boton.innerHTML = `<span class="spinner"></span> ${texto}`;
    boton.disabled = true;
    
    return function ocultarLoading() {
        boton.innerHTML = textoOriginal;
        boton.disabled = false;
    };
}

// Función para inicializar tooltips
function inicializarTooltips() {
    const elementos = document.querySelectorAll('[data-tooltip]');
    
    elementos.forEach(elemento => {
        elemento.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
            tooltip.style.zIndex = '9999';
        });
        
        elemento.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                document.body.removeChild(tooltip);
            }
        });
    });
}

// Función para manejar errores de formulario
function manejarErroresFormulario(formulario, errores) {
    // Limpiar errores anteriores
    const erroresAnteriores = formulario.querySelectorAll('.error-message');
    erroresAnteriores.forEach(error => error.remove());
    
    // Mostrar nuevos errores
    Object.keys(errores).forEach(campo => {
        const elemento = formulario.querySelector(`[name="${campo}"]`);
        if (elemento) {
            elemento.classList.add('invalid');
            
            const mensajeError = document.createElement('div');
            mensajeError.className = 'error-message';
            mensajeError.textContent = errores[campo];
            mensajeError.style.color = 'var(--danger-color)';
            mensajeError.style.fontSize = 'var(--font-size-xs)';
            mensajeError.style.marginTop = 'var(--spacing-1)';
            
            elemento.parentNode.appendChild(mensajeError);
        }
    });
}

// Función para limpiar errores de formulario
function limpiarErroresFormulario(formulario) {
    const elementosInvalidos = formulario.querySelectorAll('.invalid');
    elementosInvalidos.forEach(elemento => elemento.classList.remove('invalid'));
    
    const mensajesError = formulario.querySelectorAll('.error-message');
    mensajesError.forEach(mensaje => mensaje.remove());
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips
    inicializarTooltips();
    
    // Agregar estilos CSS adicionales
    const estilosAdicionales = `
        <style>
            .tooltip {
                background: var(--gray-800);
                color: white;
                padding: var(--spacing-2) var(--spacing-3);
                border-radius: var(--border-radius);
                font-size: var(--font-size-xs);
                box-shadow: var(--shadow-md);
                pointer-events: none;
            }
            
            .error-message {
                display: block;
                margin-top: var(--spacing-1);
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', estilosAdicionales);
});

// Exportar funciones para uso global
window.mostrarToast = mostrarToast;
window.hacerPeticion = hacerPeticion;
window.formatearFecha = formatearFecha;
window.formatearNumero = formatearNumero;
window.validarEmail = validarEmail;
window.validarTelefono = validarTelefono;
window.mostrarConfirmacion = mostrarConfirmacion;
window.cargarTabla = cargarTabla;
window.crearBadge = crearBadge;
window.crearBotonesAccion = crearBotonesAccion;
window.debounce = debounce;
window.throttle = throttle;
window.copiarAlPortapapeles = copiarAlPortapapeles;
window.exportarCSV = exportarCSV;
window.mostrarLoading = mostrarLoading;
window.manejarErroresFormulario = manejarErroresFormulario;
window.limpiarErroresFormulario = limpiarErroresFormulario;
