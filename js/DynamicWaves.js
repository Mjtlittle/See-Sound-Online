class DynamicWavesVisual {
    constructor() {
        this.wave_layers = [new DynamicWaveLayer(0.5, 2, 'red'), new DynamicWaveLayer(1, 1, 'blue', 0, 10)];
    }

    draw(t, dt) {

        console.log(analyzer_data);

        // draw background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw all layers
        this.wave_layers.forEach((layer) => {
            layer.draw(t, dt);
        })
    }
}

class DynamicWaveLayer {
    constructor(size_scale=1, freq_scale=1, color='red', x_offset=0, y_offset=0) {

        this.size_scale = size_scale;
        this.freq_scale = freq_scale;

        this.base_size = 0.2; // percentage of the height of the webpage

        this.x_offset = x_offset;
        this.y_offset = y_offset;
        this.color = color;

        this.detail = 100;
    }

    draw(t, dt) {

        //Amplitude taken from highest value
        let amplitude = 0.0;
        amplitude = Math.max(analyzer_data) / 50.0;
        console.log(amplitude);
        //Wavelength taken from average value
        let wavelength = 0.0;
        let i = 0;
        for (i=0; i<analyzer_data.length; i++) {
            wavelength += analyzer_data[i];
        }
        wavelength = wavelength / (i*50.0);
        console.log(wavelength);

        // draw wave
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        let sw = canvas.width / this.detail;

        for (let i = 0; i < this.detail + 1; i++){
            
            let ft = i / this.detail * Math.PI * 2 * this.freq_scale;

            let dft = (t / 1000) + this.x_offset;

            let A = canvas.height * (this.base_size * this.size_scale);
            
            let dy = A * amplitude * Math.sin((ft*wavelength) + dft);

            let x = sw * i;
            let y = canvas.height/2 + dy + (this.y_offset / 100 * canvas.height);

            ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);

        ctx.fill()
    }
}
