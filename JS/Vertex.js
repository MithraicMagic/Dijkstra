const TYPE = {
    NEUTRAL: 0,
    BEGIN: 1, 
    END: 2,
    WALL: 3,
    PATH: 4
}

const COLORS = ["gray", "rgb(100, 175, 100)", "rgb(175, 100, 100)", "black", "rgb(100, 100, 175)"];

class Vertex {
    constructor(x, y, tileSize) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.type = TYPE.NEUTRAL;
        
        this.distance = Infinity;
        this.cameFrom = null;

        this.visited = false;
    }

    draw() {
        if (this.type === TYPE.WALL) {
            ctx.fillStyle = COLORS[this.type];
            ctx.fillRect(this.x, this.y, this.tileSize, this.tileSize)
        } else if (this.type === TYPE.NEUTRAL && !this.visited) {
            ctx.strokeStyle = COLORS[this.type];
            ctx.strokeRect(this.x, this.y, this.tileSize, this.tileSize)
        } else {
            if (this.visited && !(this.type === TYPE.BEGIN || this.type === TYPE.END || this.type === TYPE.PATH)) {
                ctx.fillStyle = "rgb(150, 150, 150)";
            } else {
                ctx.fillStyle = COLORS[this.type];
            }
            ctx.fillRect(this.x, this.y, this.tileSize, this.tileSize)
        }
    }

    checkOverlap(x, y) {
        return (this.x < x && this.x + this.tileSize > x && this.y < y && this.y + this.tileSize > y);
    }
}