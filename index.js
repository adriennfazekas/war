
let deckId

document.getElementById("newdeck-btn").addEventListener("click", handleClick)
document.getElementById("draw-btn").addEventListener("click", drawCard)

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            console.log(data)
        })
}

function drawCard() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data, data.cards[0], data.cards[1])
            document.getElementById("card-field").innerHTML = `
            <img src=${data.cards[0].image} />
            <img src=${data.cards[1].image} />
            
            `
        })
}