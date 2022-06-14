// global variables
let antagonistArray = ['polarBear', 'monkey', 'dog']
const attackBtn = document.getElementById('attackBtn')



// CHARACTER DATA
const characterData = {
    elephant: {
        name: "Elephant",
        avatar: "img/elephant.png",
        health: 100,
        diceCount: 3,
        currentDiceScore: []
    },
    lion: {
        name: "Lion",
        avatar: "img/lion.png",
        health: 50,
        diceCount: 2,
        currentDiceScore: []
    },
    polarBear: {
        name: "Polar Bear",
        avatar: "img/polar_bear.png",
        health: 60,
        diceCount: 3
    },
    monkey: {
        name: "Monkey",
        avatar: "img/monkey.png",
        health: 15,
        diceCount: 1
    },
    dog: {
        name: "Dog",
        avatar: "img/dog.png",
        health: 15,
        diceCount: 1
    }
}



// const cowChar  = {
//     name: "Cow",
//     avatar: "img/cow.png",
//     health: 60,
//     diceCount: 3
// }

// const penguinChar  = {
//     name: "Penguin",
//     avatar: "img/penguin.png",
//     health: 60,
//     diceCount: 3
// }

// const pigChar  = {
//     name: "Pig",
//     avatar: "img/pig.png",
//     health: 60,
//     diceCount: 3
// }



// CHARACTER CONSTRUCTOR
function Character(data) {
    // assign special character qualities
    Object.assign(this, data)
    // get character's total possible health
    this.maxHealth = this.health
    // METHODS
    // display health bar as percentage remaining
    this.getHealthBarHtml = function() {
        const percent = getPercentage(this.health, this.maxHealth)
        
        return `
        <div class="health-bar-outer">
            <div class="health-bar-inner ${percent < 26 ? "danger" : ""} " 
            style="width: ${percent}%;">
            </div>
        </div>`
    }
    // show placeholder dice initially
    this.diceArray = getDicePlaceholderHtml(this.diceCount)
    // display character dice after attack btn is pushed
    this.getDiceHtml = function() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map( num =>
            `<div class="dice">${num}</div>`).join('')
    }
    // allow the characters to be harmed
    this.takeDamage = function(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce( (total, currentRoll) => total + currentRoll)
        this.health -= totalAttackScore
        // prevent health from going below 0
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }
    }
    // generate character html
    this.getCharacterHtml = function() {
        const { name, avatar, health, diceCount, diceArray } = this
        let diceHtml = this.getDiceHtml(diceCount)
        const healthBar = this.getHealthBarHtml()
            return `
            <div class="characterCard">
                <h2 class="name">${name}</h2>
                <img class="avatar" src="${avatar}">
                <div class="health">Health: <span class="healthStrength">${health}</span>
                <div class="health-bar">${healthBar}</div>
                <div class="diceContainer border-radius">
                    ${diceArray}
                </div>
            </div>`
    }
}



// INITIALIZE CHARACTERS
// const cow = new Character(cowChar)
const elephant = new Character(characterData.elephant)
let antagonist = getNewAntagonist()
// const monkey = new Character(monkeyChar)
// const penguin = new Character(penguinChar)
// const pig = new Character(pigChar)
// const polarBear = new Character(polarBearChar)
// const dog = new Character(dogChar)



// FUNCTIONS
function getNewAntagonist() {
    const nextAntagonistData = characterData[antagonistArray.shift()]
    return nextAntagonistData ? new Character(nextAntagonistData) : {}
}

function render() {
    attackBtn.disabled = false
    document.getElementById('protagonist').innerHTML = elephant.getCharacterHtml()
    document.getElementById('antagonist').innerHTML = antagonist.getCharacterHtml()
}

const getPercentage = (remainingHealth, maximumHealth) =>
    (100 * remainingHealth) / maximumHealth

function attack() {
    elephant.getDiceHtml()
    antagonist.getDiceHtml()
    elephant.takeDamage(antagonist.currentDiceScore)
    antagonist.takeDamage(elephant.currentDiceScore)
    render()
    // end game when the protagonist dies, add more antagonists until they run out
    if (elephant.dead) {
        endGame()
    } else if (antagonist.dead) {
        if (antagonistArray.length > 0) {
            disableAttackBtn()
            setTimeout( () => {
                antagonist = getNewAntagonist()
                render()
            }, 1000)
        } else {
            endGame()
        }
    }
}

function getDicePlaceholderHtml(diceCount) {
    return new Array(diceCount).fill(0).map(function() {
        return '<div class="placeholderDice"></div>'
    }).join('')
}

function getDiceRollArray(diceCount) {
    return new Array(diceCount).fill(0).map(function(){
        return Math.floor(Math.random() * 6) + 1
    })
}

function disableAttackBtn() {
    attackBtn.disabled = true
}

function endGame(){
    disableAttackBtn()
    // determine who lost
    const endMessage = antagonist.health === 0 ? 'Elephant trumpets in victory' : elephant.health === 0 ? 'Lion roars in triumph' : 'Both animals perished'
    // show avatar of winner
    const victorAvatar = antagonist.health === 0 ? `img\\elephant.png` : `img\\lion.png`
    // display end game content
    setTimeout( () => {
        document.body.innerHTML = 
            `<div class="endGame">
                <h2 class="gameOver">Game Over</h2>
                <img class="victorAvatar" src="${victorAvatar}" alt="">
                <h3 class="endMessage">${endMessage}</h3>
            </div>`
    }, 1500)
}

// EVENT LISTENER
attackBtn.addEventListener('click', attack)

// BEGIN THE GAME
render()