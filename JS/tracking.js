// ===== TRACKING PAGE SPECIFIC FUNCTIONS =====

// Función para crear aviones en la sección de tracking
function createTrackingPlanes() {
    const trackingHero = document.querySelector('.tracking-hero');
    if (!trackingHero) return;

    // Definir puntos fijos (simulan ciudades)
    const points = [
        { x: 15, y: 80 },
        { x: 30, y: 40 },
        { x: 50, y: 70 },
        { x: 70, y: 30 },
        { x: 85, y: 60 },
        { x: 60, y: 20 },
        { x: 40, y: 15 },
        { x: 80, y: 10 }
    ];

    // Crear aviones que viajan entre pares de puntos
    for (let i = 0; i < 8; i++) {
        const from = points[Math.floor(Math.random() * points.length)];
        let to;
        do {
            to = points[Math.floor(Math.random() * points.length)];
        } while (to === from);

        const plane = document.createElement('i');
        plane.className = 'fas fa-plane plane-particle';
        const size = Math.random() * 16 + 10;
        plane.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            color: #b0c4de;
            opacity: 0.7;
            left: ${from.x}%;
            top: ${from.y}%;
            transform: rotate(0deg);
            pointer-events: none;
            z-index: 3;
        `;
        trackingHero.appendChild(plane);

        // Animar el avión de from a to
        animateTrackingPlane(plane, from, to, size);
    }
}

function animateTrackingPlane(plane, from, to, size) {
    const duration = Math.random() * 8 + 8; // 8-16s
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    plane.style.transform = `rotate(${angle}deg)`;

    plane.animate([
        { left: from.x + '%', top: from.y + '%', opacity: 0.7 },
        { left: to.x + '%', top: to.y + '%', opacity: 0.1 }
    ], {
        duration: duration * 1000,
        easing: 'linear',
        fill: 'forwards'
    });

    setTimeout(() => {
        // Reiniciar el viaje con nuevos puntos
        const points = [
            { x: 15, y: 80 },
            { x: 30, y: 40 },
            { x: 50, y: 70 },
            { x: 70, y: 30 },
            { x: 85, y: 60 },
            { x: 60, y: 20 },
            { x: 40, y: 15 },
            { x: 80, y: 10 }
        ];
        let newFrom = to;
        let newTo;
        do {
            newTo = points[Math.floor(Math.random() * points.length)];
        } while (newTo === newFrom);
        animateTrackingPlane(plane, newFrom, newTo, size);
    }, duration * 1000);
}

// Función para manejar el formulario de tracking
function initTrackingForm() {
    const trackingForm = document.getElementById('trackingForm');
    const trackingResults = document.getElementById('trackingResults');
    const noResults = document.getElementById('noResults');

    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const trackingNumber = document.getElementById('trackingNumber').value;
            const trackingType = document.getElementById('trackingType').value;
            
            if (!trackingNumber || !trackingType) {
                showTrackingNotification('Por favor completa todos los campos', 'error');
                return;
            }
            
            // Simular búsqueda de tracking
            simulateTrackingSearch(trackingNumber, trackingType);
        });
    }
}

// Función para simular la búsqueda de tracking
function simulateTrackingSearch(trackingNumber, trackingType) {
    const trackingResults = document.getElementById('trackingResults');
    const noResults = document.getElementById('noResults');
    
    // Mostrar loading
    showTrackingNotification('Buscando información de tu carga...', 'info');
    
    // Simular delay de búsqueda
    setTimeout(() => {
        // Simular resultado (en un caso real, aquí se haría la llamada a la API)
        const mockData = generateMockTrackingData(trackingNumber, trackingType);
        
        if (mockData) {
            displayTrackingResults(mockData);
            trackingResults.style.display = 'block';
            noResults.style.display = 'none';
        } else {
            trackingResults.style.display = 'none';
            noResults.style.display = 'block';
        }
    }, 2000);
}

// Función para generar datos mock de tracking
function generateMockTrackingData(trackingNumber, trackingType) {
    // Simular que algunos números de tracking existen
    if (trackingNumber.length >= 8) {
        const statuses = ['En Tránsito', 'En Puerto', 'Despachado', 'Entregado'];
        const origins = ['Valparaíso, Chile', 'San Antonio, Chile', 'Antofagasta, Chile'];
        const destinations = ['Shanghai, China', 'Rotterdam, Holanda', 'Los Angeles, USA'];
        
        return {
            number: trackingNumber,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            origin: origins[Math.floor(Math.random() * origins.length)],
            destination: destinations[Math.floor(Math.random() * destinations.length)],
            eta: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES'),
            timeline: generateMockTimeline()
        };
    }
    return null;
}

// Función para generar timeline mock
function generateMockTimeline() {
    const events = [
        { date: '2025-01-15', status: 'Carga recibida en puerto', location: 'Valparaíso, Chile' },
        { date: '2025-01-16', status: 'Documentación completada', location: 'Valparaíso, Chile' },
        { date: '2025-01-17', status: 'Carga embarcada', location: 'Valparaíso, Chile' },
        { date: '2025-01-20', status: 'En tránsito', location: 'Océano Pacífico' },
        { date: '2025-01-25', status: 'Llegada a puerto destino', location: 'Shanghai, China' },
        { date: '2025-01-26', status: 'Despacho aduanero', location: 'Shanghai, China' }
    ];
    
    return events;
}

// Función para mostrar resultados de tracking
function displayTrackingResults(data) {
    document.getElementById('resultNumber').textContent = data.number;
    document.getElementById('resultStatus').textContent = data.status;
    document.getElementById('resultOrigin').textContent = data.origin;
    document.getElementById('resultDestination').textContent = data.destination;
    document.getElementById('resultETA').textContent = data.eta;
    
    // Mostrar timeline
    const timeline = document.getElementById('trackingTimeline');
    timeline.innerHTML = '';
    
    data.timeline.forEach(event => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${new Date(event.date).toLocaleDateString('es-ES')}</div>
                <div class="timeline-status">${event.status}</div>
                <div class="timeline-location">${event.location}</div>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

// Función para mostrar notificaciones
function showTrackingNotification(message, type = 'info') {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = `tracking-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#44ff44' : '#008cff'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar partículas para todas las secciones con un pequeño delay
    setTimeout(() => {
        if (typeof window.initializeParticles === 'function') {
            window.initializeParticles();
        }
    }, 100);
    
    createTrackingPlanes();
    initTrackingForm();
    
    // Agregar estilos para animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}); 