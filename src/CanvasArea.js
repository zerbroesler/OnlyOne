function CanvasArea() {

	var canvas=undefined;
	var stage = undefined;
	var sizeX = c.CANVAS_SIZE_X;
	var sizeY = c.CANVAS_SIZE_Y;

	this.getStage = function() {
		return stage;
	};
	this.getSize = function(){
		return {
			x:sizeX,
			y:sizeY,
		};
	};

	this.setCanvas = function() {

		canvas = document.getElementById('canvas');
		canvas.width = sizeX;
		canvas.height = sizeY;
		canvas.style.border = "1px solid black";
		canvas.addEventListener("click", keyboardOnly, true);
		return canvas.getContext('2d');
	};
	function keyboardOnly(){
		alert("Sorry only keyboard control...");
	}

	this.clearScreen = function() {

		stage.fillStyle = c.BACKGROUND_COLOR;
		stage.fillRect(0, 0, sizeX, sizeY);
	};
	this.addKeyDownEvent =function(callback){
		window.addEventListener("keydown",callback,true);
	};

	stage = this.setCanvas();
}