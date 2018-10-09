
// globals
const canvas = document.getElementById("gameWindow");
const ctx = canvas.getContext('2d');
const animate = window.requestAnimationFrame;
const HEIGHT = 600;
const WIDTH = 800;

const UP_ARROW = 40;
const DOWN_ARROW = 38;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const SPACEBAR = 32;
const ESC_KEY = 27;
const KEYS = {
    'a': 65,
    'w': 87,
    's': 83,
    'd': 68
}

var loadSceneByTitle = "Title";

// images
var gokuImage = new Image();
gokuImage.src = '../images/goku.gif';

var runnerImage = new Image();
runnerImage.src = '../images/spritestrip.png';

var townBackground = new Image();
townBackground.src = '../images/town.jpg';

var cityBackground = {
    isScrollBackground: false,
    backgrounds: [
        {x: 0, y: 50, image: townBackground},
        {x: WIDTH, y: 50, image: townBackground}
    ],
    render: function(){
        for (let i = 0; i < this.backgrounds.length; i++) {
            var bgi = this.backgrounds[i];
            if(this.isScrollBackground){
                if(bgi.x < -WIDTH) {
                    bgi.x = WIDTH;
                }
                bgi.x -= 2;
            }
            ctx.drawImage(bgi.image, bgi.x, bgi.y);
        }
    }
}

var darkBackground = {
    render: function(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
}

var titleScreenData = {
    title: {
        x: WIDTH / 2 - 100,
        y: HEIGHT / 2 - 150,
        text: 'Choose A Scene',
        color: 'white',
        font: '30px Arial',
        width: 300
    },
    selections: [
        {  
            x: WIDTH / 2 - 50,
            y: HEIGHT / 2 - 50,
            text: 'Goku Scene',
            color: 'white',
            font: '20px Arial',
            width: 300,
            active: true,
            title: 'DBZ'
        },
        {
            x: WIDTH / 2 - 50,
            y: HEIGHT / 2 - 20,
            text: 'Runner Scene',
            color: 'white',
            font: '20px Arial',
            width: 300,
            active: false,
            title: "Runner"
        }
    ],
    addControls: function() {
        document.addEventListener('keydown', this.makeSelection);
    },
    makeSelection: function(e) {
        e.preventDefault();
        let selection = this.selections.find((s) => s.active);
        let currentIndex = this.selections.indexOf(selection);
        if(e.which == UP_ARROW) {
            if(this.selections[currentIndex + 1]) {
                this.selections[currentIndex + 1].active = true;
                selection.active = false;
            } else {
                this.selections[0].active = true;
                selection.active = false;
            }
        } else if (e.which == DOWN_ARROW) {
            if(this.selections[currentIndex - 1]) {
                this.selections[currentIndex - 1].active = true;
                selection.active = false;
            } else {
                this.selections[this.selections.length - 1].active = true;
                selection.active = false;
            }
        } else if (e.which == SPACEBAR) {
            loadSceneByTitle = selection.title;
            this.removeControls();
            loadScene();
        }
    },
    removeControls: function() {
        document.removeEventListener('keydown', this.makeSelection);
    }
}

// animations
var gokuData = {
    x: WIDTH / 2 - 200,
    y: HEIGHT / 2,
    width: 35,
    height: 100,
    image: gokuImage,
    animationSpeed: 200,
    active: 'idle',
    changeAnimation: function() {
        if(this.poweringup){
            if(this.active != 'pre-powerup') {
                this.active = this.animations[this.active].next;
            }
        } else if (this.highkick && !this.reverseAnim) {
            if(this.active == 'idle') {
                this.active = 'start-kick';
            } else if (this.active == 'start-kick') {
                this.active = 'kick'
            } else {
                this.reverseAnim = true;
            }
        } else {
            if(this.active != 'idle') {
                this.active = this.animations[this.active].prev;
            } else {
                this.reverseAnim = false;
                this.highkick = false;
            }
        }
    },
    addControls: function(){
        document.addEventListener('keydown',(e) => {
            if (e.which == SPACEBAR) {
                this.poweringup = true;
            } else if (e.which == KEYS['a'] && !this.highkick) {
                this.highkick = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.which == SPACEBAR) {
                this.poweringup = false;
            };
        });
    }
};

gokuData.animations = {
    'idle': {x: 0, y:0, width: gokuData.width, height: gokuData.height, pos: {x: gokuData.x, y: gokuData.y}, next: 'squat'},
    'squat': {x: 240, y: 370, width: gokuData.width + 10, height: gokuData.height, pos: {x: gokuData.x, y: gokuData.y}, next: 'pre-powerup', prev: 'idle'},
    'pre-powerup': {x: 160, y: 370, width: gokuData.width + 30, height: gokuData.height, pos: {x: gokuData.x - 20, y: gokuData.y}, prev: 'squat'},
    'start-kick': {x: 160, y: 0, width: gokuData.width + 27, height: gokuData.height, pos: {x: gokuData.x - 20, y: gokuData.y}, next: 'kick', prev: 'idle'},
    'kick': {x: 223, y: 0, width: gokuData.width + 45, height: gokuData.height, pos: {x: gokuData.x - 20, y: gokuData.y},  prev: 'start-kick'}
}

var runnerData = {
    x: 0,
    y: HEIGHT / 2,
    width: 256,
    height: 256,
    image: runnerImage,
    animationSpeed: 100,
    active: 'run-02',
    changeAnimation: function() {
        if(this.isRunning) {
            this.active = this.animations[this.active].next
        } else {
            this.active = 'run-02';
        }
    },
    addControls: function() {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            if(e.which == KEYS['d'] || e.which == RIGHT_ARROW) {
                this.isRunning = true;
                this.background.isScrollBackground = true;
            }
        })

        document.addEventListener('keyup', (e) => {
            e.preventDefault();
            if(e.which == KEYS['d'] || e.which == RIGHT_ARROW){
                this.isRunning = false;
                this.background.isScrollBackground = false;
            }
        })
    }
};

runnerData.animations = {
    'run-01': {x: 0, y:0, width: runnerData.width, height: runnerData.height, pos: {x: runnerData.x, y: runnerData.y}, next: 'run-02', prev: 'run-06'},
    'run-02': {x: runnerData.width, y: 0, width: runnerData.width, height: runnerData.height, pos: {x: runnerData.x, y: runnerData.y}, next: 'run-03', prev: 'run-01'},
    'run-03': {x: (runnerData.width * 2), y: 0, width: runnerData.width, height: runnerData.height, pos: {x: runnerData.x, y: runnerData.y}, next: 'run-04', prev: 'run-02'},
    'run-04': {x: (runnerData.width * 3), y: 0, width: runnerData.width, height: runnerData.height, pos: {x: runnerData.x, y: runnerData.y}, next: 'run-05', prev: 'run-03'},
    'run-05': {x: (runnerData.width * 4), y: 0, width: runnerData.width, height: runnerData.height, pos: {x: runnerData.x, y: runnerData.y}, next: 'run-06',  prev: 'run-04'},
    'run-06': {x: (runnerData.width * 5), y: 0, width: runnerData.width, height: runnerData.height, pos: {x: runnerData.x, y: runnerData.y}, next: 'run-01',  prev: 'run-05'}
}