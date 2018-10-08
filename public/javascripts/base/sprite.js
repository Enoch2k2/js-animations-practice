class Sprite {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
        this.active = 'idle';
        this.poweringup = false;
        this.animations = {
            'idle': {x: 0, y:0, width: this.width, height: this.height, pos: {x: this.x, y: this.y}, next: 'squat'},
            'squat': {x: 240, y: 370, width: this.width + 10, height: this.height, pos: {x: this.x, y: this.y}, next: 'pre-powerup', prev: 'idle'},
            'pre-powerup': {x: 160, y: 370, width: this.width + 30, height: this.height, pos: {x: this.x - 20, y: this.y}, prev: 'squat'},
            'start-kick': {x: 160, y: 0, width: this.width + 27, height: this.height, pos: {x: this.x - 20, y: this.y}, next: 'kick', prev: 'idle'},
            'kick': {x: 223, y: 0, width: this.width + 45, height: this.height, pos: {x: this.x - 20, y: this.y},  prev: 'start-kick'}
        };
        this.addControls();
        this.drawAnimation();
    }

    drawAnimation(){
        this.animInt = setInterval(this.changeAnimation.bind(this), 200)
    }

    changeAnimation() {
        if(this.poweringup){
            if(this.active != 'pre-powerup') {
                this.active = this.animations[this.active].next;
            }
        } else if (this.highkick) {
            if(this.active == 'idle') {
                this.active = 'start-kick';
            } else if (this.active == 'start-kick') {
                this.active = 'kick'
            } else {
                this.highkick = false;
            }
        } else {
            if(this.active != 'idle') {
                this.active = this.animations[this.active].prev;
            }
        }
    }

    clearAnimation(){
        clearInterval(this.animInt);
    }

    addControls(){
        document.addEventListener('keydown',(e) => {
            console.log(e.which)
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
        })
    }

    render(){
        ctx.drawImage(
            this.image,
            this.animations[this.active].x,
            this.animations[this.active].y,
            this.animations[this.active].width,
            this.animations[this.active].height,
            this.animations[this.active].pos.x,
            this.animations[this.active].pos.y,
            this.animations[this.active].width,
            this.animations[this.active].height
        )
    }
}