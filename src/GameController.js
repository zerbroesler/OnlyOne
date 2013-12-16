function GameController(gameModel, gameView,sound,sprites,game) {

	this.initialize = function() {
		// Add callbacks and register for model changes
		gameModel.registerEvent('startTitle',this.startTitle);
		gameModel.registerEvent('startPresents',this.startPresents);
		gameModel.registerEvent('correctAnswer',correctAnswer);
		gameModel.registerEvent('checked',checked);
		gameModel.registerEvent('nextLevel',nextLevel);
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
		gameModel.setLevel(3); // TODO: Start Level
		setupLevelUi();
		loadLevel();
	};
	function nextLevel(){
		setupLevelUi();
		loadLevel();
	} 
	
	function setupLevelUi(){
		gameView.clearAll();
		var buttons=gameModel.getButtons();
		buttons.reset();
		buttons.addButton({
			text:'Menu',
			id: c.BUTTONS.MENU,
			x:0,
			y:0,
			sx:4,
			sy:2,
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
		
	}

	
	function loadLevel(){
		gameModel.loadLevel();
		var level = gameModel.getLevel();
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
			var xPos=i;

			// Target 'button'
			buttons.addButton({
				text:' ',
				id: i+c.BUTTONS.PERSONS,
				x:10+xPos*c.PERSON.XSIZE/5,
				y:6,
				sx:c.PERSON.XSIZE/5,
				sy:8,
				invisible:true,
			});
			for ( var att in person) {
				var value=person[att];
				var no=false;
				// Add only non 0 values which are not col(or)
				if(value!=0 || att=='col'){
					// negative values show a no sign
					if(value<0){
						value=Math.abs(value);
						no=true;
					}
					presents.addPresent({
						noMove : true,  // Cannot be clicked or moved
						no: no,
						name: 'a'+att+value,
						id: i+200,
						x:xPos*c.PERSON.XSIZE+60,
						y:5,
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
			if(i>=2){
				yPos+=14;
				xPos-=5; //-=8;
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
	
	function checked(){
		// Redraw ui when checked
		gameView.clearAll();
	}
	
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