function GameView(gameModel,sprites) {
	// View of the Game
	// Does only know other UI objects

	var canvasArea = undefined;
	var newScreen=false;
	var titleUi=undefined;
	var buttonUi=undefined;
	var selectedPresent=undefined;
	var selectedButton=undefined;
	var selectionPos={};

	this.createCanvas = function() {
		canvasArea = new CanvasArea(sprites);
		var blocksize=Math.floor(canvasArea.getSize().y/100);
		buttonUi=new ButtonsUi(gameModel,canvasArea.getStage(),blocksize*5);
		titleUi= new TitleUi(gameModel,canvasArea,sprites,buttonUi);
		presentsUi = new PresentsUi(gameModel,canvasArea,sprites,buttonUi,blocksize);// Blocksize normalized to 100%=Height
	};
	
	this.getCanvas = function(){
		return canvasArea;
	};
	
	this.clearAll = function(){
		newScreen=true;
	};

	this.registerMouse = function(){
		var canvas=canvasArea.getFrontCanvas();
		canvas.addEventListener('touchstart',this.checkClick);
		canvas.addEventListener('mousedown',this.checkClick);
		canvas.addEventListener('touchmove',moveAround);
		canvas.addEventListener('mousemove',moveAround);
		canvas.addEventListener('touchend',moveEnd);
		canvas.addEventListener('mouseup',moveEnd);
	};
	
	this.checkClick = function(event){
		var mouse=new Mouse(event);
		var button = buttonUi.checkClicked(mouse);
		if(button){
			gameModel.buttonClicked(button);
			return;
		};
		var present = presentsUi.checkClicked(mouse);
		if(present){
			gameModel.presentClicked(button);
			selectedPresent=present;
			var presentScreenPos = presentsUi.coordToScreen(present);
			selectionPos={
				x:mouse.x-presentScreenPos.x,
				y:mouse.y-presentScreenPos.y,
			};
			return;
		};
	};
	function moveAround(event){
		var mouse=new Mouse(event);
		var button = buttonUi.checkClicked(mouse);
		if(button && selectedPresent){
			//Hover graphics
			button.selected=true;
			selectedPresent.x=button.x*5;
			selectedPresent.y=button.y*5;
			selectedButton=button;
			return;
		};
		if(selectedPresent){
			var x=mouse.x-selectionPos.x;
			var y=mouse.y-selectionPos.y;
			var pos=presentsUi.screenToCoord({x:x,y:y});
			selectedPresent.x=pos.x;
			selectedPresent.y=pos.y;
			selectedButton=undefined;
		}
		
	};
	function moveEnd(event){
		gameModel.assignTo(selectedPresent,selectedButton);
		selectedButton=undefined;
		selectedPresent=undefined;
	};
	
	this.redrawAll = function() {
		var screen=gameModel.getScreen();
		if(screen==c.SCREEN.TITLE){
			if(newScreen){
				canvasArea.clearRectFront();
				titleUi.drawTitle();
			}
			newScreen=false;
			buttonUi.drawAll();
			return;
		}
		if(screen==c.SCREEN.GAME){
			if(newScreen){
				presentsUi.draw();
			}
			newScreen=false;
			presentsUi.draw();
			buttonUi.drawAll();
			return;
		}
		if(newScreen){
			// Clear screen
			canvasArea.clearScreen();
		}
	};
};