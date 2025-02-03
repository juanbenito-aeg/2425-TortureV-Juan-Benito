export default class Character {
    constructor(id, mapRowIndex, mapColIndex, nextMovementTimer) {
        this.id                 = id;
        this.mapRowIndex        = mapRowIndex;
        this.mapColIndex        = mapColIndex;
        this.nextMovementTimer  = nextMovementTimer;
    }
}