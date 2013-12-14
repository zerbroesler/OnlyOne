function GameController(gameModel, gameView,sound,sprites,game) {

	this.initialize = function() {
		// Add callbacks and register for model changes
		gameModel.registerPickup(pickup);
		gameModel.registerPickupKey(pickupKey);
		gameModel.registerWalkStart(walkStart);
		gameModel.registerStart(start);
		gameModel.registerReady(ready);
		gameModel.registerWalkStop(walkStop);
		gameModel.registerOpenDoor(openDoor);
		gameModel.registerDie(die);
		//
		var mazeUi = new MazeUi(gameModel,gameView.getCanvas(),sprites);
		gameView.addMaze(mazeUi);
		gameView.getCanvas().addKeyDownEvent(keyPressed);
	};
	this.start = function() {
		gameView.clearAll();
	};
	function pickup(){
		sound.playSound('ring');
	}
	function pickupKey(){
		sound.playSound('key');
	}
	function walkStart(){
		sound.playSound('walk1');
	}
	function start(){
		sound.playSound('start');
		setTimeout(function(){
	        sound.playSound('tune3'); //TODO Main Tune         
		},200);
		
	}
	function ready(){
		sound.playSound('ready');
	}
	function openDoor(){
		sound.playSound('door');
		sound.stopSound('walk1');
		sound.stopSound('tune3');
	}
	function walkStop(){
		sound.stopSound('walk1');
	}
	function die(){
		sound.stopSound('walk1');
		sound.stopSound('tune3');
		sound.playSound('die');
		game.looseLive();
		gameView.clearAll();
		gameModel.stopGame();
		if(gameModel.getGameOver()>0){
			
		}else{
			// Just loose one life
			setTimeout(function(){
				game.initAll();
			},1000);
		}
	}
	
	function keyPressed(event){
		var start=false;
		var direction=c.DIRECTION.STOP;
		switch (event.keyCode) {
		case c.KEY.UP:
		case c.KEY.W:
			direction=c.DIRECTION.UP;
			break;
		case c.KEY.DOWN:
		case c.KEY.S:
			direction=c.DIRECTION.DOWN;
			break;
		case c.KEY.LEFT:
		case c.KEY.A:
			direction=c.DIRECTION.LEFT;
			break;
		case c.KEY.RIGHT:
		case c.KEY.D:
			direction=c.DIRECTION.RIGHT;
			break;
		case c.KEY.SPACE:
		case c.KEY.ENTER:
			start=true;
			
		default:
			break;
		}
		if(gameModel.getScreen()==c.SCREEN.TITLE){
			switch(direction){
			case c.DIRECTION.UP:
				gameModel.selectButton(0);
				break;
			case c.DIRECTION.DOWN:
				gameModel.selectButton(1);
				break;
			}
			if(start){
				// Start game or tutorial
		    	gameState=gameModel.getGameState();
				if(gameModel.getButtonNumber()==0){
					// Start
					gameState.level=1; //TODO:Start Level
				}else{
					// Tutorial
					gameState.level='Tutorial';
				}
				gameState.screen =c.SCREEN.GAME;					
		    	game.changeGameState(gameState);
				game.initAll();
//		        gameModel.loadLevel(game.levelNumber);
//				gameModel.setScreen(c.SCREEN.GAME);
//		        gameModel.registerLevelDone(game.levelDone);
//		        gameView.clearAll();
//		        gameModel.startGame();
			}
		}else{
			gameModel.setDirection(direction);
		}
	} 
}