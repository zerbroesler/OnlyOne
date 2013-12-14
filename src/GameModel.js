function GameModel() {
	// Model of the Game
	// Doesn't know other objects, just defines the data model

	var callback=undefined;
	var score=0;
	var screen=c.SCREEN.TITLE;
	var buttons=new Buttons(this);
	var presents=new Presents(this);

	var events={
			startTitle : new Event(),
			startPresents : new Event(),
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
	this.getButtons = function(){
		return buttons;
	};
	this.getPresents = function(){
		return presents;
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
			a=1;// TODO: Game loop
		}, 16);
	};
	
	this.buttonClicked = function(button){
		events.buttonSelection.notify(button.id);
		switch(screen) {
		case c.SCREEN.TITLE:
			if(button.id=c.BUTTONS.START){
				screen=c.SCREEN.GAME;
				events.startPresents.notify();
			}
			break;
		case c.SCREEN.GAME:
			if(button.id=c.BUTTONS.MENU){
				screen=c.SCREEN.TITLE;
				events.startTitle.notify();
			}
			
			break;

		default:
			break;
		}
	} 
	
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