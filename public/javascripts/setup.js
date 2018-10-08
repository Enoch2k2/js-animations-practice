var goku;
var runner;
function setup() {
    reset();
    runner = new Sprite(runnerData);
    draw();
}


function draw() {
    animate(draw);
    reset();
    scrollBackground();
    runner.render();
}

function reset() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function scrollBackground(){
    for (let i = 0; i < backgrounds.length; i++) {
        var bgi = backgrounds[i];
        if(bgi.x < -WIDTH) {
            bgi.x = WIDTH;
        }
        bgi.x -= 2;
        ctx.drawImage(bgi.image, bgi.x, bgi.y);
    }
}

window.addEventListener('load', setup);