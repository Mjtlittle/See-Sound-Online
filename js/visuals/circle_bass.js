class CircleBassVisual {
    constructor() {
        this.x, this.y = 0;
        this.radius = 150.0;
    }

    draw(t, dt) {
        //Background
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

        this.radius = 30000 / getAverageBassFreq();

        //Circle
        ctx.fillStyle = 'red';
        ctx.beginPath();

        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
}