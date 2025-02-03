import globals from "./globals.js";
import { BlockID, BlockUnicode, ElementID, ElementUnicode } from "./constants.js";

export default function render() {
    // |||||||||||| CLEAR SCREEN
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    
    renderMap();
    renderElements();
    renderScore();
}

function renderMap() {
    globals.ctx.fillStyle = "black";
    globals.ctx.fillRect(0, 0, globals.canvas.width, globals.canvas.height);

    const blockSize = 16;

    globals.ctx.font = "14px emulogic";

    for (let i = 0; i < globals.map.length; i++) {
        for (let j = 0; j < globals.map[0].length; j++) {
            const blockXCoordinate = globals.mapInitialXCoordinate + (j * blockSize);
            const blockYCoordinate = globals.mapInitialYCoordinate + ((i + 1) * blockSize);

            if (globals.map[i][j] === BlockID.WALL) {
                globals.ctx.fillText(BlockUnicode.WALL, blockXCoordinate, blockYCoordinate);
            }
        }
    }
}

function renderElements() {
    const blockSize = 16;

    globals.ctx.font = "14px emulogic";

    for (let i = 0; i < globals.elements.length; i++) {
        const currentElementXCoordinate = globals.mapInitialXCoordinate + (globals.elements[i].mapColIndex * blockSize);
        const currentElementYCoordinate = globals.mapInitialYCoordinate + ((globals.elements[i].mapRowIndex + 1) * blockSize);
        
        let currentElementUnicode;
        
        switch (globals.elements[i].id) {
            case ElementID.PLAYER:
                currentElementUnicode = ElementUnicode.PLAYER;
                break;
            
            case ElementID.SPIDER:
                currentElementUnicode = ElementUnicode.SPIDER;
                break;
            
            case ElementID.MONEY:
                currentElementUnicode = ElementUnicode.MONEY;
                break;
        }

        globals.ctx.fillText(currentElementUnicode, currentElementXCoordinate, currentElementYCoordinate);
    }
}

function renderScore() {
    globals.ctx.font = "12px emulogic";
    globals.ctx.fillStyle = "white";
    
    globals.ctx.fillText("SCORE", 40, 25);
    
    globals.ctx.fillText(globals.score, 122, 25);
}