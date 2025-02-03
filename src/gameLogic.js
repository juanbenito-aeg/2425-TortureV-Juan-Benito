import globals from "./globals.js";
import { BlockID, ElementID } from "./constants.js";
import { initSpider, initMoney } from "./initialize.js";

export default function update() {
    if (!globals.isGameOver) {
        updateElements();
        checkIfGameOver();
    }
}

function updateElements() {
    for (let i = 0; i < globals.elements.length; i++) {
        updateElement(globals.elements[i]);
    }
}

function updateElement(element) {
    switch (element.id) {
        case ElementID.PLAYER:
            updatePlayer(element);
            break;
        
        case ElementID.SPIDER:
            updateSpider(element);
            break;
    }
}

function updatePlayer(element) {
    if (element.nextMovementTimer.value === 0) {
        element.nextMovementTimer.value = 0.2;

        if (globals.action.moveLeft) {
            if (globals.map[element.mapRowIndex][element.mapColIndex - 1] !== BlockID.WALL) {
                element.mapColIndex--;
            }
        } else if (globals.action.moveRight) {
            if (globals.map[element.mapRowIndex][element.mapColIndex + 1] !== BlockID.WALL) {
                element.mapColIndex++;
            }
        } else if (globals.action.moveUp) {
            if (globals.map[element.mapRowIndex - 1][element.mapColIndex] !== BlockID.WALL) {
                element.mapRowIndex--;
            }
        } else if (globals.action.moveDown) {
            if (globals.map[element.mapRowIndex + 1][element.mapColIndex] !== BlockID.WALL) {
                element.mapRowIndex++;
            }
        }
    } else {
        element.nextMovementTimer.timeChangeCounter += globals.deltaTime;
    
        if (element.nextMovementTimer.timeChangeCounter >= element.nextMovementTimer.timeChangeValue) {
            element.nextMovementTimer.value -= 0.2;
            element.nextMovementTimer.timeChangeCounter = 0;
        }
    }

    // |||||||||||| CHECK WHETHER THE PLAYER TOUCHED A MONEY OR A SPIDER OBJECT
    for (let i = 1; i < globals.elements.length; i++) {
        switch (globals.elements[i].id) {
            case ElementID.MONEY:
                const money = globals.elements[i];
    
                if ((element.mapRowIndex === money.mapRowIndex) && (element.mapColIndex === money.mapColIndex)) {
                    globals.score += 100;
            
                    initMoney();
                }

                break;
            
            case ElementID.SPIDER:
                const spider = globals.elements[i];
    
                if ((element.mapRowIndex === spider.mapRowIndex) && (element.mapColIndex === spider.mapColIndex)) {
                    globals.playerLifePoints--;
            
                    // |||||||| MOVE THE PLAYER TO THEIR INITIAL POSITION
                    element.mapRowIndex = 7;
                    element.mapColIndex = 8;

                    initSpider();
                }

                break;
        }
    }
}

function updateSpider(element) {
    if (element.nextMovementTimer.value === 0) {
        element.nextMovementTimer.value = 0.2;

        let isThereIntersection = !(((globals.map[element.mapRowIndex][element.mapColIndex - 1] === BlockID.WALL) && (globals.map[element.mapRowIndex][element.mapColIndex + 1] === BlockID.WALL)) || ((globals.map[element.mapRowIndex - 1][element.mapColIndex] === BlockID.WALL) && (globals.map[element.mapRowIndex + 1][element.mapColIndex] === BlockID.WALL)));

        if (!isThereIntersection) {
            if (globals.map[element.mapRowIndex][element.mapColIndex - 1] !== BlockID.WALL) {
                element.mapColIndex--;
                element.currentMovementDirection = "LEFTWARDS";
            } else if (globals.map[element.mapRowIndex][element.mapColIndex + 1] !== BlockID.WALL) {
                element.mapColIndex++;
                element.currentMovementDirection = "RIGHTWARDS";
            } else if (globals.map[element.mapRowIndex - 1][element.mapColIndex] !== BlockID.WALL) {
                element.mapRowIndex--;
                element.currentMovementDirection = "UPWARDS";
            } else if (globals.map[element.mapRowIndex + 1][element.mapColIndex] !== BlockID.WALL) {
                element.mapRowIndex++;
                element.currentMovementDirection = "DOWNWARDS";
            }
        } else {
            let possibleMovements = [];
            let randomMovement;

            switch (element.currentMovementDirection) {
                case "LEFTWARDS":
                case "RIGHTWARDS":
                    if (globals.map[element.mapRowIndex - 1][element.mapColIndex] !== BlockID.WALL) {
                        possibleMovements.push("UPWARDS");
                    }
                    
                    if (globals.map[element.mapRowIndex + 1][element.mapColIndex] !== BlockID.WALL) {
                        possibleMovements.push("DOWNWARDS");
                    }

                    randomMovement = possibleMovements[Math.floor(Math.random() * possibleMovements.length)];

                    if (randomMovement === "UPWARDS") {
                        element.mapRowIndex--;
                        element.currentMovementDirection = "UPWARDS";
                    } else {
                        element.mapRowIndex++;
                        element.currentMovementDirection = "DOWNWARDS";
                    }

                    break;
                
                case "UPWARDS":
                case "DOWNWARDS":
                    if (globals.map[element.mapRowIndex][element.mapColIndex - 1] !== BlockID.WALL) {
                        possibleMovements.push("LEFTWARDS");
                    }
                    
                    if (globals.map[element.mapRowIndex][element.mapColIndex + 1] !== BlockID.WALL) {
                        possibleMovements.push("RIGHTWARDS");
                    }

                    randomMovement = possibleMovements[Math.floor(Math.random() * possibleMovements.length)];

                    if (randomMovement === "LEFTWARDS") {
                        element.mapColIndex--;
                        element.currentMovementDirection = "LEFTWARDS";
                    } else {
                        element.mapColIndex++;
                        element.currentMovementDirection = "RIGHTWARDS";
                    }
            }
        }
    } else {
        element.nextMovementTimer.timeChangeCounter += globals.deltaTime;
    
        if (element.nextMovementTimer.timeChangeCounter >= element.nextMovementTimer.timeChangeValue) {
            element.nextMovementTimer.value -= 0.2;
            element.nextMovementTimer.timeChangeCounter = 0;
        }
    }
}

function checkIfGameOver() {
    if (globals.playerLifePoints === 0) {
        globals.isGameOver = true;
    }
}