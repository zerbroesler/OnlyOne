function GameView(gameModel,sprites,sound) {
	// View of the Game
	// Does only know other UI objects

	var canvasArea = undefined;
	var newScreen=false;
	var titleUi=undefined;
	var buttonUi=undefined;
	var selectedPresent=undefined;
	var selectedButton=undefined;
	var selectionPos={};
	var removed=false;
	var oldButtonId=undefined;

	this.createCanvas = function() {
		canvasArea = new CanvasArea(sprites);
		var blocksize=Math.floor(canvasArea.getSize().y/100);
		buttonUi=new ButtonsUi(gameModel,canvasArea,blocksize*5);
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
		canvas.addEventListener('touchstart',checkTouch);
		canvas.addEventListener('mousedown',checkClick);
		canvas.addEventListener('touchmove',moveAround);
		canvas.addEventListener('mousemove',moveAround);
		canvas.addEventListener('touchend',moveEnd);
		canvas.addEventListener('mouseup',moveEnd);
	};
	
	function checkTouch(event){
		// remove click events
		if(!removed){
			var canvas=canvasArea.getFrontCanvas();
			canvas.removeEventListener('mousedown',checkClick);
			canvas.removeEventListener('mousemove',moveAround);
			canvas.removeEventListener('mouseup',moveEnd);
		removed=true;
		}
		checkClick(event);
	}
	
	function checkClick(event){
		var mouse=new Mouse(event);
		var button = buttonUi.checkClicked(mouse);
		if(button){
			gameModel.buttonClicked(button);
			return;
		};
		var present = presentsUi.checkClicked(mouse);
		if(present){
			sound.playSound("pick");
			var id = gameModel.findAssigned(present);
			if(id!==undefined){
				gameModel.unassign(id);
			};
//			gameModel.presentClicked(button);
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
		var button = buttonUi.getClicked(mouse);
		if(button && gameModel.getAssigned(button)!=-1){
			button=undefined;
		}
		if(button && selectedPresent){
			if(button.id!=oldButtonId){
				sound.playSound("put");
				oldButtonId=button.id;
			}
			selectedPresent.x=button.x*5+8;
			selectedPresent.y=button.y*5+button.sy*5-selectedPresent.sy;
			selectedButton=button;
			return;
		};
		if(selectedPresent){
			oldButtonId=undefined;
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
				buttonUi.drawAll();
			}
			newScreen=false;
			return;
		}
		if(screen==c.SCREEN.LEVELS){
			if(newScreen){
				canvasArea.clearRectFront();
				titleUi.drawLevels();
				buttonUi.drawAll();
			}
			newScreen=false;
			return;
		}
		if(screen==c.SCREEN.INSTRUCTIONS){
			if(newScreen){
				canvasArea.clearRectFront();
				titleUi.drawInstructions();
				buttonUi.drawAll();
				presentsUi.drawPresents();
			}
			newScreen=false;
			return;
		}
		if(screen==c.SCREEN.GAME){
			if(newScreen){
				presentsUi.draw();
				buttonUi.drawAll();
			}
			newScreen=false;
			presentsUi.drawPresents();
//			presentsUi.draw();
			return;
		}
		if(screen==c.SCREEN.GAME_OVER){
			if(newScreen){
				canvasArea.clearRectFront();
				titleUi.drawGameOver();
				buttonUi.drawAll();
			}
			newScreen=false;
			return;
		}
		if(newScreen){
			// Clear screen
			canvasArea.clearScreen();
		}
	};
};