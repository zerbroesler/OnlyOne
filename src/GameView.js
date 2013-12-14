function GameView(gameModel,sprites) {
	// View of the Game
	// Does only know other UI objects

	var canvasArea = undefined;
	var newScreen=false;
	var titleUi=undefined;
	var buttonUi=undefined;

	this.createCanvas = function() {
		canvasArea = new CanvasArea(sprites);
		var blocksize=Math.floor(canvasArea.getSize().x/20);
		buttonUi=new ButtonsUi(gameModel,canvasArea.getStage(),blocksize);
		titleUi= new TitleUi(gameModel,canvasArea,sprites,buttonUi);
		presentsUi = new PresentsUi(gameModel,canvasArea,sprites,buttonUi);
	};
	
	this.getCanvas = function(){
		return canvasArea;
	};
	
	this.clearAll = function(){
		newScreen=true;
	};

	this.registerMouse = function(){
		canvasArea.getCanvas().addEventListener('touchstart',this.checkButtons);
	};
	
	this.checkButtons = function(event){
		var mouse=new Mouse(event);
		button = buttonUi.checkClicked(mouse);
		if(button){
			gameModel.buttonClicked(button);
		};
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
		if(screen==c.SCREEN.GAME){
			if(newScreen){
				presentsUi.draw();
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