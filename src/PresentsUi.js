function PresentsUi(gameModel,canvas,sprites,buttonUi,blocksize){

	
	this.draw=function(){
		canvas.clearScreen();
		canvas.drawImage('tree1',5,30,40,50);
		canvas.drawImage('present1',2,80,20,10);
		canvas.drawImage('present2',25,80,20,10);
		canvas.drawImage('person1',100,20,20,30);
		canvas.drawImage('person2',130,20,20,30);
		canvas.drawImage('attribute0',105,5,15,15);
		canvas.drawImage('attribute2',130,5,20,15);
		buttonUi.drawAll();
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
        var name = present.name;
        
        canvas.drawImageFront(name,posX,posY,sizeX,sizeY);
        

    };

    this.checkClicked = function(mouse) {
    	var presents = gameModel.getPresents().getPresents();
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