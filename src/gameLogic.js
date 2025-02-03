import globals from "./globals.js";
import { BlockID, CharacterID } from "./constants.js";

export default function update() {
    updateCharacters();
}

function updateCharacters() {
    for (let i = 0; i < globals.characters.length; i++) {
        updateCharacter(globals.characters[i]);
    }
}

function updateCharacter(character) {
    switch (character.id) {
        case CharacterID.PLAYER:
            updatePlayer(character);
            break;
        
        case CharacterID.SPIDER:
            updateSpider(character);
            break;
    }
}

function updatePlayer(character) {
    if (character.nextMovementTimer.value === 0) {
        character.nextMovementTimer.value = 0.2;

        if (globals.action.moveLeft) {
            if (globals.map[character.mapRowIndex][character.mapColIndex - 1] !== BlockID.WALL) {
                character.mapColIndex--;
            }
        } else if (globals.action.moveRight) {
            if (globals.map[character.mapRowIndex][character.mapColIndex + 1] !== BlockID.WALL) {
                character.mapColIndex++;
            }
        } else if (globals.action.moveUp) {
            if (globals.map[character.mapRowIndex - 1][character.mapColIndex] !== BlockID.WALL) {
                character.mapRowIndex--;
            }
        } else if (globals.action.moveDown) {
            if (globals.map[character.mapRowIndex + 1][character.mapColIndex] !== BlockID.WALL) {
                character.mapRowIndex++;
            }
        }
    } else {
        character.nextMovementTimer.timeChangeCounter += globals.deltaTime;
    
        if (character.nextMovementTimer.timeChangeCounter >= character.nextMovementTimer.timeChangeValue) {
            character.nextMovementTimer.value -= 0.2;
            character.nextMovementTimer.timeChangeCounter = 0;
        }
    }
}