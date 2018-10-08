var gokuData = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    width: 35,
    height: 100,
    image: gokuImage
};

function setup() {
    reset();
    goku = new Sprite(gokuData);
    draw();
}


function draw() {
    animate(draw);
    reset();
    goku.render();
}

function reset() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

window.addEventListener('load', setup);