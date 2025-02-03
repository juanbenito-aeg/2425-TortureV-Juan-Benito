// |||||||||||| FPS (FRAMES PER SECOND)
const FPS = 30;

// |||||||||||| MAP BLOCK IDENTIFIER
const BlockID = {
    CORRIDOR: 0,
    WALL: 1,
};

// |||||||||||| MAP BLOCK'S UNICODE
const BlockUnicode = {
    WALL: "\u2B1C",    
};

// |||||||||||| ELEMENT IDENTIFIER
const ElementID = {
    PLAYER: 2,
    SPIDER: 3,
    MONEY: 4,
    HEART: 5,
};

// |||||||||||| ELEMENT'S UNICODE
const ElementUnicode = {
    PLAYER: "\u{1F474}",
    SPIDER: "\u{1F577}",
    MONEY: "\u{1F4B5}",
    HEART: "\u{1F49A}",
};

// |||||||||||| KEYBOARD KEY CODES
const Key = {    
    LEFT: 37,    
    UP: 38,    
    RIGHT: 39,
    DOWN: 40,    
};

export { FPS, BlockID, BlockUnicode, ElementID, ElementUnicode, Key };