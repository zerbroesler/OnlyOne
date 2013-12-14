function GameController(gameModel, gameView,sound,sprites,game) {

	this.initialize = function() {
		// Add callbacks and register for model changes
		gameModel.registerEvent('startTitle',this.startTitle);
		gameModel.registerEvent('startPresents',this.startPresents);
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
		sound.playSound("song1");
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
		loadLevel();
	};

	
	function loadLevel(number){
		// just one level now
		var persons=[
		             {
		            	col:1,
		            	band:0,
		            	patt:0,
		             },
		             {
		            	col:0,
		            	band:2,
		            	patt:0,
		             },
		             {
		            	col:0,
		            	band:1,
		            	patt:0,
		             },
		             {
			           	col:0,
			           	band:0 ,
			           	patt:1,
			         },
		];
		var presents=[
	             {
		            	col:1,
		            	band:1,
		            	patt:2,
		             },
		             {
		            	col:2,
		            	band:2,
		            	patt:3,
		             },
		             {
		            	col:3,
		            	band:1,
		            	patt:4,
		             },
		             {
			           	col:1,
			           	band:3 ,
			           	patt:1,
			         },
		              ];
		
		initLevel(persons,presents);
	};

	
	function initLevel(persons,presentsList){
		var buttons=gameModel.getButtons();
		var presents=gameModel.getPresents();
		for (var i = 0; i < persons.length; i++) {
			var person = persons[i];
			var xPos=12+i*4;

			// Target 'button'
			buttons.addButton({
				text:' ',
				id: i,
				x:xPos,
				y:10,
				sx:3,
				sy:2,
				selected:false,
			});
			for ( var att in person) {
				var value=person[att];
				if(value!=0 || att=='col'){
					presents.addPresent({
						name: 'a'+att+value,
//						id: c.ATTRIBUTE.COLOR.RED,
						x:xPos*5,
						y:1,
						sx:10,
						sy:10,
					});
				}
			}
			
		} // for persons
		// Presents
		for (var i = 0; i < presentsList.length; i++) {
			var present = presentsList[i];
			var xPos=2+i*3;
			var yPos=80;
			if(i>2){
				yPos+=10;
				xPos-=7;
			}

			for ( var att in present) {
				var value=present[att];
				presents.addPresent({
					name: 'a'+att+value,
//					id: c.ATTRIBUTE.COLOR.RED,
					x:xPos*5,
					y:yPos,
					sx:10,
					sy:10,
				});
			}
			
		} // for persons
		
//		buttons.addButton({
//			text:'Oma',
//			id: c.BUTTONS.PRESENT1,
//			x:20,
//			y:10,
//			sx:3,
//			sy:3,
//			selected:false,
//		});
//		presents.addPresent({
//			name: 'attribute1',
//			id: c.ATTRIBUTE.COLOR.RED,
//			x:20,
//			y:20,
//			sx:10,
//			sy:10,
//		});
//		presents.addPresent({
//			name: 'attribute2',
//			id: c.ATTRIBUTE.COLOR.RED,
//			x:40,
//			y:20,
//			sx:10,
//			sy:10,
//		});
//		presents.addPresent({
//			name: 'acol1',
//			id: c.ATTRIBUTE.COLOR.RED,
//			x:60,
//			y:20,
//			sx:10,
//			sy:10,
//		});
	}
}