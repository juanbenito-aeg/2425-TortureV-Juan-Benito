import globals from "./globals.js";
import { BlockID, BlockUnicode } from "./constants.js";

export default function render() {
    // |||||||||||| CLEAR SCREEN
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    
    renderMap();
}

function renderMap() {
    globals.ctx.fillStyle = "black";
    globals.ctx.fillRect(0, 0, globals.canvas.width, globals.canvas.height);

    const initialBlockXCoordinate = 40;
    const initialBlockYCoordinate = 30;

    const blockSize = 16;

    globals.ctx.font = "14px emulogic";

    for (let i = 0; i < globals.map.length; i++) {
        for (let j = 0; j < globals.map[0].length; j++) {
            const blockXCoordinate = initialBlockXCoordinate + (j * blockSize);
            const blockYCoordinate = initialBlockYCoordinate + ((i + 1) * blockSize);

            if (globals.map[i][j] === BlockID.WALL) {
                globals.ctx.fillText(BlockUnicode.WALL, blockXCoordinate, blockYCoordinate);
            }
        }
    }
}