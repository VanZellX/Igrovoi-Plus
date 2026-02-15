document.addEventListener('DOMContentLoaded', () => {
    // Получаем параметр из URL
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan') || 'ea1';

    // Обновляем заголовок в зависимости от тарифа
    const title = document.getElementById('product-title');

    if (plan === 'ea12') {
        title.textContent = 'EA Play - 12 месяцев';
    }

    // Данные игр
    const games = [
        { img: 'static/ea-game1.webp', name: 'EA SPORTS FC 24' },
        { img: 'static/ea-game2.webp', name: 'FIFA 23' },
        { img: 'static/ea-game3.webp', name: 'F1 23' },
        { img: 'static/ea-game4.webp', name: 'The Sims 4' },
        { img: 'static/ea-game5.webp', name: 'STAR WARS Jedi: Survivor' },
        { img: 'static/ea-game6.webp', name: 'STAR WARS Battlefront II' },
        { img: 'static/ea-game7.webp', name: 'Madden NFL 24' },
        { img: 'static/ea-game8.webp', name: 'NHL 24' },
        { img: 'static/ea-game9.webp', name: 'Apex Legends' },
        { img: 'static/ea-game10.webp', name: 'Need for Speed Unbound' },
        { img: 'static/ea-game11.webp', name: 'Need for Speed Heat' },
        { img: 'static/ea-game12.webp', name: 'Mass Effect Legendary Edition' },
        { img: 'static/ea-game13.webp', name: 'Dragon Age: Inquisition' },
        { img: 'static/ea-game14.webp', name: 'Battlefield 2042' },
        { img: 'static/ea-game15.webp', name: 'Battlefield V' },
        { img: 'static/ea-game16.webp', name: 'Dead Space' },
        { img: 'static/ea-game17.webp', name: 'Star Wars Jedi: Fallen Order' },
        { img: 'static/ea-game18.webp', name: 'Star Wars Squadrons' },
        { img: 'static/ea-game19.webp', name: 'Unravel Two' },
        { img: 'static/ea-game20.webp', name: 'Sea of Solitude' },
        { img: 'static/ea-game21.webp', name: 'Plants vs. Zombies: Battle for Neighborville' },
        { img: 'static/ea-game22.webp', name: 'Plants vs. Zombies Garden Warfare 2' },
        { img: 'static/ea-game23.webp', name: 'Fe' }
    ];

    // Создаем карточки игр
    const gamesTrack = document.getElementById('games-track');
    gamesTrack.innerHTML = '';

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.img}" alt="${game.name}">
            <h3>${game.name}</h3>
        `;
        gamesTrack.appendChild(card);
    });

    // Карусель игр
    const gameCards = document.querySelectorAll('.game-card');
    const totalGames = gameCards.length;

    let gameIndex = 0;
    let isDragging = false;
    let gameStartX = 0;
    let gameEndX = 0;

    // События мыши
    gamesTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        gameStartX = e.pageX;
    });

    gamesTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        gameEndX = e.pageX;
    });

    gamesTrack.addEventListener('mouseup', () => {
        if (!isDragging) return;

        isDragging = false;

        const diff = gameStartX - gameEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextGameSlide();
            } else {
                prevGameSlide();
            }
        }
    });

    // События тач
    gamesTrack.addEventListener('touchstart', (e) => {
        isDragging = true;
        gameStartX = e.touches[0].clientX;
    });

    gamesTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        gameEndX = e.touches[0].clientX;
    });

    gamesTrack.addEventListener('touchend', () => {
        if (!isDragging) return;

        isDragging = false;

        const diff = gameStartX - gameEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextGameSlide();
            } else {
                prevGameSlide();
            }
        }
    });

    // Функции карусели
    function nextGameSlide() {
        if (gameIndex < totalGames - 3) {
            gameIndex++;
            updateGameSlide();
        }
    }

    function prevGameSlide() {
        if (gameIndex > 0) {
            gameIndex--;
            updateGameSlide();
        }
    }

    function updateGameSlide() {
        const offset = -gameIndex * 300;
        gamesTrack.style.transform = `translateX(${offset}px)`;
        gamesTrack.style.transition = 'transform 0.5s ease';
    }

    console.log(`🎮 Открыта страница EA Play (${plan})!`);
});