function GameController(gameModel, gameView,sound,sprites,game) {

	this.initialize = function() {
		// Add callbacks and register for model changes
		gameModel.registerEvent('startTitle',this.startTitle);
		gameModel.registerEvent('startPresents',this.startPresents);
		gameModel.registerEvent('correctAnswer',correctAnswer);
		gameView.registerMouse();
	};
	
	this.startTitle = function() {
		gameView.clearAll();
		gameModel.getButtons().reset();
		gameModel.getButtons().addButton({
				text:'Start',
				id: c.BUTTONS.START,
				x:12,
				y:10,
				sx:10,
				sy:2,
				selected:true,
		});
		gameModel.getButtons().addButton({
				text:'Tutorial',
				x:12,
				y:15,
				sx:10,
				sy:2,
		});
//		sound.playSound("song1");//TODO Title song
	};
	
	this.startPresents = function(){
		sound.stopSound("song1");
		gameView.clearAll();
		var buttons=gameModel.getButtons();
		buttons.reset();
		buttons.addButton({
			text:'Menu',
			id: c.BUTTONS.MENU,
			x:0,
			y:0,
			sx:3,
			selected:false,
		});
		buttons.addButton({
			text:'Check',
			id: c.BUTTONS.CHECK,
			x:30,
			y:14,
			sx:3,
			sy:3,
			selected:false,
		});
		loadLevel();
	};

	
	function loadLevel(number){
		var level = gameModel.getLevel(number);
		gameModel.clearAssigned();
		// just one level now
		var persons = level.getPersons();
		var presents = level.getPresents();
		
		initLevel(persons,presents);
	};
	
	
	function initLevel(persons,presentsList){
		var buttons=gameModel.getButtons();
		var presents=gameModel.getPresents();
		for (var i = 0; i < persons.length; i++) {
			var person = persons[i];
			var xPos=10+i*4;

			// Target 'button'
			buttons.addButton({
				text:' ',
				id: i+c.BUTTONS.PERSONS,
				x:xPos,
				y:6,
				sx:4,
				sy:8,
				invisible:true,
			});
			for ( var att in person) {
				var value=person[att];
				if(value!=0 || att=='col'){
					presents.addPresent({
						noMove : true,  // Cannot be clicked or moved
						name: 'a'+att+value,
						id: i+200,
						x:xPos*5+3,
						y:1,
						sx:14,
						sy:14,
					});
				}
			}
			
		} // for persons
		// Presents
		for (var i = 0; i < presentsList.length; i++) {
			var present = presentsList[i];
			var xPos=1+i*3;
			var yPos=70;
			if(i>2){
				yPos+=14;
				xPos-=8;
			}

			for ( var att in present) {
				var value=present[att];
				presents.addPresent({
					name: 'a'+att+value,
					id: i+c.BUTTONS.PRESENTS,
					x:xPos*5,
					y:yPos,
					sx:14,
					sy:14,
				});
			}
			
		} // for presents
		
	}// initLevel
	
	function correctAnswer(){
		gameModel.getButtons().addButton({
			text:'Next Level',
			id: c.BUTTONS.NEXT,
			x:12,
			y:15,
			sx:10,
			sy:2,
		});
	}

}