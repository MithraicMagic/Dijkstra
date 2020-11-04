/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

const USERSTATE = {
    setup: 0,
    setEnd: 1
}

let currentState = USERSTATE.setup;

const mousePos = {x: 0, y: 0};
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);

let mainInterval;
const TILESIZE = 32;
const FPS = 60;

const vertices = [];
const rowCount = Math.floor(canvas.clientWidth / TILESIZE);
const columnCount = Math.floor(canvas.clientHeight / TILESIZE);

function init() {
    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < columnCount; c++) {
            vertices.push(new Vertex(r*TILESIZE, c*TILESIZE, TILESIZE));
        }
    }

    mainInterval = setInterval(draw, FPS/1000);
}

function draw() {
    ctx.clearRect(0, 0, canvas.height, canvas.width);

    vertices.forEach(v => v.draw());
}

function onMouseMove(m) {
    mousePos.x = m.clientX - canvas.offsetLeft;
    mousePos.y = m.clientY - canvas.offsetTop;
}

function onMouseDown(m) {
    let success = false;

    vertices.forEach(v => {
        if (v.checkOverlap(mousePos.x, mousePos.y)) {
            currentState === USERSTATE.setup ? v.state = STATE.begin : v.state = STATE.end;
            success = true;
        }
    });

    if (success) currentState === USERSTATE.setup ? currentState = USERSTATE.setEnd : currentState = USERSTATE.setup;
}

init();