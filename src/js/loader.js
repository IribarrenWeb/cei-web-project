window.addEventListener('load', async () => {
    await delay(500)
    const audioTyping = document.getElementById('audio-typing');
    const typedContainer = document.getElementById('typed-container');
    const cursor = document.getElementById('cursor');
    const body = document.querySelector('body');
    const loaderContainer = document.getElementById('loader');
    const toggleInit = document.getElementById('loader-toggle');
    let lastScrollTop = 0;
    const words = [
        'Hello World!',
        'I\'m Keinher Iribarren',
        'a Full Stack Developer',
        'and this is my CV',
        'startPage(pagetype);',
    ];
    let playing = false;
    let blockScroll = true;
    
    async function init() {
        let wordsProcessed = 0;
        do {
            if (wordsProcessed == 0) playTypingSound();

            const word = words[wordsProcessed];
            const isLastWord = wordsProcessed == (words.length - 1);
            if (isLastWord) {
                playTypingSound();
                await delay(1500)
                playTypingSound();
            }
            await typeWord(word,  isLastWord ? 'code' : 'span');

            wordsProcessed++;
            console.log('wordsProcessed', wordsProcessed, words.length)
            if (wordsProcessed == words.length) playTypingSound();

        } while (words.length > wordsProcessed)

        loaderContainer.classList.add('acordion')
        body.style.overflowY = 'auto';
    }

    async function typeWord(word, tag = 'span') {
        const newContainerMain = document.createElement('div')
        const newContainerWord = document.createElement(tag)
        const isCode = tag == 'code';
        let newCodeScript = null;
        // if (tag == 'code') {
        //     newContainerWord.style.fontSize = '1em';
        // }
        newContainerMain.style.display = 'flex';
        newContainerMain.style.alignItems = 'center';
        newContainerMain.appendChild(newContainerWord);
        if (isCode) {
            const newCodeCursor = document.createElement('span')
            newCodeScript = document.createElement('pre')
            newCodeCursor.appendChild(cursor)
            newContainerWord.appendChild(newCodeScript)
            newContainerWord.appendChild(newCodeCursor)
            await delay(500)
        } else newContainerMain.appendChild(cursor) 
        

        typedContainer.appendChild(newContainerMain);

        for (let index = 0; index < word.length; index++) {
            const letter = word[index];
            
            let speed = Math.random() * 250;
            
            if (speed == 0) speed = 100;

            await delay(speed);

            if (isCode) newCodeScript.innerHTML += letter;
            else newContainerWord.innerHTML += letter;
        
        }
    }

    function playTypingSound() {
        try {
            if (playing) {
                audioTyping.pause();
                playing = false;
            } else {
                playing = true;
                audioTyping.currentTime = 1;
                audioTyping.loop = true;
                audioTyping.playbackRate = 0.9;
                audioTyping.volume = 0.5;
                audioTyping.play();
            }
        } catch (error) {
            console.error(error)            
        }
    }

    toggleInit.addEventListener('click', () => {
        toggleInit.style.display = 'none';
        typedContainer.style.display = 'flex';
        delay(1500).then(()=> {
            init()
        })
    });

    loaderContainer.addEventListener('animationend', (a) => {
        if (a.animationName != 'acordion') return;
        blockScroll = false;
        window.removeEventListener('scroll', () => {});
    });

    window.addEventListener('scroll', (e) => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const isDevice = window.matchMedia("(max-width: 1023px)").matches;
        
        if (isDevice) return;

        if (currentScroll > lastScrollTop && blockScroll) {
            loaderContainer.classList.add('acordion');
            window.scrollTo(0, 0);
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });    
})