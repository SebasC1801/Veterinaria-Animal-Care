package com.veterinary.webversion;

import static org.junit.jupiter.api.Assertions.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * Pruebas simples sobre los archivos de la versión web (estática) para validar:
 * - Eliminación/ocultación de la sección de consultas.
 * - Estilos del modal: z-index alto, overlay semi-transparente y centrado.
 * - Navegación desde la tarjeta de "Consultas" hacia Citas Médicas.
 */
public class WebVersionVisibilityTests {

    private Path getWebVersionFile(String fileName) {
        // Ruta base del proyecto java-app
        String base = System.getProperty("user.dir");
        // Asegurar separadores correctos en Windows
        Path path = Paths.get(base, "web-version", fileName);
        assertTrue(Files.exists(path), "No se encontró el archivo: " + path.toString());
        return path;
    }

    @Test
    @DisplayName("La sección de consultas no está presente ni en navegación ni en contenido")
    void consultasSectionRemovedOrHidden() throws Exception {
        String html = Files.readString(getWebVersionFile("index.html"));

        // Verifica que no exista el anchor de navegación a #consultas
        assertFalse(html.contains("href=\"#consultas\""), "Existe enlace de navegación a #consultas");

        // Verifica que no exista la sección con id="consultas"
        assertFalse(html.contains("id=\"consultas\""), "Existe sección con id=consultas en index.html");
    }

    @Test
    @DisplayName("El modal tiene z-index alto y overlay semi-transparente y centrado")
    void modalHasProperLayeringAndCentering() throws Exception {
        String css = Files.readString(getWebVersionFile("style.css"));
        String cssLower = css.toLowerCase(Locale.ROOT);

        // z-index superior al header (10000)
        assertTrue(cssLower.contains(".modal") && cssLower.contains("z-index: 20000"), "El modal no tiene z-index >= 20000");

        // Overlay semi-transparente
        assertTrue(cssLower.contains("background-color: rgba(0, 0, 0, 0.5)"), "El overlay del modal no es semi-transparente");

        // Centrado mediante flex
        assertTrue(cssLower.contains("display: flex"), "El modal no usa display:flex");
        assertTrue(cssLower.contains("justify-content: center"), "El modal no centra horizontalmente");
        assertTrue(cssLower.contains("align-items: center"), "El modal no centra verticalmente");
    }

    @Test
    @DisplayName("La feature de Consultas redirige a Citas Médicas")
    void consultasFeatureRedirectsToAppointments() throws Exception {
        String html = Files.readString(getWebVersionFile("index.html"));
        // Verifica que el item de "Gestión de Consultas" fue reemplazado por Consultas Integradas
        assertTrue(html.contains("Consultas Integradas"), "El título de la feature de Consultas no fue actualizado");
        assertTrue(html.contains("onclick=\"showSection('citas-medicas')\""), "La feature de Consultas no redirige a Citas Médicas");
    }
}