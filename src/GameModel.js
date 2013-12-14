function GameModel() {
	// Model of the Game
	// Doesn't know other objects, just defines the data model

	var callback=undefined;
	var score=0;
	var screen=c.SCREEN.TITLE;

	var events={
			start : new Event(),
			buttonSelection : new Event(),
	};
	this.setScreen = function(iScreen){
		screen=iScreen;
	};
	this.getScreen = function(){
		return screen;
	};
	this.getScore = function(){
		return score;
	};
	this.registerEvent = function(name,listener){
		events[name].attach(listener);
	};

	this.startGame = function() {
	
		$this=this;
		if(screen==c.SCREEN.TITLE){
			// Title Screen only, don't start the game
			return;
		}
		// register regular callback
		callback = setInterval(function() {
			if(ready>0){
				ready--;
				if(ready==20){
					startEvent.notify();
				}
			}else{
			//Update 
				spawnAndMoveMonsters();
				direction=$this.movePlayer(direction);
				grabItem();
				$this.swingDoors();
				monsterCollision();
			}
		}, 16);
	};
	
	function addScore(ammount){
		score+=ammount;
	}
	this.stopGame = function(){
		if(callback){
			clearInterval(callback);
		}
		callback=undefined;
	};

}