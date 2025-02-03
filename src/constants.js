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
    MONEY: 2,
    HEART: 3,
};

// |||||||||||| ELEMENT'S UNICODE
const ElementUnicode = {
    MONEY: "\u{1F4B5}",
    HEART: "\u{1F49A}",
};

// |||||||||||| CHARACTER IDENTIFIER
const CharacterID = {
    PLAYER: 4,
    SPIDER: 5,
};

// |||||||||||| CHARACTER'S UNICODE
const CharacterUnicode = {
    PLAYER: "\u{1F474}",
    SPIDER: "\u{1F577}",
};

// |||||||||||| KEYBOARD KEY CODES
const Key = {    
    LEFT: 37,    
    UP: 38,    
    RIGHT: 39,
    DOWN: 40,    
};

export { FPS, BlockID, BlockUnicode, CharacterID, CharacterUnicode, Key };