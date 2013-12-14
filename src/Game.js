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
    var game=this;
    
    this.start = function() {
    	sound=new Sound();
    	sound.loadSounds(soundLoaded);
    };
    function soundLoaded(){
    	sprites=new Sprites();
    	sprites.loadSprites(spritesLoaded);
    };
    function spritesLoaded(){
    	game.initAll();
        // Go to the UI loop. The model has registered an own callback at GameModel.startGame();
        loop();
    };

    this.initAll = function(){
        // Init Model
        gameModel = new GameModel();
    	// Init View
        gameView = new GameView(gameModel,sprites);
        // Init Controller
        gameController = new GameController(gameModel,gameView,sound,sprites,game);
        
        gameView.createCanvas();

        gameController.initialize();
        gameController.start();
        
        if(gameModel.getScreen()==c.SCREEN.TITLE){
        	return;
        }
//        gameModel.registerLevelDone(this.levelDone);
//        gameModel.startGame();
    	
    };
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
