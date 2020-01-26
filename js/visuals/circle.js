class CircleBeat {
    constructor() {
        this.x, this.y = 0;
        this.radius = 100;
        this.switchDirection = false;
        
        // RGB and Alpha color
        this.r, this.g, this.b = 0;
        this.color = 'rgba(255, 255, 255, 255)';
        this.backgroundColor = `rgba(0, 0, 0, 255)`;
        this.switchColors = false;

        // Variables dependent on music
        this.colorSpeed = 1;
        this.bounce = 1;
    }

    draw(t, dt) {
        // Background
        ctx.fillStyle = `rgba(0, 0, 0, 255)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw circle
        ctx.fillStyle = this.color;
        ctx.beginPath();

        // Test
        var sum = 0;
        var average = 0;
        if(analyzer_data != null) {
            for(var i = 0; i < analyzer_data.length; i++) {
                sum += analyzer_data[i];
            }
            average = sum / analyzer_data.length;
        }

        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, this.radius, 0, /*Math.PI * 2 + */average / 20, false);
        ctx.fill();
    }
}