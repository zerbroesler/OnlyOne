function PresentsUi(gameModel,canvas,sprites,buttonUi){


	this.draw=function(){
		stage=canvas.getStage();
		canvas.clearScreen();
		canvas.drawImage('tree1',5,40,30,40);
		canvas.drawImage('present1',2,80,20,10);
		buttonUi.drawAll();
	};
};