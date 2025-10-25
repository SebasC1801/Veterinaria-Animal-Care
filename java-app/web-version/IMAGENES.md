# 📸 Guía para Agregar Imágenes al Sistema Veterinario

## 🎯 Ubicaciones Recomendadas para Imágenes

### 1. **Logo Principal** 
- **Ubicación**: `images/Logo.png`
- **Tamaño recomendado**: 200x200 píxeles
- **Formato**: PNG con fondo transparente
- **Uso**: Reemplaza el ícono de la pata en el header

### 2. **Imágenes de Mascotas de Ejemplo**
- **Ubicación**: `images/pets/`
- **Archivos sugeridos**:
  - `dog-example.jpg` - Perro de ejemplo
  - `cat-example.jpg` - Gato de ejemplo  
  - `bird-example.jpg` - Ave de ejemplo
  - `reptile-example.jpg` - Reptil de ejemplo
- **Tamaño**: 300x300 píxeles
- **Uso**: Mostrar en tarjetas de mascotas

### 3. **Iconos de Patrones de Diseño**
- **Ubicación**: `images/patterns/`
- **Archivos sugeridos**:
  - `singleton-icon.png` - Ícono para Singleton
  - `factory-icon.png` - Ícono para Factory Method
  - `abstract-factory-icon.png` - Ícono para Abstract Factory
  - `builder-icon.png` - Ícono para Builder
  - `prototype-icon.png` - Ícono para Prototype
- **Tamaño**: 64x64 píxeles
- **Formato**: PNG con fondo transparente

### 4. **Imágenes de Fondo**
- **Ubicación**: `images/backgrounds/`
- **Archivos sugeridos**:
  - `hero-bg.jpg` - Fondo para la sección principal
  - `pattern-bg.jpg` - Fondo para sección de patrones
- **Tamaño**: 1920x1080 píxeles
- **Uso**: Fondos decorativos

## 🛠️ Cómo Implementar las Imágenes

### Para el Logo:
```html
<!-- En index.html, línea 18, reemplaza: -->
<i class="fas fa-paw"></i>
<!-- Por: -->
<img src="images/Logo.png" alt="Logo Veterinaria" class="logo-image">
```

### Para Imágenes de Mascotas:
```html
<!-- En las tarjetas de mascotas, agregar: -->
<div class="pet-image">
    <img src="images/pets/dog-example.jpg" alt="Perro" class="pet-photo">
</div>
```

### Para Iconos de Patrones:
```html
<!-- En las tarjetas de patrones, reemplazar: -->
<i class="fas fa-crown text-3xl text-primary-color"></i>
<!-- Por: -->
<img src="images/patterns/singleton-icon.png" alt="Singleton" class="pattern-icon">
```

## 🎨 Estilos CSS para Imágenes

### Logo:
```css
.logo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}
```

### Imágenes de Mascotas:
```css
.pet-photo {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-4);
}
```

### Iconos de Patrones:
```css
.pattern-icon {
    width: 48px;
    height: 48px;
    margin-bottom: var(--spacing-4);
}
```

## 📁 Estructura de Carpetas Recomendada

```
java-app/web-version/
├── images/
│   ├── logo.png
│   ├── pets/
│   │   ├── dog-example.jpg
│   │   ├── cat-example.jpg
│   │   ├── bird-example.jpg
│   │   └── reptile-example.jpg
│   ├── patterns/
│   │   ├── singleton-icon.png
│   │   ├── factory-icon.png
│   │   ├── abstract-factory-icon.png
│   │   ├── builder-icon.png
│   │   └── prototype-icon.png
│   └── backgrounds/
│       ├── hero-bg.jpg
│       └── pattern-bg.jpg
├── index.html
├── style.css
├── app.js
└── IMAGENES.md
```

## 🎯 Consejos para Imágenes

1. **Optimización**: Comprime las imágenes para web (usar herramientas como TinyPNG)
2. **Formatos**: 
   - PNG para logos e iconos (transparencia)
   - JPG para fotos de mascotas
   - SVG para iconos simples
3. **Responsive**: Las imágenes se adaptarán automáticamente a diferentes tamaños
4. **Accesibilidad**: Siempre incluye texto alternativo (`alt`)

## 🚀 Implementación Rápida

1. Crea la carpeta `images` en `java-app/web-version/`
2. Agrega tus imágenes siguiendo la estructura recomendada
3. Modifica el HTML según los ejemplos proporcionados
4. Los estilos CSS ya están preparados para las imágenes

¡Tu sistema veterinario se verá mucho más profesional con imágenes personalizadas! 🐾
