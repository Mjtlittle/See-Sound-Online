class BlockWavesVisual {
    constructor() {}

    draw(t, dt) {
        // Background
        let theme = get_theme();
        ctx.fillStyle = theme.get_color(2/4);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let bounce = (15000 / Math.abs(getAverageBassFreq())) / 2;

        // Draw center rec
        ctx.fillStyle = theme.get_color(3/4);
        ctx.fillRect(ctx.canvas.width / 2, 0, 20, bounce);

        // Left side
        for(let i = 40, j = 50; i < ctx.canvas.width; i += 40, j += 50) {
            ctx.fillRect((ctx.canvas.width / 2) - i, 0, 20, j + bounce);
        }
        
        // Right side
        for(let i = 40, j = 50; i < ctx.canvas.width; i += 40, j += 50) {
            ctx.fillRect((ctx.canvas.width / 2) + i, 0, 20, j + bounce);
        }
    }
}