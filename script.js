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
          cheerSound = document.getElementById('cheer-sound');
    const wordData = {
        easy: {
          Words: [
            { word: "CAT", img: "cute cat" }, { word: "COW", img: "cow" }, { word: "DOG", img: "happy dog" },
            { word: "ROSE", img: "red rose" }, { word: "GIRL", img: "girl" }, { word: "MOON", img: "full moon" },
            { word: "SUN", img: "sun" }, { word: "PEN", img: "pen on white background" }, { word: "CAR", img: "red car" },
            { word: "BUS", img: "school bus" }, { word: "SHIP", img: "ship at sea" }
          ]
        },
        medium: {
          Words: [
            { word: "LOTUS", img: "lotus" }, { word: "MANGO", img: "ripe mango" }, { word: "PHONE", img: "smartphone" },
            { word: "TRUCK", img: "truck" }, { word: "SCHOOL", img: "school building" }, { word: "PENCIL", img: "pencil" },
            { word: "BOARD", img: "chalkboard" }, { word: "WINDOW", img: "house window" }, { word: "GREEN", img: "green leaf" },
            { word: "CLOCK", img: "wall clock" }, { word: "EIGHT", img: "number eight" }
          ]
        },
        hard: {
          "Animal Crossword": {
            gridSize: { rows: 5, cols: 5 },
            words: [
              { word: "TIGER", img: "tiger", start: { row: 0, col: 0 }, dir: "h" },
              { word: "GOAT", img: "goat", start: { row: 0, col: 2 }, dir: "v" },
              { word: "DOG", img: "golden retriever", start: { row: 1, col: 1 }, dir: "h" }
            ],
            hints: { '0-2': 'G' }
          },
          "Fruit Crossword": {
            gridSize: { rows: 5, cols: 5 },
            words: [
              { word: "MANGO", img: "mango slice", start: { row: 0, col: 0 }, dir: "v" },
              { word: "GRAPE", img: "green grape", start: { row: 3, col: 0 }, dir: "h" },
              { word: "PEAR", img: "green pear", start: { row: 3, col: 3 }, dir: "vu" }
            ],
            hints: { '3-0': 'G' }
          },
          "Bird Crossword": {
            gridSize: { rows: 5, cols: 5 },
            words: [
              { word: "CROW", img: "crow bird", start: { row: 2, col: 1 }, dir: "h" },
              { word: "OWL", img: "owl", start: { row: 2, col: 3 }, dir: "vu" },
              { word: "EAGLE", img: "eagle flying", start: { row: 0, col: 0 }, dir: "h" }
            ],
            hints: { '1-3': 'W' }
          },
          "Color Crossword": {
            gridSize: { rows: 5, cols: 5 },
            words: [
              { word: "RED", img: "red color", start: { row: 0, col: 1 }, dir: "v" },
              { word: "GREEN", img: "green color", start: { row: 0, col: 0 }, dir: "h" },
              { word: "BLUE", img: "blue color", start: { row: 3, col: 2 }, dir: "vu" }
            ],
            hints: { '0-2': 'E' }
          },
          "Transport Crossword": {
            gridSize: { rows: 5, cols: 5 },
            words: [
              { word: "TRUCK", img: "toy truck", start: { row: 0, col: 2 }, dir: "v" },
              { word: "BUS", img: "city bus", start: { row: 2, col: 1 }, dir: "h" },
              { word: "CAR", img: "sports car", start: { row: 1, col: 0 }, dir: "h" }
            ],
            hints: { '1-2': 'R' }
          },
          "Flower Crossword": {
            gridSize: { rows: 5, cols: 5 },
            words: [
              { word: "ROSE", img: "pink rose", start: { row: 1, col: 0 }, dir: "h" },
              { word: "LOTUS", img: "lotus flower", start: { row: 0, col: 1 }, dir: "v" },
              { word: "LILY", img: "white lily", start: { row: 0, col: 1 }, dir: "h" }
            ],
            hints: { '1-1': 'O' }
          },
          "Object Crossword": { // CORRECTED
            gridSize: { rows: 5, cols: 5 },
            words: [
              { word: "BOOK", img: "old book", start: { row: 1, col: 1 }, dir: "v" },
              { word: "POT", img: "cooking pot", start: { row: 3, col: 0 }, dir: "h" },
              { word: "LAMP", img: "desk lamp", start: { row: 0, col: 0 }, dir: "v" }
            ],
            hints: { '3-1': 'O' }
          }
        }
    };

    let playerData = {}, currentLevelData = {}, gridSolution = null;
    let score = 0, initialTime = 0, timeLeft = 0, totalPossibleScore = 0;
    let timerInterval, draggedElement = null, isMusicOn = false, hasInteracted = false;
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
        nextWordBtn.addEventListener('click', generateLevel);
        playAgainBtn.addEventListener('click', () => location.reload());
        playAgainBtnGameOver.addEventListener('click', () => location.reload());
        shareBtn.addEventListener('click', shareScore);
        closePictureHintBtn.addEventListener('click', () => pictureHintModal.classList.add('hidden'));
        aboutBtn.addEventListener('click', () => aboutModal.classList.remove('hidden'));
        closeAboutBtn.addEventListener('click', () => aboutModal.classList.add('hidden'));
        document.body.addEventListener('click', initialUserInteraction, { once: true });
    }
    
    function initialUserInteraction() {
        hasInteracted = true;
        if (!isMusicOn) playMusic();
    }
    
    function playMusic() {
        if (hasInteracted) {
            try { bgMusic.play(); isMusicOn = true; } catch (err) {}
        }
    }
    playMusic();
    setupEventListeners();

    function handleDragStart(e) { draggedElement = e.target; setTimeout(() => e.target.classList.add('opacity-50'), 0); };
    function handleDragEnd() { if (draggedElement) draggedElement.classList.remove('opacity-50'); draggedElement = null; };
    function handleDragOver(e) { e.preventDefault(); const t = e.target.closest('.puzzle-slot'); if (t && !t.firstElementChild) t.classList.add('drag-over'); };
    function handleDragLeave(e) { const t = e.target.closest('.puzzle-slot'); if (t) t.classList.remove('drag-over'); };
    function handleDrop(e) { e.preventDefault(); const target = e.target.closest('.puzzle-slot'); if (target) { target.classList.remove('drag-over'); if (target && !target.firstElementChild) { target.appendChild(draggedElement); correctSound.currentTime = 0; correctSound.play(); checkCompletion(); } } };
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

        bgMusic.pause(); isMusicOn = false; musicToggle.textContent = '🔇';
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
        words.forEach(({ word }, index) => { const li = document.createElement('li'); li.textContent = `${index + 1}. ${maskWord(word)}`; clueList.appendChild(li); });
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

        if (score <= -50) { alert("You have reached the minimum score limit!"); return; }

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
            correctSound.currentTime = 0; correctSound.play();
            checkCompletion();
        }
    }

    async function usePictureHint() {
        hintModal.classList.add('hidden');
        if (score <= -50) { alert("You have reached the minimum score limit!"); return; }
        
        const success = await fetchAndShowPicture();
        if (success) {
            updateScore(-5);
        } else {
            alert("Could not load image hint. No points deducted.");
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
    function showModal(isSuccess, message) {
        modal.classList.remove('hidden');
        modalTitle.textContent = isSuccess ? 'Awesome!' : 'Oops!';
        modalMessage.textContent = message;
        if (puzzlesCompleted >= totalPuzzlesInGame) { nextWordBtn.textContent = 'Finish Game'; }
        else { nextWordBtn.textContent = 'Next Puzzle'; }
    }

    function checkCompletion() {
        const slots = puzzleContainer.querySelectorAll('.puzzle-slot:not(.impassable):not(.hint)');
        if ([...slots].some(s => !s.firstElementChild)) return;
        let isCorrect = (playerData.difficulty === 'hard') ? checkCrosswordSolution() : [...puzzleContainer.children].map(slot => slot.firstElementChild ? slot.firstElementChild.textContent : slot.textContent).join('') === currentLevelData.word;
        if (isCorrect) {
            updateScore(25);
            myConfetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
            showModal(true, `You solved it correctly!`);
        } else {
            puzzleContainer.classList.add('shake');
            setTimeout(() => puzzleContainer.classList.remove('shake'), 500);
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
    function toggleMusic() { isMusicOn = !isMusicOn; if (isMusicOn) { bgMusic.play(); musicToggle.textContent = '🔊'; } else { bgMusic.pause(); musicToggle.textContent = '🔇'; } }
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
            cheerSound.play();
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
                    alert('Sharing is not supported on this browser.');
                }
            }, 'image/png');
        } catch (err) {
            alert('Oops, something went wrong while sharing.');
        }
    }
});

