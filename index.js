
let deckId
const cardsContainer = document.getElementById("card-field")

document.getElementById("newdeck-btn").addEventListener("click", handleClick)
document.getElementById("draw-btn").addEventListener("click", drawCard)

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
        })
}

function drawCard() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="drawn-card" />`
            cardsContainer.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="drawn-card" />`
        })
}