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

function updateSpider(character) {
    if (character.nextMovementTimer.value === 0) {
        character.nextMovementTimer.value = 0.2;

        let isThereIntersection = !(((globals.map[character.mapRowIndex][character.mapColIndex - 1] === BlockID.WALL) && (globals.map[character.mapRowIndex][character.mapColIndex + 1] === BlockID.WALL)) || ((globals.map[character.mapRowIndex - 1][character.mapColIndex] === BlockID.WALL) && (globals.map[character.mapRowIndex + 1][character.mapColIndex] === BlockID.WALL)));

        if (!isThereIntersection) {
            if (globals.map[character.mapRowIndex][character.mapColIndex - 1] !== BlockID.WALL) {
                character.mapColIndex--;
                character.currentMovementDirection = "LEFTWARDS";
            } else if (globals.map[character.mapRowIndex][character.mapColIndex + 1] !== BlockID.WALL) {
                character.mapColIndex++;
                character.currentMovementDirection = "RIGHTWARDS";
            } else if (globals.map[character.mapRowIndex - 1][character.mapColIndex] !== BlockID.WALL) {
                character.mapRowIndex--;
                character.currentMovementDirection = "UPWARDS";
            } else if (globals.map[character.mapRowIndex + 1][character.mapColIndex] !== BlockID.WALL) {
                character.mapRowIndex++;
                character.currentMovementDirection = "DOWNWARDS";
            }
        } else {
            let possibleMovements = [];
            let randomMovement;

            switch (character.currentMovementDirection) {
                case "LEFTWARDS":
                case "RIGHTWARDS":
                    if (globals.map[character.mapRowIndex - 1][character.mapColIndex] !== BlockID.WALL) {
                        possibleMovements.push("UPWARDS");
                    }
                    
                    if (globals.map[character.mapRowIndex + 1][character.mapColIndex] !== BlockID.WALL) {
                        possibleMovements.push("DOWNWARDS");
                    }

                    randomMovement = possibleMovements[Math.floor(Math.random() * possibleMovements.length)];

                    if (randomMovement === "UPWARDS") {
                        character.mapRowIndex--;
                        character.currentMovementDirection = "UPWARDS";
                    } else {
                        character.mapRowIndex++;
                        character.currentMovementDirection = "DOWNWARDS";
                    }

                    break;
                
                case "UPWARDS":
                case "DOWNWARDS":
                    if (globals.map[character.mapRowIndex][character.mapColIndex - 1] !== BlockID.WALL) {
                        possibleMovements.push("LEFTWARDS");
                    }
                    
                    if (globals.map[character.mapRowIndex][character.mapColIndex + 1] !== BlockID.WALL) {
                        possibleMovements.push("RIGHTWARDS");
                    }

                    randomMovement = possibleMovements[Math.floor(Math.random() * possibleMovements.length)];

                    if (randomMovement === "LEFTWARDS") {
                        character.mapColIndex--;
                        character.currentMovementDirection = "LEFTWARDS";
                    } else {
                        character.mapColIndex++;
                        character.currentMovementDirection = "RIGHTWARDS";
                    }
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