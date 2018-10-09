class TitleScreen {
    constructor(options) {
        this.title = options.title;
        this.selections = options.selections;
        if(options.makeSelection) { this.makeSelection = options.makeSelection.bind(this) }
        if(options.removeControls) { this.removeControls = options.removeControls.bind(this) }
        if(options.addControls){ options.addControls.call(this) };
    }
    
    render() {
        ctx.fillStyle = this.title.color;
        ctx.font = this.title.font;
        ctx.fillText(this.title.text, this.title.x, this.title.y, this.title.width);
        this.selections.forEach(selection => {
            if(selection.active) {
                ctx.fillStyle = 'green';
            } else {
                ctx.fillStyle = selection.color;
            }
            ctx.font = selection.font;
            ctx.fillText(selection.text, selection.x, selection.y, selection.width);
        })
    }
}