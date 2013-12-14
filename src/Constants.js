var c={
    CANVAS_SIZE_X : 1000,
    CANVAS_SIZE_Y : 600,
    PLAYFIELD_X: 1000, // Size of the playfield
    PLAYFIELD_Y: 600,
    PLAYER: {
    	SPEED:9,
    },
    MONSTER: {
    	SPEED:9,
    	MAXMONSTERS:5,
    	ZIGZAG:0.7,
    	SKULL:1,
    	SNAKE:2,
    },
    
    BUTTON: {
        BACKGROUND_COLOR : "#3333AA",
        SELECTED_BACKGROUND_COLOR : "#7777ee",
        TEXT_COLOR: "#eeee22",
        SELECTED_TEXT_COLOR: "#e00000",
        BORDER_COLOR: "#555588",
        SELECTED_BORDER_COLOR: "#AAAAFF",
        SELECTED_SHADOW_COLOR: "#EE3733",
    },
    KEY: {
    	UP: 38,
    	DOWN: 40,
    	LEFT: 37,
    	RIGHT: 39,
    	Q:81,
    	W:87,
    	E:69,
    	A:65,
    	S:83,
    	D:68,
    	SPACE:32,
    	ENTER:13,
    },
    DIRECTION: {
    	STOP:0,
    	UP:1,
    	DOWN:2,
    	LEFT:3,
    	RIGHT:4,
    },
    
    SCREEN: {
        TITLE:1,
        GAME:2,
        GAME_OVER:3,
    },
    
    FIELD: {
        EMPTY:1,
        WALL:2,
        ENTRY:3,
        DOOR:4,
        HINGE:5,
        EXIT:6,
        EXIT2:7,
        SPAWN:8,
        PROTECTED:9,
        KEY:10,
        RING:20,
        DIAMOND:21,
    },
    MAZECOLOR:{
    	WALL: 'brown',
    },
    
    TITLE_BACKGROUND_COLOR : "#F7EE59",
    BACKGROUND_COLOR : "#000000",
    TEXT_COLOR: "#2020F0",
    
    BUTTON_BACKGROUND_COLOR : "#FFFF00",
    
}; 