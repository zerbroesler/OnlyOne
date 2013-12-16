function PresentsUi(gameModel,canvas,sprites,buttonUi,blocksize){

	
	this.draw=function(){
		canvas.clearScreen();
//		var stage = canvas.getStage();
//		stage.shadowBlur=100;
//		stage.shadowColor = "red";
		canvas.drawImage('tree1',2,15,45,55);
		
		// Persons
		var persons = gameModel.getLevel().getPersons();
		for (var i = 0; i < persons.length; i++) {
			var person = persons[i];
			var image='person'+(i+1);
			if(person.correct){
				image+='a';
			}
			canvas.drawImage(image,50+i*c.PERSON.XSIZE,30,c.PERSON.XSIZE,c.PERSON.YSIZE);
			
		}
		buttonUi.drawAll();
		stage.shadowBlur=0;
		canvas.clearRectFront();
		this.drawAllPresents();
	};
	
    this.drawAllPresents = function() {
    	var presents = gameModel.getPresents().getPresents();
        for (var i = 0; i < presents.length; i++) {
            this.drawPresent(presents[i]);
        }
    };


    this.drawPresent = function(present) {
        
        var posX = present.x*blocksize;
        var posY = present.y*blocksize;
        var sizeX = present.sx*blocksize;
        var sizeY = present.sy*blocksize;
		if(present.name.length==1 && present.name[0]=='acol0'){
			// don't draw an empty wish
			return;
		}
        for (var i = 0; i < present.name.length; i++) {
			var name = present.name[i];
	        canvas.drawImageFront(name,posX,posY,sizeX,sizeY);
		}
		if(present.no){
	        canvas.drawImageFront('no',posX,posY,sizeX,sizeY);
		}

    };

    this.checkClicked = function(mouse) {
    	// Checks which button was clicked. Also supports radio button groups
        var present = this.getClicked(mouse);
        if (!present) {
            return undefined;
        }
        return present;
    };

    this.getClicked = function(mouse) {
    	var presents = gameModel.getPresents().getPresents();
    	// Check which button was clicked
        for (var i = 0; i < presents.length; i++) {
            if (checkPresentClicked(presents[i], mouse)) {
                if(presents[i].noMove){
                	// Cannot move or interact with these
                	continue;
                }
                return presents[i];
            };
        };
        return undefined;
    };
    function checkPresentClicked(button,mouse){
        var x=button.x*blocksize;
        var y=button.y*blocksize;
        var sx=button.sx*blocksize; // sizex
        var sy=button.sy*blocksize; // sizey
        if (mouse.x < x || mouse.x > x+sx || mouse.y < y || mouse.y > y+sy) {
            // button not hit
            return false;
        } else {
            // Hit
            return true;
        }
    };        
    this.screenToCoord=function(posIn){
    	return {
    		x:posIn.x/blocksize,
    		y:posIn.y/blocksize,
    	};
    };
    this.coordToScreen=function(present){
    	return {
    		x:present.x*blocksize,
    		y:present.y*blocksize,
    	};
    };
};