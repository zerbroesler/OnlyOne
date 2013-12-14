function GameView(gameModel,sprites) {
	// View of the Game
	// Does only know other UI objects

	var canvasArea = undefined;
	var newScreen=false;
	var titleUi=undefined;

	this.createCanvas = function() {
		canvasArea = new CanvasArea();
		titleUi= new TitleUi(gameModel,canvasArea,sprites);
	};
	this.getCanvas = function(){
		return canvasArea;
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
		if(newScreen){
			// Clear screen
			canvasArea.clearScreen();
		}
	};
};