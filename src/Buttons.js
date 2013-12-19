function Buttons(gameModel){

	var buttons = [];

	this.reset = function(){
    	buttons=[];
    };
    this.getButtons=function(){
    	return buttons;
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
        spec.invisible = iSpec.invisible || false;
        spec.icon = iSpec.icon;
        spec.locked = iSpec.locked || false;
        buttons.push(spec);
        gameModel.registerEvent('buttonSelection',selectButton);
    };
    function selectButton(number){
    	var buttons = gameModel.getButtons().getButtons();
    	for (var i = 0; i < buttons.length; i++) {
    		if(buttons[i].id==number){
    			buttons[i].selected=true;
    		}
    		buttons[i].selected=false;
		}
    }
}    
