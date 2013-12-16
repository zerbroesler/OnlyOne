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
        spec.x = iSpec.x;
        spec.y = iSpec.y;
        spec.sx = iSpec.sx || 1;
        spec.sy = iSpec.sy || 1;
        spec.selected = iSpec.selected || false;
        spec.group = iSpec.group;
        spec.noMove = iSpec.noMove || false;
		spec.no = iSpec.no || false;
        // check if it is only an additional attribute of a present.
        var presentExists = searchPresent(spec.id);
        if(presentExists){
        	// Update present (with name)
        	presentExists.name.push(iSpec.name);
			if(iSpec.no){
				presentExists.no=true;
			}
        }else{
        	// New present
            spec.name = [iSpec.name];
            presents.push(spec);
        }
    };
    
    function searchPresent(number){
    	var presents = gameModel.getPresents().getPresents();
    	for (var i = 0; i < presents.length; i++) {
    		if(presents[i].id==number){
    			return presents[i];
    		}
		}
    	return undefined;
    }
}    
