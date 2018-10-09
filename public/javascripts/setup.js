var currentScene;

function setup() {
    reset();
    loadScene();    
    draw();
}


function draw() {
    animate(draw);
    reset();
    currentScene.render();
}

function reset() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function loadScene(){
    switch(loadSceneByTitle) {
        case 'DBZ':
            let goku = new Sprite(gokuData);
            currentScene = new Scene({ character: goku, background: darkBackground });
            break;
        case 'Runner':
            let runner = new Sprite(runnerData); 
            currentScene = new Scene({ character: runner, background: cityBackground });
            break;
        case 'Title':
            currentScene = new TitleScreen(titleScreenData)
            break;
    }
}



window.addEventListener('load', setup);