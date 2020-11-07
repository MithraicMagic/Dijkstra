class Algorithm {
    constructor() {
        this.possibilities = [];

        this.start = null;
        this.target = null;

        this.current = null;
    }

    getNeighbours(vertex) {
        const neighbours = [];

        let i = vertices.findIndex(v => v === vertex);

        //Vertex indexes of TL, T, TR, L, R, BL, B, BR 
        const possibleIndexes = [i - columnCount - 1, i - columnCount, i - columnCount + 1, i - 1, i + 1, i + columnCount - 1, i + columnCount, i + columnCount + 1];

        possibleIndexes.forEach((j, index) => {
            if (
                !(i % columnCount === 0 && [0, 3, 5].includes(index)) &&
                !(i % columnCount === columnCount - 1 && [2, 4, 7].includes(index)) &&
                vertices[j]) {
                neighbours.push(vertices[j]);
            }
        });

        return neighbours;
    }

    getDistance(from, to) {
        var delta = {
            x: Math.abs(from.x - to.x),
            y: Math.abs(from.y - to.y)
        };

        return Math.sqrt(delta.x * delta.x + delta.y * delta.y);
    }

    findPath() {
        this.start.distance = 0;
        this.current = this.start;

        this.moveThroughVertices();
    }

    moveThroughVertices() {
        console.log(this.current);

        if (this.current !== this.start) {
            this.possibilities.splice(this.possibilities.findIndex(p => p === this.current), 1);
        }

        this.current.visited = true;

        const neighbours = this.getNeighbours(this.current);
        neighbours.forEach(n => {
            if (n.type !== TYPE.WALL) {
                const newDistance = this.getDistance(this.current, n);
                if (n.distance > this.current.distance + newDistance) {
                    n.distance = this.current.distance + newDistance;
                    n.cameFrom = this.current;
                }
                if (!this.possibilities.includes(n) && !n.visited) this.possibilities.push(n);
            }
        });

        let nextDist = Infinity;
        let nextIndex = -1;

        this.possibilities.forEach((p, i) => {
            if (p.distance < nextDist) {
                nextDist = p.distance;
                nextIndex = i;
            }
        });

        if (this.nextIndex !== -1) this.current = this.possibilities[nextIndex];

        if (this.current !== this.target && this.possibilities.length !== 0) {
            setTimeout(() => this.moveThroughVertices(), 5);
        } else if (this.current === this.target) {
            this.showPath();
        }
    }

    showPath() {
        this.current = this.current.cameFrom;
        while (this.current !== this.start) {
            this.current.type = TYPE.PATH;
            this.current = this.current.cameFrom;
        }
    }

    reset() {
        this.possibilities = [];
        this.start = null;
        this.target = null;
        this.current = null;

        vertices.forEach(v => {
            if (v.type !== TYPE.WALL) v.type = TYPE.NEUTRAL;
            v.visited = false;
            v.distance = Infinity;
            v.cameFrom = null;
        });
    }
}