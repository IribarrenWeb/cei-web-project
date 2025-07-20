document.addEventListener('DOMContentLoaded', () => {
    loadComponent('#loader', './modules/loader.html');
    loadComponent('#aside', './modules/aside.html');
    loadComponent('#about', './modules/about.html');
    loadComponent('#experience', './modules/experience.html');
    loadComponent('#skills', './modules/skills.html');
    
    const cursor = document.getElementById('light-cursor');
    const cursor2 = document.getElementById('light-cursor-two');
    const isDevice = window.matchMedia("(max-width: 768px)").matches;
    let cursorSwitch = false;

    document.addEventListener('mousemove', (e) => {
        if (isDevice) return;
        cursor.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    });

    function moveRandomRadialGradient() {
        cursorSwitch = !cursorSwitch;
        const cursorToMove = cursorSwitch ? cursor2 : cursor;
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);
        cursorToMove.style.background = `radial-gradient(600px at ${randomX}px ${randomY}px, rgba(29, 78, 216, 0.15), transparent 90%)`;

        if (!cursorSwitch) {
            switchAnimations(cursor2, true);
            switchAnimations(cursor, false);
        } else {
            switchAnimations(cursor, true);
            switchAnimations(cursor2, false);
        }
        
        setTimeout(() => moveRandomRadialGradient(), 2500);
    }

    function switchAnimations(element, isOut = false) {
        if (isOut) {
            element.classList.add('fade-out');
            element.classList.remove('fade-in');
        } else {
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        }
    }

    if (isDevice) {
        moveRandomRadialGradient();
    }
});

