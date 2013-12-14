function GameModel() {
	// Model of the Game
	// Doesn't know other objects, just defines the data model

	var callback=undefined;
//	var monsterManager=undefined;
//	var playfield=undefined;
	var level=undefined;
	var playerPos={
			x:0,
			y:0,
			xFine:0,
			yFine:0,
			fine:0,
	};
	var monsters=[];
	var direction=c.DIRECTION.STOP; // desired direction
	var currentDirection=c.DIRECTION.STOP;
	var doors=[];
	var changedDoors=[];
	var exit=undefined;
	var spawn=[];
	var spawnAround=0;
	var score=0;
	var ready=0;
	var gameOver=0;
	var lives=3;
	var screen=c.SCREEN.TITLE;
	var buttonNumber=undefined; // Button on title screen
	var hasKey=false;
	var buttonSelectionEvent = new Event();
	var pickupEvent = new Event();
	var pickupKeyEvent = new Event();
	var walkStartEvent = new Event();
	var walkStopEvent = new Event();
	var startEvent = new Event();
	var readyEvent = new Event();
	var openDoorEvent = new Event();
	var levelDoneEvent = new Event();
	var dieEvent = new Event();

	this.getGameState=function(){
		return {
			level:this.getLevel(),
			screen:this.getScreen(),
			score:this.getScore(),
			lives:this.getLives(),
		};
	};
	this.setGameState=function(state){
		if(!state){
			return;
		}
		this.loadLevel(state.level);
		this.setScreen(state.screen);
		score=state.score;
		lives=state.lives;
	};
	
	this.loadLevel = function(LevelNumber) {
		// load level
        level = new Level(LevelNumber);
        level.number=LevelNumber;
	};
	this.setScreen = function(iScreen){
		screen=iScreen;
	};
	this.getLives = function(){
		return lives;
	};
	this.getScreen = function(){
		return screen;
	};
	this.getLevel = function(){
		return level;
	};
	this.getReady = function(){
		return ready;
	};
	this.decreaseGameOver = function(){
		gameOver--;
		if(gameOver<1){
			// start from the beginning
		}
	};
	this.setGameOver = function(over){
		gameOver=over;
	};
	this.getGameOver = function(){
		return gameOver;
	};
	this.getPlayerPos = function(){
		return playerPos;
	};
	this.getMonsters = function(){
		return monsters;
	};
	this.getScore = function(){
		return score;
	};
	this.getShots = function(){
		return 123;
	};
	this.registerPickup = function(listener){
		pickupEvent.attach(listener);
	};
	this.registerPickupKey = function(listener){
		pickupKeyEvent.attach(listener);
	};
	this.registerWalkStart = function(listener){
		walkStartEvent.attach(listener);
	};
	this.registerWalkStop = function(listener){
		walkStopEvent.attach(listener);
	};
	this.registerStart = function(listener){
		startEvent.attach(listener);
	};
	this.registerReady = function(listener){
		readyEvent.attach(listener);
	};
	this.registerOpenDoor = function(listener){
		openDoorEvent.attach(listener);
	};
	this.registerLevelDone = function(listener){
		levelDoneEvent.attach(listener);
	};
	this.registerDie = function(listener){
		dieEvent.attach(listener);
	};
	this.registerButtonSelection=function(listener){
		buttonSelectionEvent.attach(listener);
	};
	
//	this.getMonsterManager = function(){
//		return monsterManager;
//	};

	this.startGame = function() {
	
		$this=this;
		if(screen==c.SCREEN.TITLE){
			// Title Screen only, don't start the game
			return;
		}
		// reset level
		playerPos.x=level.getPlayerStart().x;
		playerPos.y=level.getPlayerStart().y;
		playerPos.fine=0;
		playerPos.xFine=playerPos.x;
		playerPos.yFine=playerPos.y;;
		monsters=[];
		direction=c.DIRECTION.STOP; // desired direction
		currentDirection=c.DIRECTION.STOP;
		doors=[];
		exit=undefined;
		changedDoors=[];
//		score=0;
		hasKey=false;
		ready=100;
		readyEvent.notify();

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
	
	this.setDirection = function(iDirection){
		direction=iDirection;
	};
	this.getDoors=function(){
		return doors;
	};
	this.getChangedDoors=function(){
		return changedDoors;
	};
	this.clearDoors=function(){
		doors=[];
		changedDoors=[];
	};
	this.addDoor=function(door){
		doors.push(door);
		changedDoors.push(door); 
	};
	this.addSpawn=function(spawnPoint){
		spawn.push(spawnPoint);
	};
	this.setExit = function(pos){
		exit=pos;
		exit.open=0;
	};
	this.getExit = function(pos){
		return exit;
	};
	this.selectButton = function(ibuttonNumber){
		buttonNumber=ibuttonNumber;
		buttonSelectionEvent.notify(ibuttonNumber);
	};
	this.getButtonNumber = function(){
		return buttonNumber;
	};
	this.swingDoors=function(){
		for (var i = 0; i < doors.length; i++) {
			var door=doors[i];
			if(door.swing==0){
				continue;
			}
			if(Math.abs(door.swing)==1){
				door.direction+=door.swing;
				door.direction=door.direction%4;
				door.swing=0;
			}else{
				if(door.swing>0){
					door.swing--;
				}else{
					door.swing++;
				}
			}
			changedDoors.push(door); // Redraw the door
		}
		// Exit Door
		if(exit.open>0){
			exit.open+=0.4;
			if(exit.open>=32){
				levelDoneEvent.notify();
				// Level finished
			}
		}
		
	};
	this.movePlayer =function(direction){
		var xTo=0;
		var yTo=0;
		if(playerPos.fine==0 && playerPos.x%3==1 && playerPos.y%3==1){
			// Turning just possible on center of fields
			var offset=getOffset(direction);
			if(checkDirectionPossible(playerPos,offset.x,offset.y)){
				currentDirection=direction;
				if(direction!=c.DIRECTION.STOP){
					walkStartEvent.notify();
				}
			}else{
				currentDirection=c.DIRECTION.STOP;
				walkStopEvent.notify();
			}
			direction=c.DIRECTION.STOP;
		}
		var offset=getOffset(currentDirection);
		xTo=offset.x;
		yTo=offset.y;
			
		if(currentDirection!=c.DIRECTION.STOP){
			// Move the player further
			playerPos.fine++;
			if(playerPos.fine>c.PLAYER.SPEED){
				playerPos.fine=0;
				playerPos.x+=xTo;
				playerPos.y+=yTo;
			}
		}
		playerPos.xFine=playerPos.x+xTo*playerPos.fine/c.PLAYER.SPEED;
		playerPos.yFine=playerPos.y+yTo*playerPos.fine/c.PLAYER.SPEED;
		return direction;
		
	};
	moveMonster =function(monster){
		var xTo=0;
		var yTo=0;
		if(monster.fine==0 && monster.x%3==1 && monster.y%3==1){
			// Turning just possible on center of fields
			var direction=monster.currentDirection;
			if(monster.currentDirection==c.DIRECTION.STOP || Math.random()>c.MONSTER.ZIGZAG){
				direction=Math.floor(Math.random()*3.999)+1; // 0=Stop
			}
			var offset=getOffset(direction);
			if(checkDirectionPossible(monster,offset.x,offset.y)){
				monster.currentDirection=direction;
			}else{
				monster.currentDirection=c.DIRECTION.STOP;
			}
		}
		var offset=getOffset(monster.currentDirection);
		xTo=offset.x;
		yTo=offset.y;
			
		if(monster.currentDirection!=c.DIRECTION.STOP){
			// Move the monster further
			monster.fine++;
			if(monster.fine>c.PLAYER.SPEED){
				monster.fine=0;
				monster.x+=xTo;
				monster.y+=yTo;
			}
		}
		monster.xFine=monster.x+xTo*monster.fine/c.PLAYER.SPEED;
		monster.yFine=monster.y+yTo*monster.fine/c.PLAYER.SPEED;
		
	};
	
	function grabItem(){
		var x=Math.floor(playerPos.xFine);
		var y=Math.floor(playerPos.yFine);
		takeItem(level.getGround(x,y));
		var x=Math.ceil(playerPos.xFine);
		var y=Math.ceil(playerPos.yFine);
		takeItem(level.getGround(x,y));
		
		function takeItem(ground){
			switch (ground) {
			case c.FIELD.RING:
				addScore(10);
				pickupEvent.notify(c.FIELD.RING);
				level.clearGround(x,y);
				break;
			case c.FIELD.KEY:
				pickupKeyEvent.notify(c.FIELD.KEY);
				gotKey();
				level.clearGround(x,y);
				break;
	
			default:
				break;
			}
		}
	}
	function gotKey(){
		hasKey=true;
	}
	function addScore(ammount){
		score+=ammount;
	}
	function getOffset(direction){
		var xTo=0;
		var yTo=0;
		switch(direction){
		case c.DIRECTION.UP:
			xTo=0;
			yTo=-1;
			break;
		case c.DIRECTION.DOWN:
			xTo=0;
			yTo=1;
			break;
		case c.DIRECTION.LEFT:
			xTo=-1;
			yTo=0;
			break;
		case c.DIRECTION.RIGHT:
			xTo=1;
			yTo=0;
			break;

		default:
			break;
		}
		return {
			x:xTo,
			y:yTo};
	};
	function checkDirectionPossible(playerPos,toX,toY){
		if(exit.open>0){
			// When the exit opens, no further movement is possible
			return false;
		}
		toXThick=toX;
		if(toX>0){
			toXThick=2;
		};
		toYThick=toY;
		if(toY>0){
			toYThick=2;
		};
		var ground=level.getGround(playerPos.x+toXThick,playerPos.y+toYThick);
		switch (ground) {
		case c.FIELD.WALL:
		case c.FIELD.ENTRY:
			return false;
			break;
		case c.FIELD.RING:
		case c.FIELD.PROTECTED:
		case c.FIELD.DIAMOND:
		case c.FIELD.KEY:
			if(playerPos.monster){
				return false;
			}else{
				return true;
			}
		case c.FIELD.EXIT2:
			// Monsters cannot escape
			if(playerPos.monster){
				return false;
			}
			// Test if player has the key
			if(hasKey){
				exit.open=1;  // open the exit
				openDoorEvent.notify();
				return false; // wait until it is open
			}else{
				return false;
			}
			break;
		case c.FIELD.DOOR:
		case c.FIELD.EMPTY:
			// Check if Rotating Door is near
			var x=playerPos.x;
			var y=playerPos.y;
			for (var i = 0; i < doors.length; i++) {
				var door=doors[i];
				if(x>=door.x-2&&y>=door.y-2&&x<=door.x+1&&y<=door.y+1){
					// Door near, see if we want to pass through
					if(door.x-x==toXThick && x!=0 && door.direction==0){
						// Monsters are not allowed to pass!
						if(playerPos.monster){
							return false;
						}
						if(y>door.y){
							door.direction=(door.direction-toX+4)%4;
							door.swing=-toX*4;
						}else{
							door.direction=(door.direction+toX+4)%4;
							door.swing= toX*4;
						}
						changedDoors.push(door); // Redraw the door
						break;
					};
					if(door.y-y==toYThick && y!=0 && door.direction!=0){
						// Monsters are not allowed to pass!
						if(playerPos.monster){
							return false;
						}
						if(x<door.x){
							door.direction=(door.direction-toY+4)%4;
							door.swing=-toY*4;
						}else{
							door.direction=(door.direction+toY+4)%4;
							door.swing= toY*4;
						}
						changedDoors.push(door); // Redraw the door
						break;
					};
				}
			}
			return true;
			break;
		default:
			return true;
			break;
		}
	}
	
	// Monsters
	function spawnAndMoveMonsters(){
		var monster;
		// Spawn new monsters
		if(monsters.length<level.getMaxMonsters()){

			spawnAround++;
			spawnAround%=spawn.length;
			var spawnPoint=spawn[spawnAround];
			var monsterType=undefined;
			switch (Math.floor(Math.random()*2)){
			case 0:
				monsterType = c.MONSTER.SKULL;
				break;
			case 1:
				monsterType = c.MONSTER.SNAKE;
				break;
			default:
				break;
			}

			monster={
				x:spawnPoint.x,
				y:spawnPoint.y,
				xFine:spawnPoint.x,
				yFine:spawnPoint.y,
				fine:0,
				monster:true,
				type:monsterType,
				currentDirection:c.DIRECTION.STOP,
			};
			monsters.push(monster);
		};
		for (var i = 0; i < monsters.length; i++) {
			var monster=monsters[i];
			moveMonster(monster);
		}
	}
	function monsterCollision(){
		// Check collision and end Game
		for (var i = 0; i < monsters.length; i++) {
			var monster=monsters[i];
			var distance = checkDistance(monster,playerPos);
			if(distance<1){
				dieEvent.notify();
			}
			
		}
	}
	function checkDistance(pos1,pos2){
		return Math.sqrt((Math.pow(pos1.xFine-pos2.xFine, 2)+Math.pow(pos1.yFine-pos2.yFine, 2)));
	}
	
	this.stopGame = function(){
		if(callback){
			clearInterval(callback);
		}
		callback=undefined;
	};

}