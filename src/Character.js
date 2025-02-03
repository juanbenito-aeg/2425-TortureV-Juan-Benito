import Element from "./Element.js";

export default class Character extends Element {
    constructor(id, mapRowIndex, mapColIndex, nextMovementTimer) {
        super(id, mapRowIndex, mapColIndex);

        this.nextMovementTimer  = nextMovementTimer;
    }
}