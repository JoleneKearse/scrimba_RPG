// CHARACTER DATA
const characterData = {
    protagonist: {
        name: "Elephant",
        avatar: "img/elephant.png",
        health: 60,
        diceCount: 3,
        currentDiceScore: []
    },
    antagonist: {
        name: "Lion",
        avatar: "img/lion.png",
        health: 60,
        diceCount: 3,
        currentDiceScore: []
    }
}

// const cowChar  = {
//     name: "Cow",
//     avatar: "img/cow.png",
//     health: 60,
//     diceCount: 3
// }

// const elephantChar  = {
//     name: "Elephant",
//     avatar: "img/elephant.png",
//     health: 60,
//     diceCount: 3
// }

// const lionChar  = {
//     name: "Lion",
//     avatar: "img/lion.png",
//     health: 60,
//     diceCount: 3
// }

// const monkeyChar  = {
//     name: "Monkey",
//     avatar: "img/monkey.png",
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

// const polarBearChar  = {
//     name: "Polar Bear",
//     avatar: "img/polar_bear.png",
//     health: 60,
//     diceCount: 3
// }

// const dogChar  = {
//     name: "Dog",
//     avatar: "img/dog.png",
//     health: 60,
//     diceCount: 3
// }

// CHARACTER CONSTRUCTOR
function Character(data) {
    // assign special character qualities
    Object.assign(this, data)
    // METHODS
    // show placeholder dice initially
    this.diceArray = getDicePlaceholderHtml(this.diceCount)
    // display character dice after attack btn is pushed
    this.getDiceHtml = function() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map(function(num) {
            return `<div class="dice">${num}</div>`
        }).join('')
    }
    // allow the characters to be harmed
    this.takeDamage = function() {
        console.log(`${this.name} is damaged`)
    }
    // generate character html
    this.getCharacterHtml = function() {
        const { name, avatar, health, diceCount, diceArray } = this
        let diceHtml = this.getDiceHtml(diceCount)
            return `
            <div class="characterCard">
                <h2 class="name">${name}</h2>
                <img class="avatar" src="${avatar}">
                <div class="health">Health: <span class="healthStrength">${health}</span>
                <div class="diceContainer border-radius">
                    ${diceArray}
                </div>
            </div>`
    }
}

// INITIALIZE CHARACTERS
// const cow = new Character(cowChar)
const elephant = new Character(characterData.protagonist)
const lion = new Character(characterData.antagonist)
// const monkey = new Character(monkeyChar)
// const penguin = new Character(penguinChar)
// const pig = new Character(pigChar)
// const polarBear = new Character(polarBearChar)
// const dog = new Character(dogChar)

// FUNCTIONS
function render() {
    document.getElementById('protagonist').innerHTML = elephant.getCharacterHtml()
    document.getElementById('antagonist').innerHTML = lion.getCharacterHtml()
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

function attack() {
    elephant.getDiceHtml()
    lion.getDiceHtml()
    elephant.takeDamage()
    lion.takeDamage()
    render()
}

document.getElementById('attackBtn').addEventListener('click', attack)

render()