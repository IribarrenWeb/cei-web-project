document.addEventListener('DOMContentLoaded', async () => {
    loadComponent('#loader', './modules/loader.html');
    loadComponent('#aside', './modules/aside.html');
    loadComponent('#about', './modules/about.html');
    loadComponent('#experience', './modules/experience.html');
    loadComponent('#skills', './modules/skills.html');
    loadComponent('#footer', './modules/footer.html');
    loadComponent('#footer-inner', './modules/footer.html');
    
    const cursor = document.getElementById('light-cursor');
    const cursor2 = document.getElementById('light-cursor-two');
    const isDevice = window.matchMedia("(max-width: 1023px)").matches;

    
    let cursorSwitch = false;
    
    const radientColor = isDevice ? 'rgba(125, 156, 241, 0.22)' : 'rgba(29, 78, 216, 0.15)'

    document.addEventListener('mousemove', (e) => {
        if (isDevice) return;
        cursor.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, ${radientColor}, transparent 80%)`;
    });

    function moveRandomRadialGradient() {
        cursorSwitch = !cursorSwitch;
        const cursorToMove = cursorSwitch ? cursor2 : cursor;
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);
        cursorToMove.style.background = `radial-gradient(600px at ${randomX}px ${randomY}px, ${radientColor}, transparent 80%)`;

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

    const menuObserver = new IntersectionObserver((entries) => {
        console.log('menuObserver', entries);
        entries.forEach(entry => {
            console.log('activeMenu 1', entry);

            if (entry.isIntersecting) {
                const activeMenu = document.querySelector(`#aside-menu a[href="#${entry.target.id}"]`);
                console.log('activeMenu', activeMenu, entry.target.id);
                if (activeMenu) setMenuActive(activeMenu.parentElement);
            }
        });
    }, {
        threshold: 0.3
    });

    function setMenuActive(element) {
        const activeMenu = document.querySelector('#aside-menu .active');
        if (activeMenu) activeMenu.classList.remove('active');
        element.classList.add('active');
    }

    await delay(1000);
    
    const menus = document.querySelectorAll('#aside-menu a');
    console.log('menus', menus);
    menus.forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const parent = menu.parentElement;
            const sectionId = menu.getAttribute('href');
            const section = document.getElementById(sectionId.split('#')[1]);
            console.log('section', section);
            section.scrollIntoView({ behavior: 'smooth' });
            setMenuActive(parent);
        });
    });

    const sections = document.querySelectorAll('#experience, #skills, #about');
    console.log('sections', sections);
    if (sections.length === 0) {
        console.warn('No sections found for menu observer');
        return;
    } else {
        sections.forEach(section => {
            menuObserver.observe(section);
        });
    }

});

