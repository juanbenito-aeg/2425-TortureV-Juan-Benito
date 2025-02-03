import Character from "./Character.js";

export default class Spider extends Character {
    constructor(id, mapRowIndex, mapColIndex, nextMovementTimer) {
        super(id, mapRowIndex, mapColIndex, nextMovementTimer);

        this.currentMovementDirection;
    }
}