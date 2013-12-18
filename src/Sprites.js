function Sprites() {

	var sprites = {
		title : {
			path : 'title'
		},
		tree1 : {
			path : 'baum'
		},
		// Not this one
		no : {
			path : 'no'
		},		
		// = !=
		equal : {
			path : 'equal'
		},		
		notEqual : {
			path : 'notEqual'
		},		
		check : {
			path : 'check'
		},		
		back : {
			path : 'back'
		},		
		// Persons
		person1 : {
			path : 'person1'
		},
		person2 : {
			path : 'person2'
		},
		person3 : {
			path : 'person3'
		},
		person4 : {
			path : 'person4'
		},
		person1a : {
			path : 'person1a'
		},
		person2a : {
			path : 'person2a'
		},
		person3a : {
			path : 'person3a'
		},
		person4a : {
			path : 'person4a'
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
		for (var i = 0; i <= c.ATTRIBUTE.PATTERN.COUNT ; i++) {
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