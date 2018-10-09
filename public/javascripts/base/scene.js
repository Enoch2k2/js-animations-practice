class Scene {
    constructor(options) {
        this.character = options.character;
        this.background = options.background;
        this.character.background = options.background;
        this.exitScene = this.exitScene.bind(this);
        this.addControls();
    }

    addControls() {
        document.addEventListener('keydown', this.exitScene);
    }

    removeControls() {
        document.removeEventListener('keydown', this.exitScene);
    }

    exitScene(e){
        e.preventDefault();
        if(e.which == ESC_KEY) {
            loadSceneByTitle = 'Title';
            this.removeControls();
            loadScene();
        }
    }

    render(){
        this.background.render();
        this.character.render();
    }
}