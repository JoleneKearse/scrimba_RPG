import {getDiceRollArray} from "./utils.js"

// CHARACTER CONSTRUCTOR
function Character(data) {
    // assign special character qualities
    Object.assign(this, data)
    // METHODS
    // display character dice
    this.getDiceHtml = function(diceCount) {
        return getDiceRollArray(diceCount).map(function(num) {
            return `<div class="dice">${num}</div`
        }).join('')
    }
    // generate character html
    this.getCharacterHtml = function() {
        const { name, avatar, health, diceCount } = this
        let diceHtml = this.getDiceHtml(diceCount)
        return `
        <div class="characterCard">
            <h2 class="name">${name}</h2>
            <img class="avatar" src="${avatar}">
            <div class="health">Health: <span class="healthStrength">${health}</span>
            <div class="diceContainer border-radius">
                ${diceHtml}
            </div>
        </div>`
    }
}