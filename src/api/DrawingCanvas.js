
const canvasConfig = {
    cctx: null,
    init: function(canvas){

        this.cctx = canvas.current.getContext('2d');
        this.cctx.bounds = canvas.current.getBoundingClientRect();
        this.cctx.strokeStyle = "#000000";
	    this.cctx.lineWidth = 1;
        this.cctx.lineCap = "round";
        this.cctx.width = window.innerWidth;
        this.cctx.height = window.innerHeight;
        
        this.cctx.lineToRelative = function(x, y){
            let bounds = this.canvas.getBoundingClientRect();
            this.lineTo(x - bounds.left, y - bounds.top);
        }
        this.cctx.moveToRelative = function(x, y){
            let bounds = this.canvas.getBoundingClientRect();
            this.moveTo(x - bounds.left, y - bounds.top);
        }
        
        this.cctx.clear = function() {
            this.clearRect (0, 0, this.bounds.width, this.bounds.height);
        }
        return this.cctx;

    }
    
}

export { canvasConfig };