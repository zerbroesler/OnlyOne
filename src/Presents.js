function Presents(gameModel){

	var presents = [];

	this.reset = function(){
    	presents=[];
    };
    this.getPresents=function(){
    	return presents;
    };
    this.addPresent = function(iSpec) {
        var spec = {};
        spec.id = iSpec.id;
        spec.name = iSpec.name;
        spec.x = iSpec.x;
        spec.y = iSpec.y;
        spec.sx = iSpec.sx || 1;
        spec.sy = iSpec.sy || 1;
        spec.selected = iSpec.selected || false;
        spec.group = iSpec.group;
        presents.push(spec);
    };
    
    function selectPresent(number){
    	var buttons = gameModel.getButtons().getButtons();
    	for (var i = 0; i < buttons.length; i++) {
    		if(buttons[i].id==number){
    			buttons[i].selected=true;
    		}
    		buttons[i].selected=false;
		}
    }
}    
