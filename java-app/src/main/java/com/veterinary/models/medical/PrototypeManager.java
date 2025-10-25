package com.veterinary.models.medical;

import java.util.HashMap;
import java.util.Map;

/**
 * Gestor de prototipos para el patrón Prototype.
 * Permite almacenar y clonar registros médicos.
 */
public class PrototypeManager {
    private Map<String, MedicalRecord> prototypes;
    
    /**
     * Constructor que inicializa el mapa de prototipos.
     */
    public PrototypeManager() {
        this.prototypes = new HashMap<>();
    }
    
    /**
     * Registra un prototipo con un identificador.
     * 
     * @param id Identificador del prototipo
     * @param prototype Prototipo a registrar
     */
    public void addPrototype(String id, MedicalRecord prototype) {
        prototypes.put(id, prototype);
    }
    
    /**
     * Obtiene un clon del prototipo con el identificador especificado.
     * 
     * @param id Identificador del prototipo
     * @return Clon del prototipo
     * @throws IllegalArgumentException si el identificador no existe
     */
    public MedicalRecord getClone(String id) {
        MedicalRecord prototype = prototypes.get(id);
        if (prototype == null) {
            throw new IllegalArgumentException("No existe un prototipo con el ID: " + id);
        }
        return prototype.clone();
    }
    
    /**
     * Verifica si existe un prototipo con el identificador especificado.
     * 
     * @param id Identificador a verificar
     * @return true si existe, false en caso contrario
     */
    public boolean containsPrototype(String id) {
        return prototypes.containsKey(id);
    }
    
    /**
     * Elimina un prototipo del registro.
     * 
     * @param id Identificador del prototipo a eliminar
     * @return true si se eliminó correctamente, false si no existía
     */
    public boolean removePrototype(String id) {
        return prototypes.remove(id) != null;
    }
    
    /**
     * Obtiene todos los identificadores de prototipos registrados.
     * 
     * @return Conjunto de identificadores
     */
    public Iterable<String> getPrototypeIds() {
        return prototypes.keySet();
    }
    
    /**
     * Obtiene el número de prototipos registrados.
     * 
     * @return Número de prototipos
     */
    public int getPrototypeCount() {
        return prototypes.size();
    }
}