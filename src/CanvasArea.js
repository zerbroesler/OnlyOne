function CanvasArea(sprites) {

	var canvas=undefined;
	var frontCanvas=undefined;
	var stage = undefined;
	var frontStage = undefined;
	var sizeX = c.CANVAS_SIZE_X;
	var sizeY = c.CANVAS_SIZE_Y;
	var blocksize = Math.floor(sizeY/100);

	this.getStage = function() {
		return stage;
	};
	this.getFrontStage = function() {
		return frontStage;
	};
	this.getCanvas = function() {
		return canvas;
	};
	this.getFrontCanvas = function() {
		return frontCanvas;
	};
	this.getSize = function(){
		return {
			x:sizeX,
			y:sizeY,
		};
	};
	this.getBlocksize = function(){
		return blocksize;
	}

	this.setCanvas = function() {

		frontCanvas = document.getElementById('frontCanvas');
		frontCanvas.width = sizeX;
		frontCanvas.height = sizeY;
		frontStage = frontCanvas.getContext('2d');
		canvas = document.getElementById('canvas');
		canvas.width = sizeX;
		canvas.height = sizeY;
		canvas.style.border = "1px solid black";
		return canvas.getContext('2d');
	};

	this.clearScreen = function() {

		stage.fillStyle = c.BACKGROUND_COLOR;
		stage.fillRect(0, 0, sizeX, sizeY);
	};

	stage = this.setCanvas();
	
	this.drawImage = function(name, x, y,xs,ys){
		var image = sprites.getSprite(name);
		x=x*blocksize;
		y=y*blocksize;
		xs=xs*blocksize;
		ys=ys*blocksize;
	    stage.drawImage(image.image, x, y,xs,ys);
	};
	this.drawImageFront = function(name, x, y,xs,ys){
		var image = sprites.getSprite(name);
//		x=x*blocksize;
//		y=y*blocksize;
//		xs=xs*blocksize;
//		ys=ys*blocksize;
	    frontStage.drawImage(image.image, x, y,xs,ys);
	};
	this.clearRectFront = function(x, y,xs,ys){
		x=x*blocksize || 0;
		y=y*blocksize || 0;
		xs=xs*blocksize || sizeX;
		ys=ys*blocksize || sizeY;
	    frontStage.clearRect(x, y,xs,ys);
	};
	this.drawRectAlpha = function(x, y,xs,ys){
		stage.globalAlpha=0.6;
		stage.fillStyle='lightGrey';
		x=x*blocksize || 0;
		y=y*blocksize || 0;
		xs=xs*blocksize || sizeX;
		ys=ys*blocksize || sizeY;
	    stage.fillRect(x, y,xs,ys);
		stage.globalAlpha=1;
	};
	this.drawText = function(text,x,y){
		stage.fillStyle='black';
		stage.font = 'bold '+ Math.floor(blocksize*5) +'px sans-serif ';
		stage.textBaseline = 'top';
		stage.textAlign = 'start';
		stage.fillText(text,x*blocksize,y*blocksize);
	}
	
};