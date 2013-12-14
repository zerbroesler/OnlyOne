function Sound() {

    soundEffect = {
        pling:{
            path: 'pling'
        },
        song1:{
            path: 'kinderlein2'
        },
    };        
    

    this.loadSounds = function(callback) {
		var toLoad=0;
    	for ( var effect in soundEffect) {
            var filename = "sounds/" + soundEffect[effect].path + ".mp3";
            soundEffect[effect].audio = new Audio("");
            soundEffect[effect].audio.src = filename;
            document.body.appendChild(soundEffect[effect].audio);
			toLoad++;
		}
		var loading = setInterval(function(){
			for ( var effect in soundEffect) {
				var thisEffect = soundEffect[effect].audio;
				if(thisEffect.readyState==4 && !thisEffect.counted){
					toLoad--;
					thisEffect.counted=true;
				};
			};
			if(toLoad==0){
				clearInterval(loading);
//				callback();
			}
		},200);    	
    };
    
    this.playSound = function(effect){
        var sound = soundEffect[effect].audio;
        sound.play();
    };
    this.stopSound = function(effect){
        var sound = soundEffect[effect].audio;
        sound.pause();
        sound.currentTime = 0;
    };
}