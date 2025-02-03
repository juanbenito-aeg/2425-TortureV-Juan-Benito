import globals from "./globals.js";
import { BlockID, BlockUnicode, CharacterID, CharacterUnicode } from "./constants.js";

export default function render() {
    // |||||||||||| CLEAR SCREEN
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    
    renderMap();
    renderCharacters();
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

function renderCharacters() {
    const blockSize = 16;

    globals.ctx.font = "14px emulogic";

    for (let i = 0; i < globals.characters.length; i++) {
        const currentCharacterXCoordinate = globals.mapInitialXCoordinate + (globals.characters[i].mapColIndex * blockSize);
        const currentCharacterYCoordinate = globals.mapInitialYCoordinate + ((globals.characters[i].mapRowIndex + 1) * blockSize);
        
        let currentCharacterUnicode;
        
        switch (globals.characters[i].id) {
            case CharacterID.PLAYER:
                currentCharacterUnicode = CharacterUnicode.PLAYER;
                break;
            
            case CharacterID.SPIDER:
                currentCharacterUnicode = CharacterUnicode.SPIDER;
                break;
        }

        globals.ctx.fillText(currentCharacterUnicode, currentCharacterXCoordinate, currentCharacterYCoordinate);
    }
}