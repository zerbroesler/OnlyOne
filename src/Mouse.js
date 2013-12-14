function Mouse(e) {

    this.x;
    this.y;

    this.getMousePos = function(e) {
        
        var touches = e.changedTouches;
       
        if(touches){
            for (var i=0; i < touches.length; i++) {
                this.x = touches[i].pageX;
                this.y = touches[i].pageY;
            };
        }else{
            this.x = (e.clientX - canvas.offsetLeft);
            this.y = (e.clientY - canvas.offsetTop);
        }
    };
    this.getMousePos(e);
}