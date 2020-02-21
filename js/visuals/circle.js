class CircleVisual {
    constructor() {
        this.x = 0, this.y = 0;
        this.radius = 100;
        
        // RGB and Alpha color
        this.color = 'rgba(255, 255, 255, 255)';
        this.delay = 500;
        this.i = 0;
        this.colorOffset = 1;

        // Variables dependent on music
        this.colorSpeed = 1;
    }

    draw(t, dt) {
        // Background
        let theme = get_scheme();
        ctx.fillStyle = theme.get_color(2/4);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw outer circle
        ctx.fillStyle = theme.get_color(3/4);
        ctx.beginPath();
        let outerRadius = 15000 / Math.abs(getAverageBassFreq());
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, outerRadius, 0, Math.PI * 2, false);
        ctx.fill();

        // Draw eye circles
        ctx.fillStyle = theme.get_color(4/4);
        ctx.beginPath();
        let eyeRadius = 15000 / Math.abs(getAverageFreq());
        ctx.arc((ctx.canvas.width / 2) - 50, (ctx.canvas.height / 2) - 80, eyeRadius / 10, 0, Math.PI * 2, false);
        ctx.arc((ctx.canvas.width / 2) + 50, (ctx.canvas.height / 2) - 80, eyeRadius / 10, 0, Math.PI * 2, false);
        ctx.fill();

        // Draw circle
        ctx.fillStyle = theme.get_color(1/4);
        ctx.beginPath();
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, this.radius, 0, getAverageFreq() / 20, false);
        ctx.fill();
    }
}