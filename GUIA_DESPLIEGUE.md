# 🚀 Guía de Despliegue - Sistema Veterinario

Guía simple para desplegar tu aplicación Java Spring Boot en la nube de forma GRATUITA.

---

## 🎯 Opción Recomendada: Render (GRATIS)

Esta es la forma más fácil y completamente gratuita de desplegar tu aplicación.

---

## Pasos para Desplegar en Render

**¿Por qué Render?**
- ✅ Completamente GRATIS
- ✅ Muy fácil de usar
- ✅ Despliegue automático desde GitHub
- ✅ SSL/HTTPS incluido
- ⚠️ Se "duerme" después de 15 min de inactividad (tarda ~30s en despertar)

### Paso 1: Subir tu código a GitHub

**1.1 Crea un repositorio en GitHub:**
- Ve a https://github.com/new
- Nombre: `veterinaria-animal-care` (o el que prefieras)
- Visibilidad: Público o Privado
- Click en "Create repository"

**1.2 Sube tu código:**
```bash
git init
git add .
git commit -m "Preparar para despliegue"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/veterinaria-animal-care.git
git push -u origin main
```

**Nota:** Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

### Paso 2: Crear cuenta en Render
1. Ve a: https://render.com
2. Click en "Get Started for Free"
3. Regístrate con tu cuenta de GitHub
4. Autoriza a Render para acceder a tus repositorios

### Paso 3: Crear Web Service
1. En el dashboard de Render, click en "New +" → "Web Service"
2. Click en "Connect a repository"
3. Busca y selecciona tu repositorio `veterinaria-animal-care`
4. Click en "Connect"

**Configuración del servicio:**

Llena el formulario con estos valores:

- **Name:** `veterinaria-app` (o el nombre que prefieras)
- **Region:** `Oregon (US West)` (o el más cercano)
- **Branch:** `main`
- **Root Directory:** `java-app`
- **Runtime:** `Java`
- **Build Command:** `mvn clean package -DskipTests`
- **Start Command:** `java -Dserver.port=$PORT -jar target/veterinary-system-1.0.0.jar`
- **Instance Type:** `Free` ⭐

**Variables de entorno (Opcional):**

Click en "Advanced" y agrega:
- `JAVA_TOOL_OPTIONS`: `-Xmx512m`
- `MAVEN_OPTS`: `-Xmx512m`

### Paso 4: Desplegar

1. Click en "Create Web Service"
2. Render comenzará a construir tu aplicación
3. Espera 5-10 minutos (la primera vez tarda más)
4. Cuando veas "Your service is live 🎉", está listo!

Tu aplicación estará disponible en: `https://veterinaria-app.onrender.com`

### Paso 5: Probar

Accede a tu URL y prueba con los usuarios:
- **Veterinario:** veterinario@test.com / 123456
- **Usuario:** usuario@test.com / 123456

---

## 📝 Notas Importantes

### Plan Gratuito de Render:

1. **Se "duerme" después de 15 minutos de inactividad**
   - La primera visita tardará ~30 segundos
   - Las siguientes visitas serán instantáneas

2. **Límites:**
   - 750 horas/mes (suficiente para uso personal)
   - 512 MB de RAM
   - Ancho de banda limitado

3. **Los datos se pierden al reiniciar:**
   - Tu app usa memoria, no base de datos
   - Los usuarios de prueba siempre estarán disponibles

---

## 🔄 Actualizar tu Aplicación

Cada vez que hagas cambios y los subas a GitHub, Render automáticamente:
1. Detectará los cambios
2. Reconstruirá la aplicación
3. La desplegará automáticamente

```bash
# Hacer cambios en tu código
git add .
git commit -m "Descripción de los cambios"
git push
```

---

## 🆘 Solución de Problemas

### Error: "Build failed"
**Causa:** Maven no pudo compilar  
**Solución:**
1. Verifica que el Root Directory sea `java-app`
2. Revisa los logs para ver el error específico
3. Asegúrate de que el código compile localmente primero

### Error: "Application failed to start"
**Causa:** El JAR no se ejecutó correctamente  
**Solución:**
1. Verifica el Start Command
2. Revisa que el nombre del JAR sea correcto
3. Mira los logs para más detalles

### La aplicación tarda mucho en cargar
**Causa:** El servicio estaba "dormido"  
**Solución:**
- Es normal en el plan gratuito
- Espera 30 segundos en la primera carga

### No puedo hacer login
**Causa:** Los usuarios de prueba no se cargaron  
**Solución:**
1. Verifica que la aplicación haya iniciado correctamente
2. Revisa los logs en Render
3. Los usuarios deberían crearse automáticamente al iniciar

---

## 🎉 ¡Listo!

Tu aplicación está en línea y accesible desde cualquier parte del mundo.

**Comparte tu URL:** `https://tu-app.onrender.com`
