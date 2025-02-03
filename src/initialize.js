import Character from "./Character.js";
import Spider from "./Spider.js";
import Timer from "./Timer.js";
import globals from "./globals.js";
import { FPS, BlockID, CharacterID } from "./constants.js";
import { keydownHandler, keyupHandler } from "./events.js";

function initEssentials() {
    // |||||||||||| INITIALIZE HTML ELEMENTS
    initHTMLElements();

    // |||||||||||| INITIALIZE THE GAME'S VARIABLES
    initVars();

    initEvents();
}

function initHTMLElements() {
    // |||||||| CANVAS, CONTEXT
    globals.canvas = document.getElementById("gameScreen");
    globals.ctx = globals.canvas.getContext("2d");

    // |||||||| ANTI-ALIASING DELETION
    globals.ctx.imageSmoothingEnabled = false;
}

function initVars() {
    // |||||||| INITIALIZE TIME MANAGEMENT VARIABLES
    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS;

    // |||||||| INITIALIZE STATE OF ACTIONS
    globals.action = {
        moveLeft: false,
        moveUp: false,
        moveRight: false,
        moveDown: false,
    };

    // |||||||| INITIALIZE MAP & RELATED DATA

    globals.map = [
        [BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL],
        [BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL],
        [BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL],
        [BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL],
        [BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL],
        [BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL],
        [BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL],
        [BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL],
        [BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL],
        [BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.WALL],
        [BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.CORRIDOR, BlockID.WALL],
        [BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL, BlockID.WALL],
    ];

    globals.mapInitialXCoordinate = 40;
    globals.mapInitialYCoordinate = 30;

    initCharacters();
}

function initCharacters() {
    initPlayer();
    initSpider();
}

function initPlayer() {
    // |||||||||||| POSITION THE PLAYER ON THE MAP
    
    const mapRowIndex = 7;
    const mapColIndex = 8;

    globals.map[mapRowIndex][mapColIndex] = CharacterID.PLAYER;

    const nextMovementTimer = new Timer(0.2, 0.2);
    nextMovementTimer.value = 0;

    const player = new Character(CharacterID.PLAYER, mapRowIndex, mapColIndex, nextMovementTimer);

    globals.characters.push(player);
}

function initSpider() {
    // |||||||||||| POSITION THE SPIDER ON THE MAP
    
    const possibleMapRowIndexes = [1, 10];
    const possibleMapColIndexes = [1, 15];

    const randomMapRowIndex = possibleMapRowIndexes[Math.floor(Math.random() * possibleMapRowIndexes.length)];
    const randomMapColIndex = possibleMapColIndexes[Math.floor(Math.random() * possibleMapRowIndexes.length)];

    globals.map[randomMapRowIndex][randomMapColIndex] = CharacterID.SPIDER;

    const nextMovementTimer = new Timer(0.2, 0.2);

    const spider = new Spider(CharacterID.SPIDER, randomMapRowIndex, randomMapColIndex, nextMovementTimer);

    // |||||||||||| CHOOSE RANDOM MOVEMENT DIRECTION

    let possibleMovements = [];

    if (globals.map[spider.mapRowIndex][spider.mapColIndex - 1] !== BlockID.WALL) {
        possibleMovements.push("LEFTWARDS");
    }
    if (globals.map[spider.mapRowIndex][spider.mapColIndex + 1] !== BlockID.WALL) {
        possibleMovements.push("RIGHTWARDS");
    }
    if (globals.map[spider.mapRowIndex - 1][spider.mapColIndex] !== BlockID.WALL) {
        possibleMovements.push("UPWARDS");
    }
    if (globals.map[spider.mapRowIndex + 1][spider.mapColIndex] !== BlockID.WALL) {
        possibleMovements.push("DOWNWARDS");
    }

    spider.currentMovementDirection = possibleMovements[Math.floor(Math.random() * possibleMovements.length)];

    globals.characters.push(spider);
}

function initEvents() {
    // |||||||||||| ADD KEYBOARD EVENT LISTENERS
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
}

export { initEssentials };