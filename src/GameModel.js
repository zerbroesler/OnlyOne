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
	var levelProgress=undefined;
	var levelTimer=undefined;
	var wrongTry=undefined;
	var success=undefined;
	var starsGained;

	var events={
			startTitle : new Event(),
			startInstructions : new Event(),
			startPresents : new Event(),
			startLevels : new Event(),
			endScreen : new Event(),
			buttonSelection : new Event(),
			correctAnswer: new Event(),
			wrongAnswer: new Event(),
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
	this.getLevelNumber = function(levelNo){
		return levelNumber;
	};
	this.getScore = function(){
		return score;
	};
	this.getSuccess = function(){
		return success;
	};
	this.getStarsGained = function(){
		return starsGained;
	}
	this.getButtons = function(){
		return buttons;
	};
	this.getPresents = function(){
		return presents;
	};
	this.getStars = function(){
		return levelProgress;
	};
	this.registerEvent = function(name,listener){
		events[name].attach(listener);
	};

	this.startGame = function() {
	
		$this=this;
// Reset scores		
// delete localStorage.OnePresentLevelProgress;
		levelProgress=localStorage.OnePresentLevelProgress;
		if(!levelProgress){
		//                  123456789012345678901234
			levelProgress='00000000000000000000000000';
		}
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
				screen=c.SCREEN.LEVELS;
				events.startLevels.notify();
//				screen=c.SCREEN.GAME;
//				events.startPresents.notify();
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
		case c.SCREEN.LEVELS:
			if(button.id==c.BUTTONS.MENU){
				screen=c.SCREEN.TITLE;
				events.startTitle.notify();
				return;
			}
			if(button.id>100 && button.id<125){
				this.setLevel(button.id-100);
				screen=c.SCREEN.GAME;
				events.startPresents.notify();				
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
			if(button.id==c.BUTTONS.MENU){
				screen=c.SCREEN.TITLE;
				events.startTitle.notify();
				return;
			}
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
		if(levelNumber>level.getMaxLevel()){
		// TODO: END Screen
			screen=c.SCREEN.GAME_OVER;
			events.endScreen.notify();
			return;
		}
		events.nextLevel.notify();
	}
	
	this.startLevel = function(){
		this.clearAssigned();
		levelTime=new Date().getTime();
		wrongTry=false;
		success=false;
	};
	
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
			// Calculate the stars
			var levelStars=1;
			starsGained=[];
			starsGained[0]=true;
			starsGained[1]=false;
			starsGained[2]=false;
			if(new Date().getTime()-levelTime<15000){
				// For solving in less than 15 seconds
				levelStars++;
				starsGained[2]=true;
			}
			if(!wrongTry){
				// For solving in first attempt
				levelStars++;
				starsGained[1]=true;
			}
			// Store to local storage
			levelProgress=levelProgress.substr(0, levelNumber) + levelStars + levelProgress.substr(levelNumber+1);
			localStorage.OnePresentLevelProgress=levelProgress;
			success=true;
			events.correctAnswer.notify(levelStars);
		}else{
			wrongTry=true;
			events.wrongAnswer.notify();
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