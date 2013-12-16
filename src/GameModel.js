function GameModel() {
	// Model of the Game
	// Doesn't know other objects, just defines the data model

	var callback=undefined;
	var score=0;
	var screen=c.SCREEN.TITLE;
	var buttons=new Buttons(this);
	var presents=new Presents(this);
	var level=undefined;
	var levelNumber=undefined;
	var assigned=undefined;

	var events={
			startTitle : new Event(),
			startInstructions : new Event(),
			startPresents : new Event(),
			buttonSelection : new Event(),
			correctAnswer: new Event(),
			nextLevel: new Event(),
			checked: new Event(),
	};
	this.setScreen = function(iScreen){
		screen=iScreen;
	};
	this.getScreen = function(){
		return screen;
	};
	this.setLevel = function(levelNo){
		levelNumber=levelNo;
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
			if(button.id==c.BUTTONS.START){
				screen=c.SCREEN.GAME;
				events.startPresents.notify();
			}
			if(button.id==c.BUTTONS.INSTRUCIONS){
				screen=c.SCREEN.INSTRUCTIONS;
				events.startInstructions.notify();
			}
			break;
		case c.SCREEN.INSTRUCTIONS:
			if(button.id==c.BUTTONS.MENU){
				screen=c.SCREEN.TITLE;
				events.startTitle.notify();
				return;
			}
		case c.SCREEN.GAME:
			switch (button.id) {
			case c.BUTTONS.MENU:
				screen=c.SCREEN.TITLE;
				events.startTitle.notify();
				// No further processing here
				return;
				break;
			case c.BUTTONS.CHECK:
				// check if it was solved correctly
				checkSolution();
				break;
			case c.BUTTONS.NEXT:
				// Next Level
				nextLevel();
			default:
				break;
			}// switch button.id
			break;
		case c.SCREEN.GAME_OVER:
		default:
			break;
		}// switch screen
	}; 
	
//	this.presentClicked = function(present){
//		switch(screen) {
//		case c.SCREEN.TITLE:
//			a=b; //TODO: Error
//		case c.SCREEN.GAME:
//			a=1;
//			// No further processing here
//			return;
//			break;
//		default:
//			break;
//		}
//	};
	function nextLevel(){
		levelNumber++;
		events.nextLevel.notify();
	}
	
	this.clearAssigned = function(){
		var persons =level.getPersons();
		assigned=[];
		for (var i = 0; i < persons.length; i++) {
			assigned.push(-1);
		}
	};
	this.assignTo = function(present,button){
		if(button){
			assigned[button.id-c.BUTTONS.PERSONS]=present.id-c.BUTTONS.PRESENTS;
		}
	};
	this.unassign = function(id){
		assigned[id]=-1;
	};
	this.getAssigned = function(button){
		if(assigned){
			return assigned[button.id-c.BUTTONS.PERSONS];
		}
	};
	this.findAssigned = function(present){
		for (var i = 0; i < assigned.length; i++) {
			var assign = assigned[i];
			if (assign+c.BUTTONS.PRESENTS==present.id){
				return i;
			}
		}
		return undefined;
	};
	
	function checkSolution(){
		// solution is in level
		var persons =level.getPersons();
		var presents=level.getPresents();
		var correct=0;
		for (var i = 0; i < persons.length; i++) {
			var person = persons[i];
			
			// Get the present
			if(assigned[i]==-1){
				person.correct=false;
				continue; // No present assigned
			}
			var present=presents[assigned[i]];
			
			// compare present with person wish
			if(compare(present,person)){
				person.correct=true;
				correct++;
			}else{
				person.correct=false;
			}
		}	
		events.checked.notify();
		// Everything correct?
		if(correct==persons.length){
			events.correctAnswer.notify();
		}
	}
	function compare(present,person){
		var value;
		for ( var attribute in present) {
			if(person[attribute]<0){
				value = Math.abs(person[attribute]);
				if(present[attribute]==value){
					return false;
				}
			}else{
				if(present[attribute]!=person[attribute] && person[attribute]!=0){
					return false;
				}
			}
		}
		return true;
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

	this.loadLevel =function(){
		level = new Levels(levelNumber);
		this.clearAssigned();
//		buttons.reset();
		presents.reset();
		
	};
	this.getLevel =function(){
		return level;
	};
	
}