window.addEventListener('load', async () => {
    await delay(2000)
    const audioTyping = document.getElementById('audio-typing');
    const typedName = document.getElementById('typed-name');
    const typedTitle = document.getElementById('typed-title');
    const cursor = document.getElementById('cursor');
    const cursorTwo = document.getElementById('cursor-two');
    const toggleInit = document.getElementById('loader-toggle');

    const name = 'Keinher Iribarren';
    const title = '<Full Stack Developer/>';
    let index = 0;
    let playing = false;
    
    function playTypingSound() {
        if (playing) audioTyping.pause();
        else {
            playing = true;
            audioTyping.currentTime = 0;
            audioTyping.volume = 0.5;
            audioTyping.play();
        }
    }

    function typeLetter(forTitle = false) {
        const toType = forTitle ? title : name;

        if (index < toType.length) {
            if (forTitle) typedTitle.textContent += toType[index];
            else typedName.textContent += toType[index];

            index++;
            
            let speed = Math.random() * 300;
            
            if (speed == 0) speed = 150;

            setTimeout(() => typeLetter(forTitle), speed);
        } else {
            index = 0;
            if (forTitle) {
                playTypingSound();
                cursorTwo.style.display = 'none';
            } else {
                typedTitle.style.display = 'inline-block';
                cursor.style.display = 'none';
                cursorTwo.style.display = 'inline-block';
                typeLetter(true);
            }
        }
    }


    toggleInit.addEventListener('click', () => {
        toggleInit.classList.remove('fade-in');
        toggleInit.classList.remove('pulse');
        toggleInit.classList.add('slide-up-out') 
        playTypingSound();
    });

    toggleInit.addEventListener('animationend', () => {
        toggleInit.style.display = 'none';
        document.getElementById('typed-container').style.display = 'flex';
        typeLetter();
    });

    toggleInit.addEventListener('mouseenter', () => {
        toggleInit.classList.remove('pulse');
    });

    toggleInit.addEventListener('mouseleave', () => {
        toggleInit.classList.add('pulse');
    });
})