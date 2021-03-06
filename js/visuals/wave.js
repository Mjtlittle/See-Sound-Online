class WaveVisual {
    constructor() {
        this.wave_layers = [
            new WaveLayer(-0.5,0.5, 2, 0, 0),
            new WaveLayer(1,0.5, 5, 0, 5),
            new WaveLayer(-2,1, 1, 0, 10)
        ];


    }

    draw(t, dt) {

        // draw background
        ctx.fillStyle = get_scheme().get_last();
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw all layers
        let i = 0;
        let freq_mod = getAverageBassFreq()/500;
        this.wave_layers.forEach((layer) => {
            layer.size = freq_mod;
            layer.draw(t, dt, get_scheme().get_color(i/4));
            i++;
        })
    }
}

class WaveLayer {
    constructor(speed=1, size_scale=1, freq_scale=1, x_offset=0, y_offset=0) {

        this.size_scale = size_scale;
        this.size = 0;
        this.freq_scale = freq_scale;
        this.frequency = 0;

        this.base_size = 0.1; // percentage of the height of the webpage

        this.x_offset = x_offset;
        this.y_offset = y_offset;

        this.detail = 100;
        this.speed = speed;
    }

    draw(t, dt, color) {

        // draw wave
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        let sw = canvas.width / this.detail;

        for (let i = 0; i < this.detail + 1; i++){
            
            let ft = (i / this.detail * Math.PI * 2 + this.frequency) * this.freq_scale;

            let dft = (t / 1000 * this.speed) + this.x_offset;

            let A = canvas.height * ((this.base_size + this.size) * this.size_scale);
            
            let dy = A * Math.sin(ft + dft);

            let x = sw * i;
            let y = canvas.height/2 + dy + (this.y_offset / 100 * canvas.height);

            ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);

        ctx.fill()
    }
}
