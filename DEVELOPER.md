# Guía para Desarrolladores - ASLI Rastreo de Carga

## Descripción del Proyecto

Este proyecto corresponde al rediseño y mejora de la página de rastreo de carga de ASLI, implementando un diseño moderno con efectos visuales avanzados y una experiencia de usuario optimizada.

## Estructura del Proyecto

```
ASLI/
├── index.html              # Página principal y punto de entrada
├── CSS/
│   └── style.css           # Estilos principales, animaciones y responsividad
├── JS/
│   ├── script.js           # Lógica general y efectos visuales
│   └── tracking.js         # Funcionalidad específica de rastreo
└── IMG/                    # Recursos gráficos
    ├── logo.png            # Logo principal
    ├── agronexo.png        # Logo de cliente
    ├── maersk.png          # Logo de naviera
    ├── avion.jpg           # Imagen para animación de aviones
    └── ...                 # Más recursos gráficos
```

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica y moderna
- **CSS3**: Estilos avanzados, animaciones, gradientes y responsividad
- **JavaScript (ES6+)**: Lógica interactiva y efectos dinámicos
- **Sin dependencias externas**: Código puro HTML/CSS/JS

## Características Técnicas Implementadas

### Efectos Visuales

#### 1. Gradientes Animados
- **Ubicación**: `CSS/style.css` - Secciones `.hero` y `.tracking-section`
- **Implementación**: `background: linear-gradient()` con `@keyframes`
- **Efecto**: Rotación continua del gradiente de fondo

#### 2. Partículas Flotantes
- **Ubicación**: `CSS/style.css` - Clases `.particle` y `.particles-container`
- **Implementación**: Elementos `div` con posicionamiento absoluto y animaciones CSS
- **Efecto**: Partículas pequeñas que flotan en el fondo con movimiento aleatorio

#### 3. Aviones Animados
- **Ubicación**: `JS/script.js` - Función `createAirplane()`
- **Implementación**: Elementos `img` creados dinámicamente con JavaScript
- **Efecto**: Aviones que vuelan por la pantalla con trayectorias variables

#### 4. Botones con Efectos
- **Ubicación**: `CSS/style.css` - Clases `.btn` y `.btn-primary`
- **Implementación**: `box-shadow`, `transform` y `transition`
- **Efecto**: Brillo interno y efectos hover

### Funcionalidades Principales

#### 1. Navegación Inteligente
- **Archivo**: `JS/script.js`
- **Función**: `handleNavigation()`
- **Característica**: Detecta la página actual y ajusta el comportamiento del enlace "Inicio"

#### 2. Sistema de Rastreo
- **Archivo**: `JS/tracking.js`
- **Funciones principales**:
  - `initTracking()`: Inicialización del formulario
  - `handleTracking()`: Procesamiento del rastreo
  - `displayResults()`: Visualización de resultados
  - `createTimeline()`: Generación del timeline

#### 3. Responsividad
- **Archivo**: `CSS/style.css`
- **Breakpoints**: Móvil, tablet y desktop
- **Características**: Diseño adaptativo con efectos optimizados

## Guía de Desarrollo

### Configuración del Entorno

#### Opción 1: Desarrollo Local Simple
```bash
# Clonar o descargar el proyecto
# Abrir index.html directamente en el navegador
```

#### Opción 2: Servidor Local (Recomendado)
```bash
# Con VS Code + Live Server
# 1. Instalar extensión "Live Server"
# 2. Clic derecho en index.html
# 3. "Open with Live Server"
```

### Estructura de Archivos

#### CSS (style.css)
- **Líneas 1-100**: Variables CSS y configuración global
- **Líneas 101-300**: Estilos del hero y navegación
- **Líneas 301-500**: Estilos de la sección de rastreo
- **Líneas 501-700**: Efectos visuales y animaciones
- **Líneas 701-900**: Responsividad y media queries

#### JavaScript (script.js)
- **Líneas 1-50**: Configuración inicial y variables globales
- **Líneas 51-150**: Funciones de navegación
- **Líneas 151-250**: Efectos visuales (partículas, aviones)
- **Líneas 251-350**: Utilidades y helpers

#### JavaScript (tracking.js)
- **Líneas 1-50**: Inicialización del sistema de rastreo
- **Líneas 51-150**: Lógica del formulario y validación
- **Líneas 151-250**: Generación de resultados y timeline
- **Líneas 251-300**: Efectos específicos de la sección

### Modificaciones Comunes

#### Agregar Nuevos Efectos Visuales
1. Crear las clases CSS en `style.css`
2. Agregar la lógica JavaScript en `script.js`
3. Asegurar responsividad en media queries

#### Modificar el Sistema de Rastreo
1. Editar funciones en `tracking.js`
2. Actualizar estilos relacionados en `style.css`
3. Probar en diferentes dispositivos

#### Cambiar Colores o Temas
1. Modificar variables CSS al inicio de `style.css`
2. Actualizar gradientes y efectos relacionados
3. Verificar contraste y accesibilidad

## Optimizaciones Implementadas

### Rendimiento
- **Lazy loading**: Imágenes cargan según necesidad
- **CSS optimizado**: Animaciones usando `transform` y `opacity`
- **JavaScript eficiente**: Event listeners optimizados

### Accesibilidad
- **Contraste**: Texto con sombras para separación del fondo
- **Navegación por teclado**: Enlaces accesibles
- **Semántica HTML**: Estructura semántica correcta

### Responsividad
- **Mobile-first**: Diseño base para móviles
- **Breakpoints**: Adaptación progresiva
- **Touch-friendly**: Elementos táctiles optimizados

## Debugging y Troubleshooting

### Problemas Comunes

#### Efectos no se muestran
```javascript
// Verificar que JavaScript esté habilitado
console.log('Script loaded');
// Verificar elementos del DOM
console.log(document.querySelector('.particles-container'));
```

#### Navegación no funciona
```javascript
// Verificar rutas de archivos
console.log(window.location.pathname);
// Verificar enlaces
document.querySelectorAll('a').forEach(link => console.log(link.href));
```

#### Responsividad rota
```css
/* Verificar media queries */
@media (max-width: 768px) {
    /* Estilos móviles */
}
```

### Herramientas de Desarrollo
- **Chrome DevTools**: Para debugging CSS y JavaScript
- **Lighthouse**: Para análisis de rendimiento
- **Responsive Design Mode**: Para testing móvil

## Deployment

### Preparación para Producción
1. **Minificar CSS y JS** (opcional para este proyecto)
2. **Optimizar imágenes** (ya implementado)
3. **Verificar rutas relativas**
4. **Testear en diferentes navegadores**

### Hosting
- **GitHub Pages**: Subir a repositorio y activar Pages
- **Netlify**: Drag & drop de la carpeta del proyecto
- **Vercel**: Conectar repositorio Git

## Créditos y Licencia

**Desarrollador:** Rodrigo Cáceres  
**Proyecto:** ASLI - Sistema de Rastreo de Carga  
**Tecnologías:** HTML5, CSS3, JavaScript ES6+  
**Fecha:** 2024

---

Para contribuciones o consultas técnicas, contactar al desarrollador principal. 