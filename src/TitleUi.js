function TitleUi(gameModel,canvas,sprites){

	var blocksize=Math.floor(canvas.getSize().x/20);
	var buttonUi=new ButtonsUi(gameModel,canvas.getStage(),blocksize);

	buttonUi.addButton({
		text:'Start',
		x:6,
		y:7,
		sx:8,
		selected:true,
	});
	buttonUi.addButton({
		text:'Tutorial',
		x:6,
		y:9,
		sx:8,
	});
//	gameModel.selectButton(0);

	this.drawTitle=function(){
		stage=canvas.getStage();
		canvas.clearScreen();
//		var image = sprites.getSprite('title');
//		canvas.getStage().drawImage(image.image, 0, 0,blocksize*20,blocksize*12);
	};
	this.drawButtons=function(){
		stage=canvas.getStage();
		buttonUi.drawAll();
	};
};