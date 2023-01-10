class hex {
    constructor(id, q, r, s) {
        this.id = id;

        //cube coordinates of tile
        this.q = q;
        this.r = r;
        this.s = s;

        //canvas location
        let xy = [null,null];

        xy = qrs2xy(q,r,s);

        this.x = xy[0]*radius*sqrt3;
        this.y = xy[1]*radius*sqrt3;

        this.highlightState = 0; //0=none, 1=hover, 2=active 

        this.stroke = "white";
        this.radius = radius;

        this.time = performance.now() + this.id*createDelay; // +this.id*createDelay to have creation delay
        this.animFrame = 0;


        //for offset transiton
        this.offset = [0,0];
        this.prevOffset  = [0,0];
        this.targetOffset = [0,0];
        this.offsetTime = 0;

        //game stuff
        this.determineBiome();
    }
    determineBiome() {
        this.biome = 0; //Math.floor(rand(this.id)*1);
    }
    drawHex(stroke, fill, offset = this.offset) {
        var lineWidth = 3;

        ctx.beginPath();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = fill;

        for (var i = 0; i < 6; i++) {
            ctx.lineTo(
                this.x + offset[0] + radius * buffer * Math.cos(a * i) * sinLerp(0,1,this.animFrame) + canvas.width / 2,
                this.y + offset[1] + radius * buffer * Math.sin(a * i) * sinLerp(0,1,this.animFrame) + canvas.height / 2
            );
        }
        ctx.closePath();
        if(stroke) ctx.stroke();
        if(fill) ctx.fill();
    }
    drawDebug(offset = this.offset) {
        //if(this.time + createAnimDuration > performance.now()) return; //if it hasnt finished animation, dont

        var fontSize = 12;

        ctx.textAlign = "center";
        ctx.font = fontSize+"px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("id="+this.id, this.x + offset[0] + canvas.width / 2, this.y+fontSize*0 + offset[1] + canvas.height / 2);
        ctx.fillText("biome="+biomes[this.biome], this.x + offset[0] + canvas.width / 2, this.y+fontSize*1 + offset[1] + canvas.height / 2);
        //ctx.fillText("q="+this.q, this.x + offset[0] + canvas.width / 2, this.y+fontSize*1 + offset[1] + canvas.height / 2);
        //ctx.fillText("r="+this.r, this.x + offset[0] + canvas.width / 2, this.y+fontSize*2 + offset[1] + canvas.height / 2);
        //ctx.fillText("s="+this.s, this.x + offset[0] + canvas.width / 2, this.y+fontSize*3 + offset[1] + canvas.height / 2);
    }
    draw(x, y) {
        this.animFrame = clamp((performance.now() - this.time)/createAnimDuration,0,1);

        //if args exist, draw there
        this.x = x || this.x;
        this.y = y || this.y;

        var height = 10;

        var drawInfo = { //primary
            stroke: "rgb(255,255,255)",
            fill: "rgb(0,0,0)",
            shadow: "rgb(255,255,255)",
            offset: [0,0],
        }

        if (this.highlightState == 1) drawInfo = { //hover
            stroke: "rgb(255,255,255)",
            fill: "rgb(60,60,60)",
            shadow: "rgb(255,255,255)",
            offset: [0,7],
        };

        if (this.highlightState == 2) drawInfo = { //active
            stroke: "rgb(255,255,255)",
            fill: "rgb(60,60,60)",
            shadow: "rgb(255,255,255)",
            offset: [0,12],
        };

        if(!arraysEqual(drawInfo.offset, this.targetOffset)) {
            this.prevOffset = this.offset;
            this.targetOffset = drawInfo.offset;

            this.offsetTime = performance.now();
        }


        this.offset[1] = lerp(this.prevOffset[1], this.targetOffset[1], clamp((performance.now()-this.offsetTime)/transitionSpeed,0,1))

        //this.drawHex(null, drawInfo.shadow, [0,14]); //shadow
        this.drawHex(drawInfo.stroke, drawInfo.fill); //main
        if(debug) this.drawDebug(); //debug
    }
    /*
    isPointInside(x, y) {
        return (x >= this.x - this.radius
            && x <= this.x + this.radius
            && y >= this.y - this.radius
            && y <= this.y + this.radius);
    }
    */
    isPointInside(x,y) {
        return -sqrt3*Math.abs(x-this.x)-Math.abs(y-this.y) > -this.radius*sqrt3*1 && 
        Math.abs(y-this.y) < this.radius*sqrt3*0.5
    }
}