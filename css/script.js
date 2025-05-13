// Toggle menu saat hamburger diklik
const hamburger = document.getElementById('hamburger');
const pageNav = document.getElementById('pageNav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    // Toggle display menu
    if (hamburger.classList.contains('active')) {
        pageNav.style.display = 'flex';
    } else {
        pageNav.style.display = 'none';
    }
});

// Fungsi navigasi
function navigateTo(section) {
    alert('Navigasi ke: ' + section);
    // Contoh navigasi sebenarnya:
    // window.location.href = '#' + section;
    
    // Tutup menu setelah navigasi (opsional)
    hamburger.classList.remove('active');
    pageNav.style.display = 'none';
}
