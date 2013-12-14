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
    var buttons=undefined; // buttons is ui and model in one!
    
    this.start = function() {
    	sound=new Sound();
//    	sound.loadSounds(soundLoaded);
    	sound.loadSounds(null);
    	soundLoaded();
    };
    function soundLoaded(){
    	sprites=new Sprites();
    	sprites.loadSprites(spritesLoaded);
    };
    function spritesLoaded(){
    	game.initAll();
    	
    	gameModel.setScreen(c.SCREEN.TITLE);
    	
        // Go to the UI loop. The model registers an own callback at GameModel.startGame();
        gameModel.startGame();
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
        gameController.startTitle();
        
        if(gameModel.getScreen()==c.SCREEN.TITLE){
        	return;
        }
    	
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
