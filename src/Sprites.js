function Sprites() {

	var sprites = {
		player : {
			path : 'player'
		},
		tree1 : {
			path : 'tree1'
		},
		// Presents
		present1 : {
			path : 'present1'
		},
		present2 : {
			path : 'present2'
		},
		// Persons
		person1 : {
			path : 'person1'
		},
		person2 : {
			path : 'person2'
		},
		// Attributes
		attribute0 : {
			path : 'blase'
		},
		attribute1 : {
			path : 'attribute1'
		},
		attribute2 : {
			path : 'attribute2'
		},
		
	};

	this.loadSprites = function(callback) {
		// generate attributes
		for (var i = 0; i <= c.ATTRIBUTE.COLOR.COUNT ; i++) {
			var path='acol'+i;
			addSprite(path);
		};
		for (var i = 1; i <= c.ATTRIBUTE.BAND.COUNT ; i++) {
			var path='aband'+i;
			addSprite(path);
		};
		for (var i = 1; i <= c.ATTRIBUTE.PATTERN.COUNT ; i++) {
			var path='apatt'+i;
			addSprite(path);
		};
		function addSprite(path){
			sprites[path] ={
					path:path,
			};
		}
		
		
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