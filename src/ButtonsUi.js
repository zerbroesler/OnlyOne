function ButtonsUi(gameModel,stage,blocksize) {

    var buttons = [];

    this.drawAll = function() {

        for (var i = 0; i < buttons.length; i++) {
            this.drawButton(buttons[i]);
        }
    };

    this.addButton = function(iSpec) {
        var spec = {};
        spec.id = iSpec.id;
        spec.text = iSpec.text;
        spec.x = iSpec.x;
        spec.y = iSpec.y;
        spec.sx = iSpec.sx || 1;
        spec.sy = iSpec.sy || 1;
        spec.selected = iSpec.selected || false;
        spec.group = iSpec.group;
        buttons.push(spec);
        gameModel.registerButtonSelection(selectButton);
    };

    function selectButton(number){
    	for (var i = 0; i < buttons.length; i++) {
    		buttons[i].selected=false;
		}
		buttons[number].selected=true;
    }
	
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
        var blur=0;
        stage.fillStyle = c.TITLE_BACKGROUND_COLOR;
        stage.shadowBlur=0; //TODO:Blur
		stage.shadowColor=c.BUTTON.SELECTED_SHADOW_COLOR;
        
        stage.fillRect(x-20,y-20,sx+40,sy+40);
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
//        stage.shadowBlur=blur;
        stage.fillRect(x,y,sx,sy);
        stage.fillStyle = textColor;
        stage.font = "20px Verdana";
        stage.textAlign = 'center';
        stage.textBaseline = 'alphabetic';
        stage.fillText(sText, x+sx/2,y+sy*0.5+8);
        stage.strokeRect(x,y,sx,sy);
//        stage.shadowBlur=0;
    };
};
