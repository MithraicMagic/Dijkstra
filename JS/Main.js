/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

let delay = 10;

let mode = -1;
let dragging = false;
const MODE = {
    points: 0,
    placeWalls: 1,
    eraseWalls: 2
}

const modeHtml = [
    '<span style="color: rgb(100, 150, 100);">Begin</span> / <span style="color: rgb(150, 100, 100);">End</span> Setup',
    'Build Walls',
    'Erase Walls'
]

const USERSTATE = {
    setStart: 0,
    setEnd: 1
}

const dijkstra = new Algorithm();

let currentState = USERSTATE.setStart;

const mousePos = {x: 0, y: 0};
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);

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

    switchMode();

    mainInterval = setInterval(draw, FPS/1000);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    vertices.forEach(v => v.draw());
}

function onMouseMove(m) {
    mousePos.x = m.clientX - canvas.offsetLeft;
    mousePos.y = m.clientY - canvas.offsetTop;

    if (dragging) {
        vertices.forEach(v => {
            if (v.checkOverlap(mousePos.x, mousePos.y)) {
                v.type = mode === MODE.placeWalls ? TYPE.WALL : TYPE.NEUTRAL;
                return;
            }
        })
    }
}

function onMouseDown(m) {
    if (m.button !== 0) return;

    let success = false;

    vertices.forEach(v => {
        if (!success && v.checkOverlap(mousePos.x, mousePos.y)) {
            if (mode === MODE.points) {
                if (currentState === USERSTATE.setStart) {
                    dijkstra.reset();

                    v.type = TYPE.BEGIN;
                    dijkstra.start = v;
                    currentState = USERSTATE.setEnd;

                    return;
                } else {
                    v.type = TYPE.END;
                    dijkstra.target = v;
                    currentState = USERSTATE.setStart;

                    dijkstra.findPath();

                    return;
                }
            } else {
                v.type = mode === MODE.placeWalls ? TYPE.WALL : TYPE.NEUTRAL;
                dragging = true;
                return;
            }
        }
    });
}

function onMouseUp(m) {
    if (m.button !== 0) return;
    dragging = false;
}

function switchMode() {
    mode = (mode + 1) % 3;
    document.getElementById('mode').innerHTML = modeHtml[mode];
}

init();