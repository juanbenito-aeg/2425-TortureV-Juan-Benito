import globals from "./globals.js";
import { FPS, BlockID, CharacterID } from "./constants.js";

function initEssentials() {
    // |||||||||||| INITIALIZE HTML ELEMENTS
    initHTMLElements();

    // |||||||||||| INITIALIZE THE GAME'S VARIABLES
    initVars();
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

    // |||||||| INITIALIZE MAP
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
}

export { initEssentials };