class CircleVisual {
    constructor() {
        this.x, this.y = 0;
        this.radius = 100;
        this.switchDirection = false;
        
        // RGB and Alpha color
        this.r = 0, this.g = 0, this.b = 0;
        this.color = 'rgba(255, 255, 255, 255)';
        this.backgroundColor = `rgba(0, 0, 0, 255)`;
        this.switchColors = false;
        this.delay = 500;
        this.i = 0;
        this.colorOffset = 1;

        // Variables dependent on music
        this.colorSpeed = 1;
        this.bounce = 1;
    }

    draw(t, dt) {
        // Background
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, 255)`;
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

                // RGB BOIS
                if(this.i < this.delay) {
                    this.i++;
                    
                    if(this.i == this.delay) {
                        this.i = 0;
                        if(this.r < 255) {
                            this.r += this.colorOffset;
                        }
                        if(this.g < 255 && this.r == 255) {
                            this.g += this.colorOffset;
                        }
                        if(this.b < 255 && this.g == 255) {
                            this.b += this.colorOffset;
                        }
                        if(this.r == 255 && this.g == 255 && this.b == 255) {
                            this.r = 0;
                            this.g = 0;
                            this.b = 0;
                        }
                    }
                }

                //console.log(analyzer_data[i]);
            }
            average = sum / analyzer_data.length;
        }

        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, this.radius, 0, /*Math.PI * 2 + */average / 20, false);
        ctx.fill();
    }
}