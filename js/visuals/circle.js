class CircleVisual {
    constructor() {
        this.x = 0, this.y = 0;
        this.radius = 100;
        
        // RGB and Alpha color
        this.backgroundColor = { red: 0, green: 0, blue: 0 };
        this.color = 'rgba(255, 255, 255, 255)';
        this.delay = 500;
        this.i = 0;
        this.colorOffset = 1;

        // Variables dependent on music
        this.colorSpeed = 1;
    }

    draw(t, dt) {
        // Background
        ctx.fillStyle = `rgba(${this.backgroundColor.red}, ${this.backgroundColor.green}, ${this.backgroundColor.blue}, 255)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw circle
        ctx.fillStyle = this.color;
        ctx.beginPath();

        // RGB background
        if(analyzer_data != null) {
            
            for(var i = 0; i < analyzer_data.length; i++) {

                if(this.i < this.delay) {
                    this.i++;
                    
                    if(this.i == this.delay) {
                        this.i = 0;

                        if(this.backgroundColor.red < 255) {
                            this.backgroundColor.red += this.colorOffset;
                        }

                        if(this.backgroundColor.green < 255 && this.backgroundColor.red == 255) {
                            this.backgroundColor.green += this.colorOffset;
                        }

                        if(this.backgroundColor.blue < 255 && this.backgroundColor.green == 255) {
                            this.backgroundColor.blue += this.colorOffset;
                        }

                        if(this.backgroundColor.red == 255 && this.backgroundColor.green == 255 && this.backgroundColor.blue == 255) {
                            this.backgroundColor.red = 0;
                            this.backgroundColor.green = 0;
                            this.backgroundColor.blue = 0;
                        }
                    }
                }
            }
        }

        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, this.radius, 0, getAverageFreq() / 20, false);
        ctx.fill();
    }
}