window.addEventListener('load', async () => {
    await delay(500)

    // Inicializacion de variables
    const audioTyping = document.getElementById('audio-typing');
    const typedContainer = document.getElementById('typed-container');
    const cursor = document.getElementById('cursor');
    const body = document.querySelector('body');
    const loaderContainer = document.getElementById('loader');
    const toggleInit = document.getElementById('loader-toggle');
    
    // Texto a typear
    const words = [
        'Hello World!',
        'I\'m Keinher Iribarren',
        'a Full Stack Developer',
        'and this is my CV',
        'startPage("CV");',
    ];
    let playing = false;

    /**
     * Funcion que inicia el proceso de typeado
     */
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

        // Agrega la clase acordion que elimina
        // el loader y hace el body scrolleable
        loaderContainer.classList.add('acordion')
        body.style.overflowY = 'auto';
    }

    /**
     * Funcion que typea la palabra.
     * Recibe el ${tag} como parametro
     */
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

    /**
     * Activa o desactiva el audio del typeado
     */
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

    /**
     * Evento click para iniciar la "animacion" de typeado
     */
    toggleInit.addEventListener('click', () => {
        toggleInit.style.display = 'none';
        typedContainer.style.display = 'flex';
        delay(1500).then(()=> {
            init()
        })
    });

})