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
            let coords = this.calcRelative({x: x, y: y});
            this.lineTo(coords.x, coords.y);
        }
        
        this.cctx.moveToRelative = function(x, y){
            let coords = this.calcRelative({x: x, y: y});
            this.moveTo(coords.x, coords.y);
        }
        
        this.cctx.clear = function() {
            this.clearRect (0, 0, this.bounds.width, this.bounds.height);
        }

        this.cctx.calcRelative = function(args){
            let bounds = this.canvas.getBoundingClientRect();
            return {
                x: args.x - bounds.left,
                y: args.y - bounds.top
            }
        }
        return this.cctx;
    }

}

export { canvasConfig };