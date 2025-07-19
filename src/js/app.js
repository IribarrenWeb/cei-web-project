document.addEventListener('DOMContentLoaded', () => {
    loadComponent('#loader', './modules/loader.html');
    loadComponent('#aside', './modules/aside.html');
    loadComponent('#about', './modules/about.html');
    loadComponent('#experience', './modules/experience.html');
    loadComponent('#skills', './modules/skills.html');
    
    const cursor = document.getElementById('light-cursor');
    const isDevice = window.matchMedia("(max-width: 768px)").matches;
    
    document.addEventListener('mousemove', (e) => {
        if (isDevice) return;
        cursor.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    });
    function moveRandomRadialGradient() {
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);
        cursor.style.background = `radial-gradient(600px at ${randomX}px ${randomY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
        setTimeout(() => {
            moveRandomRadialGradient();
        }, 1000);
    }

    if (isDevice) moveRandomRadialGradient();
});

