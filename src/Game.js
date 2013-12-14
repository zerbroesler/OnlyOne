function init() {
    var game = new Game();
    game.start();
};

function Game() {

    var gameModel=undefined;
    var gameView=undefined;
    var gameController=undefined;
    var sound=undefined;
    var sprites=undefined;
    this.levelNumber = undefined;
    var game=this;
    
    var gameState=undefined;
    
		
    this.changeGameState=function(iGameState){
    	gameState=iGameState;    	
    };
    this.start = function() {
    	sound=new Sound();
    	sound.loadSounds(soundLoaded);
    };
    function soundLoaded(){
    	sprites=new Sprites();
    	sprites.loadSprites(loaded);
    };
    function loaded(){
    	game.initAll();
    	gameState=gameModel.getGameState();
        // Go to the UI loop. The model has registered an own callback at GameModel.startGame();
        loop();
    };
    this.levelDone = function(){
    	sound.playSound('tune1');
    	gameModel.stopGame();
    	setTimeout(toNextLevel,5000);
    };
    this.initAll = function(){
        // Init Model
        gameModel = new GameModel();
        gameModel.setGameState(gameState);
    	// Init View
        gameView = new GameView(gameModel,sprites);
        // Init Controller
        gameController = new GameController(gameModel,gameView,sound,sprites,game);
        
        gameView.createCanvas();

        // Initialize the game
//        gameModel.loadLevel(this.levelNumber);

        gameController.initialize();
        gameController.start();
        
        if(gameModel.getScreen()==c.SCREEN.TITLE){
        	return;
        }
        gameModel.registerLevelDone(this.levelDone);
        gameModel.startGame();
    	
    };
    this.looseLive = function(){
    	gameState.lives--;
    	if(gameState.lives<0){
    		// Game Over
    		gameModel.setGameOver(200);
    		gameState.screen=c.SCREEN.TITLE;
    	}
    };
    function toNextLevel(){
    	gameState.score=gameModel.getScore();
    	if(gameState.level=='Tutorial'){
    		gameState.level=0;
    	}
    	gameState.level++;
    	game.initAll();
    }
    loop = function() {
        requestAnimFrame(loop);
        gameView.redrawAll();
    };
};

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
