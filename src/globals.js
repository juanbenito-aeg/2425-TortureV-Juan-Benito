export default {
    // |||||||||||| CANVAS & CONTEXT
    canvas: {},
    ctx: {},

    // |||||||||||| PREVIOUS CYCLE TIME (MILLISECONDS)
    previousCycleMilliseconds: -1,

    // |||||||||||| ACTUAL GAME CYCLE TIME (SECONDS)
    deltaTime: 0,

    // |||||||||||| GOAL CYCLE TIME (SECONDS, CONSTANT)
    frameTimeObj: 0,

    cycleRealTime: 0,

    // |||||||||||| OBJECT THAT HOLDS THE STATES OF THE KEYBOARD KEYS
    action: {},

    score: 0,
    playerLifePoints: 0,

    map: [],
    mapInitialXCoordinate: 0,
    mapInitialYCoordinate: 0,

    elements: [],

    isGameOver: false,
};