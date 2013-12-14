function Sprites() {

	var sprites = {
		player : {
			path : 'player-walk0'
		},
		playerWalk1 : {
			path : 'player-walk1'
		},
		playerWalk2 : {
			path : 'player-walk2'
		},
		exit : {
			path : 'door'
		},
		ring : {
			path : 'ring'
		},
		key : {
			path : 'key'
		},
		snake0 : {
			path : 'asnake0'
		}, 
		snake1 : {
			path : 'asnake1'
		}, 
		snake2 : {
			path : 'asnake2'
		}, 
		snakeL0 : {
			path : 'snakeL0'
		}, 
		snakeL1 : {
			path : 'snakeL1'
		}, 
		snakeL2 : {
			path : 'snakeL2'
		}, 
		snakeR0 : {
			path : 'asnake0'
		}, 
		snakeR1 : {
			path : 'asnake1'
		}, 
		snakeR2 : {
			path : 'asnake2'
		}, 
		skull0 : {
			path : 'skull0'
		}, 
		skull1 : {
			path : 'skull1'
		}, 
		skull2 : {
			path : 'skull2'
		}, 
		skullR0 : {
			path : 'skullR0'
		}, 
		skullR1 : {
			path : 'skullR1'
		}, 
		skullR2 : {
			path : 'skullR2'
		}, 
		skullL0 : {
			path : 'skullL0'
		}, 
		skullL1 : {
			path : 'skullL1'
		}, 
		skullL2 : {
			path : 'skullL2'
		}, 
		title : {
			path : 'title'
		}, 
	};

	this.loadSprites = function(callback) {
		var toLoad=0;
		// load all game images here
		for ( var spriteName in sprites) {
			var sprite = sprites[spriteName];
			sprite.image = loadImage('sprites/'+sprite.path + '.png');
			toLoad++;
		}
		var loading = setInterval(function(){
			for ( var spriteName in sprites) {
				var sprite = sprites[spriteName].image;
				if(sprite.complete && !sprite.counted){
					toLoad--;
					sprite.counted=true;
				};
			};
			if(toLoad==0){
				clearInterval(loading);
				callback();
			}
		},200);
	};

	this.getSprite = function(name) {
		return sprites[name];
	};

	function loadImage(name) {
		// create new image object
		var image = new Image();
		// load image
		image.src = name;
		// return image object
		return image;
	}
}