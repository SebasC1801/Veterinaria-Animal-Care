# 🚀 Instrucciones para Ejecutar la Aplicación

## Problema Detectado

La aplicación no se está ejecutando porque **Maven no está instalado** o no está en el PATH del sistema.

## ✅ Solución Rápida

### Opción 1: Instalar Maven (Recomendado)

1. **Descargar Maven:**
   - Visita: https://maven.apache.org/download.cgi
   - Descarga el archivo `apache-maven-X.X.X-bin.zip` (versión más reciente)

2. **Instalar Maven:**
   - Extrae el archivo ZIP en una carpeta (ejemplo: `C:\Program Files\Apache\maven`)
   - Copia la ruta completa de la carpeta `bin` (ejemplo: `C:\Program Files\Apache\maven\bin`)

3. **Agregar Maven al PATH:**
   - Presiona `Win + R`, escribe `sysdm.cpl` y presiona Enter
   - Ve a la pestaña "Opciones avanzadas"
   - Haz clic en "Variables de entorno"
   - En "Variables del sistema", busca `Path` y haz clic en "Editar"
   - Haz clic en "Nuevo" y pega la ruta del `bin` de Maven
   - Haz clic en "Aceptar" en todas las ventanas

4. **Verificar instalación:**
   - Abre una nueva terminal (PowerShell o CMD)
   - Ejecuta: `mvn --version`
   - Deberías ver la versión de Maven

5. **Ejecutar la aplicación:**
   - Navega a la carpeta del proyecto
   - Ejecuta: `cd java-app`
   - Ejecuta: `mvn spring-boot:run`
   - La aplicación estará disponible en: **http://localhost:8085**

### Opción 2: Ejecutar JAR Compilado (Si existe)

Si ya tienes el JAR compilado en `java-app/target/veterinary-system-1.0.0.jar`:

1. Abre una terminal en la carpeta `java-app`
2. Ejecuta:
   ```bash
   java -jar target\veterinary-system-1.0.0.jar
   ```
3. La aplicación estará disponible en: **http://localhost:8085**

### Opción 3: Usar el Script de Verificación

He creado un script que verifica las dependencias y te guía:

1. Abre una terminal en la carpeta `java-app`
2. Ejecuta: `verificar-ejecutar.bat`
3. El script te indicará qué falta y cómo solucionarlo

## 📋 Requisitos del Sistema

- ✅ **Java 11 o superior** (Ya instalado - versión 25.0.1 detectada)
- ❌ **Maven 3.6 o superior** (No detectado - necesita instalación)

## 🔍 Verificar Instalación

### Verificar Java:
```bash
java -version
```
Deberías ver algo como: `java version "25.0.1"`

### Verificar Maven:
```bash
mvn --version
```
Si Maven está instalado, verás la versión. Si no, verás un error.

## 🛠️ Solución de Problemas

### Error: "mvn no se reconoce como comando"
- **Causa:** Maven no está instalado o no está en el PATH
- **Solución:** Sigue la Opción 1 para instalar Maven

### Error: "Java no se reconoce como comando"
- **Causa:** Java no está instalado o no está en el PATH
- **Solución:** Instala Java desde https://adoptium.net/

### Error: "Puerto 8085 ya está en uso"
- **Causa:** Otra aplicación está usando el puerto 8083
- **Solución:** 
  - Cierra la otra aplicación
  - O cambia el puerto en `java-app/src/main/resources/application.yml` (línea 2: `port: 8085`)

### Problemas con caracteres especiales en la ruta
- **Causa:** La carpeta "Diseño" tiene una "ñ" que puede causar problemas
- **Solución:** Usa comillas en las rutas o ejecuta desde una ruta sin caracteres especiales

## 📝 Notas Importantes

1. **Puerto de la aplicación:** La aplicación está configurada para ejecutarse en el puerto **8085** (no 8080)
2. **URL de acceso:** Una vez ejecutada, accede a: **http://localhost:8085**
3. **Consola H2:** Si necesitas acceder a la base de datos H2: **http://localhost:8083/h2-console**
   - JDBC URL: `jdbc:h2:mem:veterinarydb`
   - Usuario: `sa`
   - Contraseña: `password`

## 🎯 Pasos Rápidos (Resumen)

1. Instala Maven (si no está instalado)
2. Abre una terminal en la carpeta `java-app`
3. Ejecuta: `mvn spring-boot:run`
4. Espera a que compile y se inicie
5. Abre tu navegador en: **http://localhost:8085**

## Configurar MongoDB vía variable de entorno

Puedes definir la URI de MongoDB sin editar archivos usando variables de entorno (persisten sólo en el terminal actual):

### Windows PowerShell

```
cd java-app
$env:SPRING_DATA_MONGODB_URI="mongodb+srv://USUARIO:CONTRASENA@HOST/BD?retryWrites=true&w=majority"
mvn -q spring-boot:run -DskipTests
```

También puedes usar `MONGODB_URI`:

```
$env:MONGODB_URI="mongodb+srv://USUARIO:CONTRASENA@HOST/BD?retryWrites=true&w=majority"
mvn -q spring-boot:run -DskipTests
```

Si no defines variables, se usará la URI por defecto en `application.yml`.

## 💡 Alternativa: Usar IDE

Si tienes un IDE como IntelliJ IDEA o Eclipse:

1. Abre el proyecto en el IDE
2. El IDE detectará automáticamente que es un proyecto Maven
3. Ejecuta la clase `VeterinaryWebApp` directamente desde el IDE
4. El IDE se encargará de compilar y ejecutar automáticamente

---

**¿Necesitas ayuda?** Revisa los logs de compilación para ver errores específicos.

