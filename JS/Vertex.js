const STATE = {
    neutral: 0,
    begin: 1, 
    end: 2
};

const COLORS = ["gray", "green", "red"];

class Vertex {
    constructor(x, y, tileSize) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.state = STATE.neutral;
    }

    draw() {
        if (this.state === STATE.neutral) {
            ctx.strokeStyle = COLORS[this.state];
            ctx.strokeRect(this.x, this.y, this.tileSize, this.tileSize)
        } else {
            ctx.fillStyle = COLORS[this.state];
            ctx.fillRect(this.x, this.y, this.tileSize, this.tileSize)
        }
    }

    checkOverlap(x, y) {
        return (this.x < x && this.x + this.tileSize > x && this.y < y && this.y + this.tileSize > y);
    }
}