// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved section in localStorage
    const lastSection = localStorage.getItem('lastSection') || 'pendahuluan';
    navigateTo(lastSection);

    // Hamburger menu setup
    const hamburger = document.getElementById('hamburger');
    const pageNav = document.getElementById('pageNav');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        pageNav.style.display = this.classList.contains('active') ? 'flex' : 'none';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !pageNav.contains(event.target)) {
            hamburger.classList.remove('active');
            pageNav.style.display = 'none';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const currentSection = document.querySelector('.content-section[style*="display: block"]').id;
        
        switch(e.key) {
            case 'ArrowLeft':
                navigateToPrevious(currentSection);
                break;
            case 'ArrowRight':
                navigateToNext(currentSection);
                break;
            case 'Escape':
                hamburger.classList.remove('active');
                pageNav.style.display = 'none';
                break;
        }
    });

    // Swipe detection for mobile
    let touchStartX = 0;
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        const currentSection = document.querySelector('.content-section[style*="display: block"]').id;

        if (Math.abs(diffX) > 50) {
            diffX > 0 ? navigateToNext(currentSection) : navigateToPrevious(currentSection);
        }
    });
});

// Navigation functions
function navigateTo(sectionId) {
    // Validation
    if (!document.getElementById(sectionId)) return;

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    targetSection.style.display = 'block';
    
    // Update URL hash
    window.location.hash = `#${sectionId}`;
    
    // Save to localStorage
    localStorage.setItem('lastSection', sectionId);
    
    // Close menu
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('pageNav').style.display = 'none';
    
    // Update aria-current for accessibility
    document.querySelectorAll('[aria-current]').forEach(el => el.removeAttribute('aria-current'));
    document.querySelector(`button[onclick="navigateTo('${sectionId}')"]`)
        .setAttribute('aria-current', 'true');
}

function navigateToNext(currentSection) {
    const sections = ['pendahuluan', 'pengamatan', 'penutup'];
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
        navigateTo(sections[currentIndex + 1]);
    }
}

function navigateToPrevious(currentSection) {
    const sections = ['pendahuluan', 'pengamatan', 'penutup'];
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
        navigateTo(sections[currentIndex - 1]);
    }
}

// Handle browser back/forward
window.addEventListener('hashchange', function() {
    const sectionId = window.location.hash.substring(1);
    if (sectionId) navigateTo(sectionId);
});

// Image gallery handling
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', function() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
        `;
        
        const enlargedImg = new Image();
        enlargedImg.src = this.src;
        enlargedImg.style.maxWidth = '90%';
        enlargedImg.style.maxHeight = '90%';
        enlargedImg.alt = this.alt;
        
        overlay.appendChild(enlargedImg);
        overlay.addEventListener('click', () => overlay.remove());
        
        document.body.appendChild(overlay);
    });
});
