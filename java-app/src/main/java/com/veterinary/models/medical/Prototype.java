package com.veterinary.models.medical;

/**
 * Interfaz para el patrón Prototype que permite la clonación de objetos.
 */
public interface Prototype<T> {
    
    /**
     * Crea una copia del objeto.
     * 
     * @return Una copia del objeto
     */
    T clone();
}