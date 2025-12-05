function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;
    
    navbarContainer.style.minHeight = "60px";
    
    fetch('/html/Components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
            void navbarContainer.offsetHeight;
            setupNavbar();
        })
        .catch(error => console.error('Error loading navbar:', error));
}

// Main function to set up the navbar
function setupNavbar() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const titleElement = document.getElementById('dynamic-title');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Dinamic title
    const pageTitles = {
        'index.html': 'CODE MAKE SOFT',
        'about-us.html': 'NOSOTROS',
        'attune.html': 'ATTUNE',
        'manual.html': 'MANUAL',
        'diagrams.html': 'DIAGRAMAS'
    };
    if (titleElement && pageTitles[currentPage]) {
        titleElement.textContent = pageTitles[currentPage];
    }

    // Sidebar toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when nav is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Closed toggle on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Active links and hover effects
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPage) {
            link.classList.add('active');
        }
        
        link.addEventListener('mouseenter', () => {
            if (link.querySelector('i')) {
                link.querySelector('i').style.transform = 'scale(1.2)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (link.querySelector('i')) {
                link.querySelector('i').style.transform = 'scale(1)';
            }
        });
    });

    // Cerrar al redimensionar
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', loadNavbar);