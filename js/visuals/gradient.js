class GradientVisual {

    constructor(){}
    
    draw(t, dt){
        let segments = 100;
        let cw = canvas.width / segments;
        for(let i = 0; i < segments; i++){
            ctx.fillStyle = get_theme().get_color(i/segments);
            ctx.fillRect(i * cw, 0, cw, canvas.height);
        }
    }

}