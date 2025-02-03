import globals from "./globals.js";
import { Key } from "./constants.js";

function keydownHandler(event) {
    switch (event.keyCode) {
        case Key.LEFT:
            globals.action.moveLeft = true;
            break;
        
        case Key.UP:
            globals.action.moveUp = true;
            break;
        
        case Key.RIGHT:
            globals.action.moveRight = true;
            break;
        
        case Key.DOWN:
            globals.action.moveDown = true;
            break;
    }
}

function keyupHandler(event) {
    switch (event.keyCode) {
        case Key.LEFT:
            globals.action.moveLeft = false;
            break;
        
        case Key.UP:
            globals.action.moveUp = false;
            break;
        
        case Key.RIGHT:
            globals.action.moveRight = false;
            break;
        
        case Key.DOWN:
            globals.action.moveDown = false;
            break;
    }
}

export { keydownHandler, keyupHandler };