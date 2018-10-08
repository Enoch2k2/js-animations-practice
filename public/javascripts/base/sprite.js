class Sprite {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
        this.active = options.active;
        this.poweringup = false;
        this.highkick = false;
        this.reverseAnim = false;
        this.animations = options.animations;
        this.changeAnimation = options.changeAnimation;
        this.animationSpeed = options.animationSpeed;
        if(options.addControls){ options.addControls.call(this); };
        this.drawAnimation();
    }

    drawAnimation(){
        this.animInt = setInterval(this.changeAnimation.bind(this), this.animationSpeed);
    }    

    clearAnimation(){
        clearInterval(this.animInt);
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