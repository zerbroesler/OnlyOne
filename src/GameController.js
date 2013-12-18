function GameController(gameModel, gameView,sound,sprites,game) {

	this.initialize = function() {
		// Add callbacks and register for model changes
		gameModel.registerEvent('startTitle',this.startTitle);
		gameModel.registerEvent('startLevels',this.startLevels);
		gameModel.registerEvent('startPresents',this.startPresents);
		gameModel.registerEvent('startInstructions',this.startInstructions);
		gameModel.registerEvent('endScreen',this.endScreen);
		gameModel.registerEvent('correctAnswer',correctAnswer);
		gameModel.registerEvent('wrongAnswer',wrongAnswer);
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
				x:15,
				y:12,
				sx:10,
				sy:2,
		});
		gameModel.getButtons().addButton({
				text:'Instructions',
				id :c.BUTTONS.INSTRUCIONS,
				x:15,
				y:15,
				sx:10,
				sy:2,
		});
		sound.playSound("song1");//TODO Title song
	};

	this.startInstructions = function(){
		gameView.clearAll();
		var buttons=gameModel.getButtons();
		buttons.reset();
		buttons.addButton({
			text:'Back',
			icon:'back',
			id: c.BUTTONS.MENU,
			x:32,
			y:16,
			sx:4,
			sy:4,
		});
	};
	this.startLevels = function(){
		gameView.clearAll();
		var buttons=gameModel.getButtons();
		buttons.reset();
		buttons.addButton({
			text:'Back',
			icon:'back',
			id: c.BUTTONS.MENU,
			x:32,
			y:16,
			sx:4,
			sy:4,
		});
		for (var x = 0; x < 6; x++) {
			for (var y = 0; y < 4; y++) {
				buttons.addButton({
					text:y*6+x+1,
					id: y*6+x+101,
					x:x*4+5,
					y:y*4+2,
					sx:3,
					sy:3,
				});
			}
			
		}
	};
	
	this.startPresents = function(){
		sound.stopSound("song1");
//		gameModel.setLevel(101); // TODO: Start Level
		setupLevelUi();
		loadLevel();
	};
	function nextLevel(){
		setupLevelUi();
		loadLevel();
	} 
	this.endScreen = function(){
		gameView.clearAll();
		sound.playSound("hey");
		var buttons=gameModel.getButtons();
		buttons.reset();
		buttons.addButton({
			text:'Back',
			id: c.BUTTONS.MENU,
			x:32,
			y:18,
			sx:4,
			sy:2,
		});
		
		
	}
	
	function setupLevelUi(){
		gameView.clearAll();
		var buttons=gameModel.getButtons();
		buttons.reset();
		buttons.addButton({
			text:'Menu',
			icon:'back',
			id: c.BUTTONS.MENU,
			x:0,
			y:0,
			sx:3,
			sy:3,
			selected:false,
		});
		buttons.addButton({
			text:'Check',
			icon:'check',
			id: c.BUTTONS.CHECK,
			x:30,
			y:16,
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
		sound.playSound("success");
		gameModel.getButtons().addButton({
			text:'Next Level',
			id: c.BUTTONS.NEXT,
			x:12,
			y:15,
			sx:10,
			sy:2,
		});
	}
	function wrongAnswer(){
		sound.playSound("wrong");
	}

}