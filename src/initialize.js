import Element from "./Element.js";
import Character from "./Character.js";
import Spider from "./Spider.js";
import Timer from "./Timer.js";
import globals from "./globals.js";
import { FPS, BlockID, ElementID } from "./constants.js";
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

    initMap();

    initElements();
}

function initMap() {
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
    globals.mapInitialYCoordinate = 35;
}

function initElements() {
    initPlayer();
    initSpider();
    initMoney();
}

function initPlayer() {
    // |||||||||||| POSITION THE PLAYER ON THE MAP
    
    const mapRowIndex = 7;
    const mapColIndex = 8;

    const nextMovementTimer = new Timer(0.2, 0.2);
    nextMovementTimer.value = 0;

    globals.playerLifePoints = 3;

    const player = new Character(ElementID.PLAYER, mapRowIndex, mapColIndex, nextMovementTimer);

    globals.elements.push(player);
}

function initSpider() {
    // |||||||||||| CHECK WHETHER ALREADY EXISTS A SPIDER OBJECT, AND IF IT DOES, DELETE IT FROM THE "globals.elements" ARRAY
    for (let i = 1; i < globals.elements.length; i++) {
        if (globals.elements[i].id === ElementID.SPIDER) {
            globals.elements.splice(i, 1);
        }
    }

    // |||||||||||| POSITION THE SPIDER ON THE MAP
    
    const possibleMapRowIndexes = [1, 10];
    const possibleMapColIndexes = [1, 15];

    const randomMapRowIndex = possibleMapRowIndexes[Math.floor(Math.random() * possibleMapRowIndexes.length)];
    const randomMapColIndex = possibleMapColIndexes[Math.floor(Math.random() * possibleMapRowIndexes.length)];

    const nextMovementTimer = new Timer(0.2, 0.2);

    const spider = new Spider(ElementID.SPIDER, randomMapRowIndex, randomMapColIndex, nextMovementTimer);

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

    globals.elements.push(spider);
}

function initMoney() {
    // |||||||||||| CHECK WHETHER ALREADY EXISTS A MONEY OBJECT, AND IF IT DOES, DELETE IT FROM THE "globals.elements" ARRAY
    for (let i = 1; i < globals.elements.length; i++) {
        if (globals.elements[i].id === ElementID.MONEY) {
            globals.elements.splice(i, 1);
        }
    }

    // |||||||||||| POSITION THE MONEY ON THE MAP
    
    const possibleMapRowAndColIndexes = [];

    for (let i = 0; i < globals.map.length; i++) {
        for (let j = 0; j < globals.map[0].length; j++) {
            if (globals.map[i][j] === BlockID.CORRIDOR) {
                possibleMapRowAndColIndexes.push([i, j]);
            }
        }
    }

    const randomMapRowAndColIndexes = possibleMapRowAndColIndexes[Math.floor(Math.random() * possibleMapRowAndColIndexes.length)];

    const randomMapRowIndex = randomMapRowAndColIndexes[0];
    const randomMapColIndex = randomMapRowAndColIndexes[1];

    const money = new Element(ElementID.MONEY, randomMapRowIndex, randomMapColIndex);

    globals.elements.push(money);
}

function initEvents() {
    // |||||||||||| ADD KEYBOARD EVENT LISTENERS
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
}

export { initEssentials, initSpider, initMoney };