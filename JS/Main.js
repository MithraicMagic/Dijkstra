/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

const USERSTATE = {
    setup: 0,
    setEnd: 1
}

const dijkstra = new Algorithm();

let currentState = USERSTATE.setup;

const mousePos = {x: 0, y: 0};
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);

let mainInterval;
const TILESIZE = 32;
const FPS = 60;

const vertices = [];
const rowCount = Math.floor(canvas.clientHeight / TILESIZE);
const columnCount = Math.floor(canvas.clientWidth / TILESIZE);

function init() {
    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < columnCount; c++) {
            vertices.push(new Vertex(c*TILESIZE, r*TILESIZE, TILESIZE));
        }
    }

    mainInterval = setInterval(draw, FPS/1000);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    vertices.forEach(v => v.draw());
}

function onMouseMove(m) {
    mousePos.x = m.clientX - canvas.offsetLeft;
    mousePos.y = m.clientY - canvas.offsetTop;
}

function onMouseDown(m) {
    let success = false;

    vertices.forEach(v => {
        if (!success && v.checkOverlap(mousePos.x, mousePos.y)) {
            if (m.button === 0) {
                if (currentState === USERSTATE.setup) {
                    dijkstra.reset();

                    v.type = TYPE.BEGIN;
                    dijkstra.start = v;
                    currentState = USERSTATE.setEnd;

                    return;
                } else {
                    v.type = TYPE.END;
                    dijkstra.target = v;
                    currentState = USERSTATE.setup;

                    dijkstra.findPath();

                    return;
                }
            } else if (m.button === 2) {
                v.type === TYPE.WALL ? v.type = TYPE.NEUTRAL : v.type = TYPE.WALL;
                return;
            }
        }
    });
}

init();