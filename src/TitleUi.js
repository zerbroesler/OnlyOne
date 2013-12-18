function TitleUi(gameModel,canvas,sprites,buttonUi){

	this.drawTitle=function(){
		stage=canvas.getStage();
		canvas.clearScreen();
		canvas.drawImage('title', 0, 0,180,100); 
		var blocksize=canvas.getBlocksize()*5;
        stage.fillStyle='lightgrey';
        stage.font = 'bold '+ Math.floor(blocksize*0.8) +'px sans-serif ';
        stage.textBaseline = 'top';
        stage.textAlign = 'start';
		stage.fillText('By Zerkruemler for LD#28',26*blocksize,19*blocksize);
	};
	this.drawLevels=function(){
		stage=canvas.getStage();
		canvas.clearScreen();
		//canvas.drawImage('title', 0, 0,180,100); 
		var blocksize=canvas.getBlocksize()*5;
        stage.fillStyle='lightgrey';
        stage.font = 'bold '+ Math.floor(blocksize*0.8) +'px sans-serif ';
        stage.textBaseline = 'top';
        stage.textAlign = 'start';
		stage.fillText('Levls',26*blocksize,19*blocksize);
	};
	
	this.drawInstructions=function(){
		// Some basic instructions
		stage=canvas.getStage();
		canvas.clearScreen();
		var stage=canvas.getStage();
		var blocksize=canvas.getBlocksize()*5;

		// Font
		stage.fillStyle = c.BACKGROUND_COLOR;
		stage.fillRect(0, 0, blocksize*32, blocksize*20);
        stage.fillStyle='white';
        stage.font = 'bold '+ Math.floor(blocksize*0.8) +'px sans-serif ';
        stage.textBaseline = 'top';
        stage.textAlign = 'start';
		
        stage.font = 'bold '+ Math.floor(blocksize*1.2) +'px sans-serif ';
		text('This is a puzzle game',11,1);
        stage.font = 'bold '+ Math.floor(blocksize*0.8) +'px sans-serif ';
		text('It is christmas. Everybody gets one present, but which one is it?',4,3);
		text('You need to give everybody one present which fits to their idea of the right present.',1,4);
		text('All of the shown attributes have to fit, others can be different.',4,5);

		text('When no idea is shown, all presents may fit, but be careful that',5,10);
		text('everybody gets a present which corresponds to his/her idea.',6,11);
		text('Sometimes they just know what present is not the correct one.',5,12);
		text('',4,7);
		text('',4,8);
		text('',4,7);
		text('',4,8);
		
		
		
		// Presents
		var presents=gameModel.getPresents();
		var x1=5*4;
		var x2=22*4;
		var xd=8*4;
		var y=8*4;
		var size=14;
		presents.reset();
		presents.addPresent({noMove : true,name: 'acol1',id: 1,x:x1,y:y,sx:size,sy:size,});
		presents.addPresent({noMove : true,name: 'apatt1',id: 1,x:x1,y:y,sx:size,sy:size,});
		presents.addPresent({noMove : true,name: 'aband1',id: 1,x:x1,y:y,sx:size,sy:size,});
		canvas.drawImage('equal', x1+5*4, y+4,10,10);
		presents.addPresent({noMove : true,name: 'acol1',id: 2,x:x1+xd,y:y,sx:size,sy:size,});

		presents.addPresent({noMove : true,name: 'acol1' ,id: 3,x:x2,y:y,sx:size,sy:size,});
		presents.addPresent({noMove : true,name: 'apatt1',id: 3,x:x2,y:y,sx:size,sy:size,});
		presents.addPresent({noMove : true,name: 'aband1',id: 3,x:x2,y:y,sx:size,sy:size,});
		canvas.drawImage('notEqual', x2+5*4, y+4,10,10);
		presents.addPresent({noMove : true,name: 'acol0',id: 4,x:x2+xd,y:y,sx:size,sy:size,});
		presents.addPresent({noMove : true,name: 'aband2',id: 4,x:x2+xd,y:y,sx:size,sy:size,});
		// second example
		y=17*4;
		presents.addPresent({noMove : true,name: 'acol1',id: 5,x:x1,y:y,sx:size,sy:size,});
		presents.addPresent({noMove : true,name: 'apatt1',id: 5,x:x1,y:y,sx:size,sy:size,});
		presents.addPresent({noMove : true,name: 'aband1',id: 5,x:x1,y:y,sx:size,sy:size,});
		canvas.drawImage('equal', x1+5*4, y+4,10,10);
		presents.addPresent({noMove : true,name: 'acol2',id: 6,x:x1+xd,y:y,sx:size,sy:size,});
		presents.addPresent({noMove : true,name: 'no',    id: 6,x:x2+xd,y:y,sx:size,sy:size,});
		//
		presents.addPresent({noMove : true,name: 'acol2' ,id: 7,x:x2,y:y,sx:size,sy:size,});
		presents.addPresent({noMove : true,name: 'apatt1',id: 7,x:x2,y:y,sx:size,sy:size,});
		presents.addPresent({noMove : true,name: 'aband1',id: 7,x:x2,y:y,sx:size,sy:size,});
		canvas.drawImage('notEqual', x2+5*4, y+4,10,10);
		presents.addPresent({noMove : true,name: 'acol2', id: 8,x:x2+xd,y:y,sx:size,sy:size,});
		presents.addPresent({noMove : true,name: 'no',    id: 8,x:x2+xd,y:y,sx:size,sy:size,});
		
		// Helper
		function text(text,x,y){
			x*=blocksize;
			y*=blocksize;
			stage.fillText(text,x,y);
		}
		
	};
	this.drawGameOver=function(){
		stage=canvas.getStage();
		canvas.clearScreen();
		var blocksize=canvas.getBlocksize()*5;
		canvas.drawImage('title', 0, 0,180,100);  //TODO:Show

        stage.fillStyle='darkgreen';
        stage.font = 'bold '+ Math.floor(blocksize*3) +'px sans-serif ';
        stage.textBaseline = 'top';
        stage.textAlign = 'center';
		stage.fillText('Winner!',18*blocksize,6*blocksize);
//		stage.fillText('Your score:'+gameModel.getScore(),16*blocksize,10*blocksize);


	};
};