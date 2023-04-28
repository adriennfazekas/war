
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

            document.getElementById("game-status").innerText = handleCard(data.cards[0], data.cards[1])
        })
}

function handleCard(compCard, meCard) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const compCardIndex = valueOptions.indexOf(compCard.value)    
    const meCardIndex = valueOptions.indexOf(meCard.value)
    
    if(compCardIndex > meCardIndex) {
        return "Computer is the winner"
    } else if(compCardIndex < meCardIndex) {
        return "You are the winner"
    } else return "War!"
}