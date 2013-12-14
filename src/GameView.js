function GameView(gameModel,sprites) {
	// View of the Game
	// Doesn't know other objects, just defines the UI

	var canvasArea = undefined;
	var newScreen=false;
	var mazeUi=undefined;
	var titleUi=undefined;

	this.createCanvas = function() {
		canvasArea = new CanvasArea();
		titleUi= new TitleUi(gameModel,canvasArea,sprites);
		tutorial= new Tutorial(gameModel,canvasArea);
	};
	this.getCanvas = function(){
		return canvasArea;
	};
	
	this.addMaze = function(iMazeUi){
		mazeUi=iMazeUi;
	};
	this.clearAll = function(){
		newScreen=true;
	};
	
	this.redrawAll = function() {
		var screen=gameModel.getScreen();
		if(screen==c.SCREEN.TITLE){
			if(newScreen){
				titleUi.drawTitle();
			}
			newScreen=false;
			titleUi.drawButtons();
			return;
		}
		var ready=gameModel.getReady();
		var gameOver=gameModel.getGameOver();
		if(newScreen){
			// Clear screen
			canvasArea.clearScreen();
			mazeUi.drawMaze();
			mazeUi.drawDoors();
			mazeUi.drawPlayer(gameModel.getPlayerPos());
			drawMonsters();
			if(ready>0){
				mazeUi.drawReady(ready);
			}
			if(gameOver>0){
				mazeUi.drawGameOver(gameOver);
				gameModel.decreaseGameOver();
				if(gameOver==1){
					gameModel.setScreen(c.SCREEN.TITLE);
				}
			}
		}
		if(ready==0 && gameOver==0){
			tutorial.drawTutorial(gameModel.getPlayerPos());
			newScreen=false;
			mazeUi.wipeTraces();
			mazeUi.drawDoors();
			mazeUi.drawPlayer(gameModel.getPlayerPos());
			drawMonsters();
		}
		mazeUi.drawScore(gameModel.getScore(),gameModel.getShots(),gameModel.getLevel().number);
		
	};
	function drawMonsters(){
		var monsters = gameModel.getMonsters();
		for (var i = 0; i < monsters.length; i++) {
			var monster=monsters[i];
			mazeUi.drawMonster(monster);
		}
	}
};