function GameModel() {
	// Model of the Game
	// Doesn't know other objects, just defines the data model

	var callback=undefined;
	var score=0;
	var screen=c.SCREEN.TITLE;
	var buttons=new Buttons(this);
	var presents=new Presents(this);
	var level=undefined;
	var assigned=undefined;

	var events={
			startTitle : new Event(),
			startPresents : new Event(),
			buttonSelection : new Event(),
			correctAnswer: new Event(),
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
			if(button.id==c.BUTTONS.START){
				screen=c.SCREEN.GAME;
				events.startPresents.notify();
			}
			break;
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
			default:
				break;
			}// switch button.id
			break;
		default:
			break;
		}// switch screen
	}; 
	this.presentClicked = function(present){
		switch(screen) {
		case c.SCREEN.TITLE:
			a=b; //TODO: Error
		case c.SCREEN.GAME:
			a=1;
			// No further processing here
			return;
			break;
		default:
			break;
		}
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
	
	function checkSolution(){
		// solution is in level
		var persons =level.getPersons();
		var presents=level.getPresents();
		var correct=0;
		for (var i = 0; i < persons.length; i++) {
			var person = persons[i];
			
			// Get the present
			if(assigned[i]==-1){
				continue; // No present assigned
			}
			var present=presents[assigned[i]];
			
			// compare present with person wish
			if(compare(present,person)){
				correct++;
			}
		}
		// Everything correct?
		if(correct==persons.length){
			events.correctAnswer.notify();
		}
	}
	function compare(present,person){
		for ( var attribute in present) {
			if(present[attribute]!=person[attribute] && person[attribute]!=0){
				return false;
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

	this.getLevel =function(number){
		var persons=[
	             {
	            	col:1,
	            	patt:0,
	            	band:0,
	             },
	             {
	            	col:0,
	            	patt:0,
	            	band:2,
	             },
	             {
	            	col:0,
	            	patt:0,
	            	band:1,
	             },
	             {
		           	col:0,
		           	patt:1,
		           	band:0 ,
		         },
		         ];
		var presents=[
             {
	            	col:1,
	            	patt:2,
	            	band:1,
	             },
	             {
	            	col:2,
	            	patt:3,
	            	band:2,
	             },
	             {
	            	col:3,
	            	patt:4,
	            	band:1,
	             },
	             {
		           	col:1,
		           	patt:1,
		           	band:3 ,
		         },
	              ];
		level ={
			getPersons:function(){
				return persons;
			},
			getPresents:function(){
				return presents;
			}
		};
		return level;
	};
	
}