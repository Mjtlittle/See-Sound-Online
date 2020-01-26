
class BarVisual {
    constructor(){}
    draw(t, dt) {

        // draw background
        ctx.fillStyle = get_theme().get_first();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // draw bars
        let bw = canvas.width / analyzer_data.length;

        for(let i = 0; i < analyzer_data.length; i++){
            
            let value = Math.abs(analyzer_data[i]);
            
            let x = i * bw;
            let h = canvas.height * (200 - value) / 200;
            let y = canvas.height - h;
            ctx.fillStyle = get_theme().get_color(h/canvas.height);
            ctx.fillRect(x, y, bw, h);
        }
    }
}