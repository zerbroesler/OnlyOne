function GameController(gameModel, gameView,sound,sprites,game) {

	this.initialize = function() {
		// Add callbacks and register for model changes
		gameModel.registerEvent('start',this.start);
	};
	
	this.start = function() {
		gameView.clearAll();
	};
	
//	function start(){
//		sound.playSound('start');
//		setTimeout(function(){
//	        sound.playSound('tune3'); //TODO Main Tune         
//		},200);
//		
//	}
	
//		if(gameModel.getScreen()==c.SCREEN.TITLE){
//			switch(direction){
//			case c.DIRECTION.UP:
//				gameModel.selectButton(0);
//				break;
//			case c.DIRECTION.DOWN:
//				gameModel.selectButton(1);
//				break;
//			}
//			if(start){
//				// Start game or tutorial
//		    	gameState=gameModel.getGameState();
//				if(gameModel.getButtonNumber()==0){
//					// Start
//					gameState.level=1; //TODO:Start Level
//				}else{
//					// Tutorial
//					gameState.level='Tutorial';
//				}
//				gameState.screen =c.SCREEN.GAME;					
//		    	game.changeGameState(gameState);
//				game.initAll();
////		        gameModel.loadLevel(game.levelNumber);
////				gameModel.setScreen(c.SCREEN.GAME);
////		        gameModel.registerLevelDone(game.levelDone);
////		        gameView.clearAll();
////		        gameModel.startGame();
//			}
//		}else{
//			gameModel.setDirection(direction);
//		}
//	} 
}