
// globals
const canvas = document.getElementById("gameWindow");
const ctx = canvas.getContext('2d');
const animate = window.requestAnimationFrame;
const HEIGHT = 600;
const WIDTH = 800;

const SPACEBAR = 32;
const KEYS = {
    'a': 65
}

// images
var gokuImage = new Image();
gokuImage.src = '../images/goku.gif';

var runnerImage = new Image();
runnerImage.src = '../images/spritestrip.png';

var townBackground = new Image();
townBackground.src = '../images/town.jpg';

var background01 = {
    x: 0,
    y: 50,
    image: townBackground
}

var background02 = {
    x: WIDTH,
    y: 50,
    image: townBackground
}

var backgrounds = [background01, background02];

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
    active: 'run-01',
    changeAnimation: function() {
        this.active = this.animations[this.active].next
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