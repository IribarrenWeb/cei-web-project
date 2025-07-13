document.addEventListener('DOMContentLoaded', () => {
    loadComponent('#loader', './modules/loader.html');
    
    const cursor = document.getElementById('light-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

