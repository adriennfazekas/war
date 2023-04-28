
let deckId
let computerScore = 0
let humanScore = 0
const cardsContainer = document.getElementById("card-field")
const gameStatus = document.getElementById("game-status")
const remainingCard = document.getElementById("remaining")
const drawBtn = document.getElementById("draw-btn")
const computer = document.getElementById("computer")
const human = document.getElementById("human")

document.getElementById("newdeck-btn").addEventListener("click", handleClick)
drawBtn.addEventListener("click", drawCard)

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingCard.innerText = `Remaining cards: ${data.remaining}`
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

            gameStatus.innerText = handleCard(data.cards[0], data.cards[1])
            remainingCard.innerText = `Remaining cards: ${data.remaining}`

            if (data.remaining === 0) {
                drawBtn.disabled = true
                remainingCard.innerText = ""
                
                if (humanScore > computerScore) {
                    gameStatus.innerText = "YOU won the game!"
                } else if (humanScore < computerScore) {
                    gameStatus.innerText = "COMPUTER won the game!"
                } else {
                    gameStatus.innerText = "It is a tie!"
                }
            }
        })
}

function handleCard(compCard, meCard) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const compCardIndex = valueOptions.indexOf(compCard.value)    
    const meCardIndex = valueOptions.indexOf(meCard.value)

    if(compCardIndex > meCardIndex) {
        computerScore++
        computer.innerText = `Computer: ${computerScore}`
        return "Computer is the winner"
    } else if(compCardIndex < meCardIndex) {
        humanScore++
        human.innerText = `Me: ${humanScore}`
        return "You are the winner"
    } else return "War!"
}