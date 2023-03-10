class hexBoard {
    constructor() {
        this.hexTiles = [];

        //map that converts QRS -> ID of tile at that position
        this.qrs2id = new Map();
    }
    draw() {
        document.body.style.cursor = "auto";
        for (var i in this.hexTiles) {
            if (this.hexTiles[i].isPointInside(mouseX, mouseY)) {
                document.body.style.cursor = "pointer";

                this.hexTiles[i].highlightState = 1; //hover
                
                if(mouseDown) {
                    this.hexTiles[i].highlightState = 2; //active
                }
            } else {
                this.hexTiles[i].highlightState = 0; //un-highlight the tile
            }
            this.hexTiles[i].draw();
        }
    }
    sortByHeight() {
        this.hexTiles.sort((a, b) => (a.y > b.y) ? 1 : -1);
    }
    getNearTilesID(id) {
        return this.getNearTiles(this.hexTiles[id].q,this.hexTiles[id].r,this.hexTiles[id].s)
    }
    getNearTiles(q,r,s) {
        var directions = [
            [1,-1,0],
            [0,-1,1], //up
            [-1,0,1],
            [-1,1,0],
            [0,1,-1], //down
            [1,0,-1],
        ]

        var ids = [];

        for(let d in directions) {
            let pos = [
                q+directions[d][0],
                r+directions[d][1],
                s+directions[d][2],
            ].join(",");

            let gotten = this.qrs2id.get(pos);

            ids.push(gotten);
        }
        
        return ids;
    }

    createTiles(layers, seed) {
        //initialized variables
        var id = 0;
        var q = 0;
        var r = 0;
        var s = 0;

        //create the center tile
        this.hexTiles.push(new hex(id, q, r, s));
        this.qrs2id.set(`${q},${r},${s}`, id);

        id++;


        //list of directions to move in
        var dirArr = [
            [0,1,-1], //down
            [1,-1,0],
            [0,-1,1], //up
            [-1,0,1],
            [-1,1,0],
            [0,1,-1], //down
            [1,0,-1],
        ];

        for(let layer=0;layer<layers;layer++) {
            loop1: for(let move=0;move<dirArr.length;move++) {
                for(let side=0;side<layer+1;side++) {
                    q += dirArr[move][0];
                    r += dirArr[move][1];
                    s += dirArr[move][2];

                    if(move==0) continue loop1;

                    this.hexTiles.push(new hex(id, q, r, s));

                    this.qrs2id.set(`${q},${r},${s}`, id);

                    id++;
                }
            }
        }

        this.sortByHeight()
    }
}
