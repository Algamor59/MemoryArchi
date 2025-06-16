const cards = ['antoine', 'antoine', 'arnaud', 'arnaud'];
const shuffledCards = shuffle(cards);
let flippedCards = [];
let lock = false;

window.onload = () => {
    const cells = document.querySelectorAll(".col");
    cells.forEach((cell, index) => {
        const cardName = shuffledCards[index];
        cell.innerHTML = createCardHTML(cardName);
        const card = cell.querySelector(".card");
        card.dataset.card = cardName;
        card.addEventListener("click", handleCardClick);
    });
};

function createCardHTML(cardName) {
    return `
    <div class="card">
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back" style="background-image: url('img/${cardName}.png');"></div>
        </div>
    </div>`;
}

function handleCardClick(e) {
    if (lock) return;

    const card = e.currentTarget;
    if (card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        lock = true;
        setTimeout(() => {
            const [first, second] = flippedCards;
            if (first.dataset.card !== second.dataset.card) {
                first.classList.remove("flipped");
                second.classList.remove("flipped");
            }
            flippedCards = [];
            lock = false;
        }, 1000);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function resetGame() {
    // Remélanger les cartes
    const newShuffled = shuffle(cards.slice()); // clone + shuffle

    flippedCards = [];
    lock = false;

    // Réaffecter les cartes aux cellules
    const cells = document.querySelectorAll(".col");
    cells.forEach((cell, index) => {
        const cardName = newShuffled[index];
        cell.innerHTML = createCardHTML(cardName);
        const card = cell.querySelector(".card");
        card.dataset.card = cardName;
        card.classList.remove("flipped");
        card.addEventListener("click", handleCardClick);
    });
}
