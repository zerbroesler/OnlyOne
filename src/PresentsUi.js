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
        
        var posX = present.x;
        var posY = present.y;
        var sizeX = present.sx;
        var sizeY = present.sy;
        var name = present.name;
        
        canvas.drawImageFront(name,posX,posY,sizeX,sizeY);
        

    };

    this.checkClicked = function(mouse) {
    	var buttons = gameModel.getButtons().getButtons();
    	// Checks which button was clicked. Also supports radio button groups
        var button = this.getClicked(mouse);
        if (!button) {
            return undefined;
        }
        // Radio button logic
        if (button.group) {
            button.selected=true;
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].group == button.group && button.id!=buttons[i].id) {
                    buttons[i].selected=false;
                };
            };
        };
        return button;
    };

    this.getClicked = function(mouse) {
    	var buttons = gameModel.getButtons().getButtons();
    	// Check which button was clicked
        for (var i = 0; i < buttons.length; i++) {
            if (checkPresentClicked(buttons[i], mouse)) {
                return buttons[i];
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
	
	
	
	
	
};