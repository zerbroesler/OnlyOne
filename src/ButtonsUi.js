function ButtonsUi(gameModel,stage,blocksize) {

	

    this.drawAll = function() {
    	var buttons = gameModel.getButtons().getButtons();
        for (var i = 0; i < buttons.length; i++) {
            this.drawButton(buttons[i]);
        }
    };


    this.drawButton = function(button) {
        
        var sText = button.text;
        var posX = button.x;
        var posY = button.y;
        var sizeX = button.sx;
        var sizeY = button.sy;
        
        var x=posX*blocksize;
        var y=posY*blocksize;
        var sx=sizeX*blocksize-1;
        var sy=sizeY*blocksize-1;
        var textColor;
//        stage.fillStyle = c.TITLE_BACKGROUND_COLOR;
//        
//        stage.fillRect(x-20,y-20,sx+40,sy+40);
        if(button.selected){
        	blur=10;
            stage.strokeStyle = c.BUTTON.SELECTED_BORDER_COLOR;
            stage.fillStyle = c.BUTTON.SELECTED_BACKGROUND_COLOR;
            textColor= c.BUTTON.SELECTED_TEXT_COLOR;
        }else{     
            stage.strokeStyle = c.BUTTON.BORDER_COLOR;
            stage.fillStyle = c.BUTTON.BACKGROUND_COLOR;
            textColor= c.BUTTON.TEXT_COLOR;
        }
        if(button.invisible){
        	return;
//            stage.fillStyle = 'fuchsia';
        }
        stage.fillRect(x,y,sx,sy);
        stage.fillStyle = textColor;
        stage.font = "20px Verdana";
        stage.textAlign = 'center';
        stage.textBaseline = 'alphabetic';
        stage.fillText(sText, x+sx/2,y+sy*0.5+8);
        stage.strokeRect(x,y,sx,sy);
    };

    this.checkClicked = function(mouse) {
    	var buttons = gameModel.getButtons().getButtons();
    	// Checks which button was clicked. Also supports radio button groups
        var button = this.getClicked(mouse);
        if (!button) {
            return undefined;
        }
        if(button.invisible==true){
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
            if (checkButtonClicked(buttons[i], mouse)) {
                return buttons[i];
            };
        };
        return undefined;
    };
    function checkButtonClicked(button,mouse){
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
};
