document.addEventListener('DOMContentLoaded', () => {
    const PEXELS_API_KEY = 'KNBxKvPN6kXEhKUzawtXtoEl0TMZJHePCgsPd4CQR2RVX0RZHJQbLsah';

    const hintModal = document.getElementById('hint-modal'),
        confirmLetterHintBtn = document.getElementById('confirm-letter-hint-btn'),
        confirmPictureHintBtn = document.getElementById('confirm-picture-hint-btn'),
        cancelHintBtn = document.getElementById('cancel-hint-btn'),
        levelTracker = document.getElementById('level-tracker'),
        pictureHintModal = document.getElementById('picture-hint-modal'),
        closePictureHintBtn = document.getElementById('close-picture-hint-btn'),
        pictureHintImg = document.getElementById('picture-hint-img'),
        aboutModal = document.getElementById('about-modal'),
        aboutBtn = document.getElementById('about-btn'),
        closeAboutBtn = document.getElementById('close-about-btn');
    const splashScreen = document.getElementById('splash-screen'), playerForm = document.getElementById('player-form'), difficultySelect = document.getElementById('difficulty-select'), gameContainer = document.getElementById('game-container'), welcomeMessage = document.getElementById('welcome-message'), musicToggle = document.getElementById('music-toggle'), puzzleContainer = document.getElementById('puzzle-container'), cluesContainer = document.getElementById('clues-container'), lettersContainer = document.getElementById('letters-container'), hintBtn = document.getElementById('hint-btn'), categoryDisplay = document.getElementById('category-display'), scoreDisplay = document.getElementById('score'), timerDisplay = document.getElementById('timer'), modal = document.getElementById('modal'), modalTitle = document.getElementById('modal-title'), modalMessage = document.getElementById('modal-message'), nextWordBtn = document.getElementById('next-word-btn'), certificateModal = document.getElementById('certificate-modal'), finalPlayerName = document.getElementById('final-player-name'), finalSchoolName = document.getElementById('final-school-name'), finalScore = document.getElementById('final-score'), shareBtn = document.getElementById('share-btn'), playAgainBtn = document.getElementById('play-again-btn'), confettiCanvas = document.getElementById('confetti-canvas'), bgMusic = document.getElementById('bg-music');
    const gameOverModal = document.getElementById('game-over-modal');
    const playAgainBtnGameOver = document.getElementById('play-again-btn-gameover');
    const totalPossibleScoreDisplay = document.getElementById('total-possible-score');

    const correctSound = document.getElementById('correct-sound'),
        cheerSound = document.getElementById('cheer-sound'),
        tapSound = document.getElementById('tap-sound'),
        failSound = document.getElementById('fail-sound'),
        sparkleSound = document.getElementById('sparkle-sound');
    const wordData = {
        easy: {
            Words: [
                { word: "CAT", img: "cute cat", mrMeaning: "मांजर" }, { word: "COW", img: "cow", mrMeaning: "गाय" }, { word: "DOG", img: "happy dog", mrMeaning: "कुत्रा" },
                { word: "ROSE", img: "red rose", mrMeaning: "गुलाब" }, { word: "GIRL", img: "girl", mrMeaning: "मुलगी" }, { word: "MOON", img: "full moon", mrMeaning: "चंद्र" },
                { word: "SUN", img: "sun", mrMeaning: "सूर्य" }, { word: "PEN", img: "pen on white background", mrMeaning: "पेन" }, { word: "CAR", img: "red car", mrMeaning: "कार" },
                { word: "BUS", img: "school bus", mrMeaning: "बस" }, { word: "SHIP", img: "ship at sea", mrMeaning: "जहाज" }
            ]
        },
        medium: {
            Words: [
                { word: "LOTUS", img: "lotus", mrMeaning: "कमळ" }, { word: "MANGO", img: "ripe mango", mrMeaning: "आंबा" }, { word: "PHONE", img: "smartphone", mrMeaning: "फोन" },
                { word: "TRUCK", img: "truck", mrMeaning: "ट्रक" }, { word: "SCHOOL", img: "school building", mrMeaning: "शाळा" }, { word: "PENCIL", img: "pencil", mrMeaning: "पेन्सिल" },
                { word: "BOARD", img: "chalkboard", mrMeaning: "फळा" }, { word: "WINDOW", img: "house window", mrMeaning: "खिडकी" }, { word: "GREEN", img: "green leaf", mrMeaning: "हिरवा" },
                { word: "CLOCK", img: "wall clock", mrMeaning: "घड्याळ" }, { word: "EIGHT", img: "number eight", mrMeaning: "आठ" }
            ]
        },
        hard: {
            "Animal Crossword": {
                gridSize: { rows: 5, cols: 5 },
                words: [
                    { word: "TIGER", img: "tiger", start: { row: 0, col: 0 }, dir: "h", clue: "National animal of India", mrMeaning: "वाघ" },
                    { word: "GOAT", img: "goat", start: { row: 0, col: 2 }, dir: "v", clue: "A farm animal that gives milk", mrMeaning: "शेळी" },
                    { word: "DOG", img: "golden retriever", start: { row: 1, col: 1 }, dir: "h", clue: "A loyal pet that barks", mrMeaning: "कुत्रा" }
                ],
                hints: { '0-2': 'G' }
            },

            "Fruit Crossword": {
                gridSize: { rows: 5, cols: 5 },
                words: [
                    { word: "MANGO", img: "mango slice", start: { row: 0, col: 0 }, dir: "v", clue: "National fruit of India", mrMeaning: "आंबा" },
                    { word: "GRAPE", img: "green grape", start: { row: 3, col: 0 }, dir: "h", clue: "Small fruits that grow in bunches", mrMeaning: "द्राक्ष" },
                    { word: "PEAR", img: "green pear", start: { row: 3, col: 3 }, dir: "vu", clue: "A sweet green fruit", mrMeaning: "नाशपाती" }
                ],
                hints: { '3-0': 'G' }
            },

            "Bird Crossword": {
                gridSize: { rows: 5, cols: 5 },
                words: [
                    { word: "CROW", img: "crow bird", start: { row: 2, col: 1 }, dir: "h", clue: "A black bird that says caw caw", mrMeaning: "कावळा" },
                    { word: "OWL", img: "owl", start: { row: 2, col: 3 }, dir: "vu", clue: "A bird that stays awake at night", mrMeaning: "घुबड" },
                    { word: "EAGLE", img: "eagle flying", start: { row: 0, col: 0 }, dir: "h", clue: "A strong bird with sharp eyesight", mrMeaning: "गरुड" }
                ],
                hints: { '1-3': 'W' }
            },

            "Color Crossword": {
                gridSize: { rows: 5, cols: 5 },
                words: [
                    { word: "RED", img: "red color", start: { row: 0, col: 1 }, dir: "v", clue: "Color of a rose", mrMeaning: "लाल" },
                    { word: "GREEN", img: "green color", start: { row: 0, col: 0 }, dir: "h", clue: "Color of grass", mrMeaning: "हिरवा" },
                    { word: "BLUE", img: "blue color", start: { row: 3, col: 2 }, dir: "vu", clue: "Color of the sky", mrMeaning: "निळा" }
                ],
                hints: { '0-2': 'E' }
            },

            "Transport Crossword": {
                gridSize: { rows: 5, cols: 5 },
                words: [
                    { word: "TRUCK", img: "toy truck", start: { row: 0, col: 2 }, dir: "v", clue: "Used to carry heavy goods", mrMeaning: "ट्रक" },
                    { word: "BUS", img: "city bus", start: { row: 2, col: 1 }, dir: "h", clue: "Many students travel to school in this", mrMeaning: "बस" },
                    { word: "CAR", img: "sports car", start: { row: 1, col: 0 }, dir: "h", clue: "A common family vehicle", mrMeaning: "कार" }
                ],
                hints: { '1-2': 'R' }
            },

            "Flower Crossword": {
                gridSize: { rows: 5, cols: 5 },
                words: [
                    { word: "ROSE", img: "pink rose", start: { row: 1, col: 0 }, dir: "h", clue: "A flower often given on special days", mrMeaning: "गुलाब" },
                    { word: "LOTUS", img: "lotus flower", start: { row: 0, col: 1 }, dir: "v", clue: "National flower of India", mrMeaning: "कमळ" },
                    { word: "LILY", img: "white lily", start: { row: 0, col: 1 }, dir: "h", clue: "A beautiful garden flower", mrMeaning: "लिली" }
                ],
                hints: { '1-1': 'O' }
            },

            "Object Crossword": {
                gridSize: { rows: 5, cols: 5 },
                words: [
                    { word: "BOOK", img: "old book", start: { row: 1, col: 1 }, dir: "v", clue: "Something you read", mrMeaning: "पुस्तक" },
                    { word: "POT", img: "cooking pot", start: { row: 3, col: 0 }, dir: "h", clue: "Used for cooking food", mrMeaning: "भांडे" },
                    { word: "LAMP", img: "desk lamp", start: { row: 0, col: 0 }, dir: "v", clue: "Gives light in a room", mrMeaning: "दिवा" }
                ],
                hints: { '3-1': 'O' }
            }
        }
    };

    let playerData = {}, currentLevelData = {}, gridSolution = null;
    let score = 0, initialTime = 0, timeLeft = 0, totalPossibleScore = 0;
    let timerInterval, draggedElement = null, isMusicOn = false, hasInteracted = false, isAlertModal = false;
    let totalPuzzlesInGame = 0, puzzlesCompleted = 0;
    let usedWordKeys = new Set();
    const myConfetti = confetti.create(confettiCanvas, { resize: true, useWorker: true });

    function setupEventListeners() {
        playerForm.addEventListener('submit', startGame);
        hintBtn.addEventListener('click', openHintModal);
        cancelHintBtn.addEventListener('click', () => hintModal.classList.add('hidden'));
        confirmLetterHintBtn.addEventListener('click', useLetterHint);
        confirmPictureHintBtn.addEventListener('click', usePictureHint);
        musicToggle.addEventListener('click', toggleMusic);
        nextWordBtn.addEventListener('click', () => {
            if (isAlertModal) {
                modal.classList.add('hidden');
            } else {
                generateLevel();
            }
        });
        playAgainBtn.addEventListener('click', () => location.reload());
        playAgainBtnGameOver.addEventListener('click', () => location.reload());
        shareBtn.addEventListener('click', shareScore);
        closePictureHintBtn.addEventListener('click', () => pictureHintModal.classList.add('hidden'));
        aboutBtn.addEventListener('click', () => aboutModal.classList.remove('hidden'));
        closeAboutBtn.addEventListener('click', () => aboutModal.classList.add('hidden'));
        
        const triggerInteraction = () => {
            initialUserInteraction();
            ['click', 'focusin', 'input', 'keydown'].forEach(evt => {
                document.removeEventListener(evt, triggerInteraction);
            });
        };
        ['click', 'focusin', 'input', 'keydown'].forEach(evt => {
            document.addEventListener(evt, triggerInteraction);
        });
    }

    function initialUserInteraction() {
        if (hasInteracted) return;
        hasInteracted = true;
        playMusic();
    }

    function playSound(sound) {
        if (isMusicOn && sound) {
            if (sound === bgMusic) {
                if (!splashScreen.classList.contains('hidden')) {
                    sound.volume = 0.20;
                } else {
                    sound.volume = 0.10;
                }
            } else if (sound === correctSound) {
                sound.volume = 0.40;
            } else if (sound === cheerSound) {
                sound.volume = 0.40;
            } else if (sound === tapSound) {
                sound.volume = 0.30;
            } else if (sound === failSound) {
                sound.volume = 0.35;
            } else if (sound === sparkleSound) {
                sound.volume = 0.40;
            }
            sound.currentTime = 0;
            sound.play().catch(err => {});
        }
    }

    function playMusic() {
        if (hasInteracted) {
            try {
                bgMusic.volume = 0.20;
                bgMusic.play();
                isMusicOn = true;
                musicToggle.textContent = '🔊';
            } catch (err) { }
        }
    }
    playMusic();
    setupEventListeners();

    function handleDragStart(e) { draggedElement = e.target; setTimeout(() => e.target.classList.add('opacity-50'), 0); };
    function handleDragEnd() { if (draggedElement) draggedElement.classList.remove('opacity-50'); draggedElement = null; };
    function handleDragOver(e) { e.preventDefault(); const t = e.target.closest('.puzzle-slot'); if (t && !t.firstElementChild) t.classList.add('drag-over'); };
    function handleDragLeave(e) { const t = e.target.closest('.puzzle-slot'); if (t) t.classList.remove('drag-over'); };
    function handleDrop(e) { e.preventDefault(); const target = e.target.closest('.puzzle-slot'); if (target) { target.classList.remove('drag-over'); if (target && !target.firstElementChild) { target.appendChild(draggedElement); playSound(tapSound); checkCompletion(); } } };
    lettersContainer.addEventListener('dragover', e => e.preventDefault());
    lettersContainer.addEventListener('drop', e => { e.preventDefault(); if (draggedElement) lettersContainer.appendChild(draggedElement); });
    function startGame(e) {
        e.preventDefault();
        puzzlesCompleted = 0;
        score = 0;
        usedWordKeys.clear();
        updateScore(0);
        const name = document.getElementById('player-name').value;
        playerData = { name: name.trim(), firstName: name.trim().split(' ')[0], std: document.getElementById('player-std').value, school: document.getElementById('player-school').value, difficulty: difficultySelect.value };

        if (playerData.difficulty === 'hard') {
            totalPuzzlesInGame = Object.keys(wordData.hard).length;
        } else {
            totalPuzzlesInGame = Object.keys(wordData[playerData.difficulty]).reduce((sum, category) => sum + wordData[playerData.difficulty][category].length, 0);
        }

        totalPossibleScore = totalPuzzlesInGame * 25;

        switch (playerData.difficulty) {
            case 'easy': initialTime = 60; break;
            case 'medium': initialTime = 80; break;
            case 'hard': initialTime = 120; break;
        }

        if (isMusicOn) {
            bgMusic.volume = 0.10;
            musicToggle.textContent = '🔊';
        } else {
            try {
                bgMusic.volume = 0.10;
                bgMusic.play();
                isMusicOn = true;
                musicToggle.textContent = '🔊';
            } catch (err) {
                musicToggle.textContent = '🔇';
            }
        }
        welcomeMessage.textContent = `Let's go, ${playerData.firstName}!`;
        splashScreen.classList.add('hidden'); gameContainer.classList.remove('hidden'); gameContainer.classList.add('flex');
        startTimer();
        generateLevel();
    }

    function generateLevel() {
        modal.classList.add('hidden');
        if (puzzlesCompleted >= totalPuzzlesInGame) {
            endGame();
            return;
        }
        puzzlesCompleted++;
        levelTracker.textContent = `Puzzle: ${puzzlesCompleted} / ${totalPuzzlesInGame}`;
        timeLeft = initialTime;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        puzzleContainer.innerHTML = '';
        cluesContainer.innerHTML = '';
        lettersContainer.innerHTML = '';
        const difficulty = playerData.difficulty;
        if (difficulty === 'easy' || difficulty === 'medium') {
            cluesContainer.classList.add('hidden');
            generateSingleWordUI(difficulty);
        } else {
            cluesContainer.classList.remove('hidden');
            generateCrosswordUI();
        }
    }

    function getUniqueLevel(difficulty) {
        if (difficulty === 'hard') {
            const categories = Object.keys(wordData.hard);
            const available = categories.filter(cat => !usedWordKeys.has(cat));
            if (available.length === 0) {
                usedWordKeys.clear();
                return getUniqueLevel(difficulty);
            }
            const category = available[Math.floor(Math.random() * available.length)];
            usedWordKeys.add(category);
            const level = wordData.hard[category];
            return { level, category };
        } else {
            const availableLevels = [];
            Object.keys(wordData[difficulty]).forEach(category => {
                wordData[difficulty][category].forEach(level => {
                    if (!usedWordKeys.has(level.word)) {
                        availableLevels.push({ level, category });
                    }
                });
            });
            if (availableLevels.length === 0) {
                usedWordKeys.clear();
                return getUniqueLevel(difficulty);
            }
            const selected = availableLevels[Math.floor(Math.random() * availableLevels.length)];
            usedWordKeys.add(selected.level.word);
            return selected;
        }
    }

    function generateSingleWordUI(difficulty) {
        const { level, category } = getUniqueLevel(difficulty);
        currentLevelData = level;
        categoryDisplay.textContent = `Category: ${category}`;
        puzzleContainer.className = 'flex flex-wrap justify-center gap-2 p-4';
        const word = currentLevelData.word;
        const hintIndex = 0;
        word.split('').forEach((letter, i) => { const slot = document.createElement('div'); slot.className = 'puzzle-slot'; if (i === hintIndex) { slot.textContent = letter; slot.classList.add('hint'); } else { slot.addEventListener('dragover', handleDragOver); slot.addEventListener('dragleave', handleDragLeave); slot.addEventListener('drop', handleDrop); } puzzleContainer.appendChild(slot); });
        const lettersToDrag = word.split('').filter((_, i) => i !== hintIndex);
        lettersToDrag.sort(() => Math.random() - 0.5).forEach(letter => createLetterTile(letter));
    }

    function generateCrosswordUI() {
        const { level, category } = getUniqueLevel('hard');
        currentLevelData = level;
        categoryDisplay.textContent = category;
        puzzleContainer.className = 'game-grid';
        const { gridSize, words, hints } = currentLevelData;
        gridSolution = Array(gridSize.rows).fill(null).map(() => Array(gridSize.cols).fill(null));
        let lettersToPlace = {};

        const clueList = document.createElement('ul');
        const clueHeader = document.createElement('h3');
        clueHeader.textContent = "Clues";
        cluesContainer.appendChild(clueHeader);
        words.forEach(({ word, clue }, index) => { const li = document.createElement('li'); li.textContent = `${index + 1}. ${clue} [${word.length}]`; clueList.appendChild(li); });
        cluesContainer.appendChild(clueList);

        const addedCoordinates = new Set();
        words.forEach(({ word, start, dir }) => {
            for (let i = 0; i < word.length; i++) {
                let r = start.row;
                let c = start.col;

                if (dir === 'h') r = start.row, c = start.col + i;              // → horizontal (right)
                else if (dir === 'v') r = start.row + i, c = start.col;         // ↓ vertical down
                else if (dir === 'vu') r = start.row - i, c = start.col;        // ↑ vertical up

                gridSolution[r][c] = word[i];

                const coordKey = `${r}-${c}`;
                if (!hints[coordKey] && !addedCoordinates.has(coordKey)) {
                    lettersToPlace[word[i]] = (lettersToPlace[word[i]] || 0) + 1;
                    addedCoordinates.add(coordKey);
                }
            }
        });


        for (let r = 0; r < gridSize.rows; r++) {
            for (let c = 0; c < gridSize.cols; c++) {
                const slot = document.createElement('div');
                slot.className = 'puzzle-slot';
                if (gridSolution[r][c]) {
                    slot.dataset.row = r; slot.dataset.col = c;
                    if (hints[`${r}-${c}`]) { slot.textContent = hints[`${r}-${c}`]; slot.classList.add('hint'); }
                    else { slot.addEventListener('dragover', handleDragOver); slot.addEventListener('dragleave', handleDragLeave); slot.addEventListener('drop', handleDrop); }
                } else { slot.classList.add('impassable'); }
                puzzleContainer.appendChild(slot);
            }
        }
        Object.entries(lettersToPlace).flatMap(([letter, count]) => Array(count).fill(letter)).sort(() => Math.random() - 0.5).forEach(letter => createLetterTile(letter));
    }
    function openHintModal() {
        if (playerData.difficulty === 'hard') {
            confirmPictureHintBtn.style.display = 'none';
            confirmLetterHintBtn.textContent = 'Reveal Letter (-15 Points)';
        } else {
            confirmPictureHintBtn.style.display = 'block';
            confirmLetterHintBtn.textContent = 'Reveal Letter (-10 Points)';
        }
        hintModal.classList.remove('hidden');
    }

    function useLetterHint() {
        hintModal.classList.add('hidden');
        const emptySlots = [...puzzleContainer.querySelectorAll('.puzzle-slot:not(.impassable):not(.hint)')].filter(s => !s.firstElementChild);
        if (emptySlots.length === 0) return;

        if (score <= -50) { showModal(false, "You have reached the minimum score limit!", "Notice", true); return; }

        let targetSlot, correctLetter;
        if (playerData.difficulty === 'hard') {
            targetSlot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
            const r = targetSlot.dataset.row, c = targetSlot.dataset.col;
            correctLetter = gridSolution[r][c];
        } else {
            targetSlot = emptySlots[0];
            const slotIndex = [...puzzleContainer.children].indexOf(targetSlot);
            correctLetter = currentLevelData.word[slotIndex];
        }
        const letterTile = [...document.querySelectorAll('.letter-box')].find(tile => tile.textContent === correctLetter && tile.parentElement !== targetSlot);
        if (letterTile) {
            const pointsToDeduct = playerData.difficulty === 'hard' ? -15 : -10;
            updateScore(pointsToDeduct);

            targetSlot.appendChild(letterTile);
            targetSlot.classList.add('hint', 'filled');
            targetSlot.removeEventListener('dragover', handleDragOver);
            targetSlot.removeEventListener('dragleave', handleDragLeave);
            targetSlot.removeEventListener('drop', handleDrop);
            playSound(sparkleSound);
            checkCompletion();
        }
    }

    async function usePictureHint() {
        hintModal.classList.add('hidden');
        if (score <= -50) { showModal(false, "You have reached the minimum score limit!", "Notice", true); return; }

        const success = await fetchAndShowPicture();
        if (success) {
            updateScore(-5);
        } else {
            showModal(false, "Could not load image hint. No points deducted.", "Notice", true);
        }
    }

    async function fetchAndShowPicture() {
        let imageKeyword = (playerData.difficulty === 'hard') ? currentLevelData.words[0].img : currentLevelData.img;
        const loadingUrl = `https://placehold.co/400x300/EFEFEF/333333?text=Loading...`;
        const notFoundUrl = `https://placehold.co/400x300/EFEFEF/333333?text=Image+Not+Found`;
        pictureHintModal.classList.remove('hidden');
        pictureHintImg.src = loadingUrl;
        if (!PEXELS_API_KEY || PEXELS_API_KEY === 'YOUR_PEXELS_API_KEY_GOES_HERE') {
            pictureHintImg.src = notFoundUrl;
            return false;
        }
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${imageKeyword}&per_page=1`, { headers: { Authorization: PEXELS_API_KEY } });
            if (!response.ok) throw new Error('Pexels API failed');
            const data = await response.json();
            if (data.photos && data.photos.length > 0) {
                pictureHintImg.src = data.photos[0].src.medium;
                return true;
            } else {
                pictureHintImg.src = notFoundUrl;
                return false;
            }
        } catch (error) {
            pictureHintImg.src = notFoundUrl;
            return false;
        }
    }
    function showModal(isSuccess, message, customTitle, isAlert = false) {
        modal.classList.remove('hidden');
        modalTitle.textContent = customTitle || (isSuccess ? 'Awesome!' : 'Oops!');
        modalMessage.innerHTML = message;
        isAlertModal = isAlert;
        if (isAlert) {
            nextWordBtn.textContent = 'OK';
        } else {
            if (puzzlesCompleted >= totalPuzzlesInGame) { nextWordBtn.textContent = 'Finish Game'; }
            else { nextWordBtn.textContent = 'Next Puzzle'; }
        }
    }

    function checkCompletion() {
        const slots = puzzleContainer.querySelectorAll('.puzzle-slot:not(.impassable):not(.hint)');
        if ([...slots].some(s => !s.firstElementChild)) return;
        let isCorrect = (playerData.difficulty === 'hard') ? checkCrosswordSolution() : [...puzzleContainer.children].map(slot => slot.firstElementChild ? slot.firstElementChild.textContent : slot.textContent).join('') === currentLevelData.word;
        if (isCorrect) {
            updateScore(25);
            myConfetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
            playSound(correctSound);
            
            if (playerData.difficulty === 'hard') {
                let messageHtml = `<div class="flex flex-col gap-2 mt-2 items-center">`;
                currentLevelData.words.forEach(w => {
                    messageHtml += `<div class="text-xl font-bold text-violet-700">${w.word} &rarr; <span class="text-green-600">${w.mrMeaning}</span></div>`;
                });
                messageHtml += `</div>`;
                showModal(true, messageHtml, '🎉 Crossword Solved!');
            } else {
                const messageHtml = `
                    <div class="text-center">
                        <div class="text-3xl font-extrabold text-violet-700 mb-4">${currentLevelData.word}</div>
                        <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Marathi Meaning:</div>
                        <div class="text-2xl font-bold text-green-600">${currentLevelData.mrMeaning}</div>
                    </div>
                `;
                showModal(true, messageHtml, '🎉 Correct!');
            }
        } else {
            puzzleContainer.classList.add('shake');
            setTimeout(() => puzzleContainer.classList.remove('shake'), 500);
            playSound(failSound);
        }
    }

    function checkCrosswordSolution() {
        return currentLevelData.words.every(({ word, start, dir }) => {
            let constructedWord = '';
            for (let i = 0; i < word.length; i++) {
                let r, c;
                if (dir === 'h') {
                    r = start.row;
                    c = start.col + i;
                } else if (dir === 'v') {
                    r = start.row + i;
                    c = start.col;
                } else if (dir === 'vu') {
                    r = start.row - i;
                    c = start.col;
                }

                const slot = puzzleContainer.querySelector(`[data-row='${r}'][data-col='${c}']`);
                // Safety check in case of bad data
                if (!slot) return false;
                constructedWord += slot.firstElementChild ? slot.firstElementChild.textContent : slot.textContent;
            }
            return constructedWord === word;
        });
    }

    function startTimer() { clearInterval(timerInterval); timerInterval = setInterval(() => { timeLeft--; timerDisplay.textContent = `Time: ${timeLeft}`; if (timeLeft <= 0) { clearInterval(timerInterval); endGame(); } }, 1000); }
    function updateScore(points) { if (points !== 0) score += points; scoreDisplay.textContent = `Score: ${score}`; if (points !== 0) { const flashClass = points > 0 ? 'flash-green' : 'flash-red'; scoreDisplay.classList.add(flashClass); setTimeout(() => scoreDisplay.classList.remove(flashClass), 500); } }
    function toggleMusic() {
        isMusicOn = !isMusicOn;
        if (isMusicOn) {
            if (!splashScreen.classList.contains('hidden')) {
                bgMusic.volume = 0.20;
            } else {
                bgMusic.volume = 0.10;
            }
            bgMusic.play();
            musicToggle.textContent = '🔊';
        } else {
            bgMusic.pause();
            musicToggle.textContent = '🔇';
        }
    }
    function createLetterTile(letter) { const tile = document.createElement('div'); tile.className = 'letter-box'; tile.textContent = letter; tile.draggable = true; tile.addEventListener('dragstart', handleDragStart); tile.addEventListener('dragend', handleDragEnd); lettersContainer.appendChild(tile); }
    function maskWord(word) { return word.length <= 2 ? word : `${word[0]}${' _ '.repeat(word.length - 2)}${word[word.length - 1]}`; }
    function toTitleCase(str) { return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); }
    function endGame() {
        clearInterval(timerInterval);
        gameContainer.classList.add('hidden');
        modal.classList.add('hidden');
        if (score > 0) {
            finalPlayerName.textContent = toTitleCase(playerData.name);
            finalSchoolName.textContent = playerData.school;
            finalScore.textContent = score;
            totalPossibleScoreDisplay.textContent = totalPossibleScore;
            certificateModal.classList.remove('hidden');
            playSound(cheerSound);
        } else {
            gameOverModal.classList.remove('hidden');
        }
    }

    async function shareScore() {
        const element = certificateModal.querySelector('.certificate-content');
        if (!element) return;
        try {
            const canvas = await html2canvas(element, { scale: 2, backgroundColor: null });
            canvas.toBlob(async (blob) => {
                if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'certificate.png', { type: 'image/png' })] })) {
                    const file = new File([blob], 'certificate.png', { type: 'image/png' });
                    await navigator.share({
                        title: 'My Word Builders Score!',
                        text: `I scored ${score} in the Word Builders Game! Check out my certificate. Created by @OmKarkele`,
                        files: [file]
                    });
                } else {
                    showModal(false, 'Sharing is not supported on this browser.', 'Notice', true);
                }
            }, 'image/png');
        } catch (err) {
            showModal(false, 'Oops, something went wrong while sharing.', 'Oops!', true);
        }
    }
});

