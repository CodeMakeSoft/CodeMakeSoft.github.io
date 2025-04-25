// Función para cargar la navbar
function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;
    
    // ★ Añade un espacio reservado para evitar saltos al cargar
    navbarContainer.style.minHeight = "60px"; // Misma altura que tu navbar
    
    fetch('/html/Components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
            // ★ Fuerza el repintado del navegador
            void navbarContainer.offsetHeight; 
            setupNavbar();
        })
        .catch(error => console.error('Error loading navbar:', error));
}

// Función para configurar la navbar
function setupNavbar() {
    // Actualizar título dinámico
    const pageTitles = {
        'index.html': 'CODE MAKE SOFT',
        'diagrams.html': 'DIAGRAMAS',
        'dictionary.html': 'DICCIONARIO',
        'manual.html': 'MANUAL'
    };
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const titleElement = document.getElementById('dynamic-title');
    
    if (titleElement && pageTitles[currentPage]) {
        titleElement.textContent = pageTitles[currentPage];
    }
    
    // Marcar enlace activo
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPage) {
            link.classList.add('active');
        }
        
        // Añadir efecto hover
        link.addEventListener('mouseenter', () => {
            link.querySelector('i').style.transform = 'scale(1.2)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.querySelector('i').style.transform = 'scale(1)';
        });
    });
}

// Cargar al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    
    // Otros scripts que ya tengas...
});