class DynamicWavesVisual {
    constructor() {

        let theme = get_scheme();
        this.wave_layers = 
        [new DynamicWaveLayer(2, 0.2, theme.get_color(1/5), 0, -50, 1000),
        new DynamicWaveLayer(1, 0.3, theme.get_color(2/5), 0, -10, 800),
        new DynamicWaveLayer(0.7, 0.6, theme.get_color(3/5), 0, 10, 400),
        new DynamicWaveLayer(0.5, 0.8, theme.get_color(4/5), 0, 25, 200),
        new DynamicWaveLayer(0.3, 1.0, theme.get_color(5/5), 0, 50, 100)];

    }

    draw(t, dt) {

        let theme = get_scheme();

        // draw background
        ctx.fillStyle = theme.get_color(0);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw all layers
        let i = 1;
        this.wave_layers.forEach((layer) => {
            layer.draw(t, dt, theme.get_color(i/5));
            i++;
        })
    }
}

class DynamicWaveLayer {
    constructor(size_scale=1, freq_scale=1, color='red', x_offset=0, y_offset=0, speed=200) {

        this.size_scale = size_scale;
        this.freq_scale = freq_scale;

        this.base_size = 0.2; // percentage of the height of the webpage

        this.x_offset = x_offset;
        this.y_offset = y_offset;
        this.color = color;

        this.detail = 50;
        this.speed = speed;
    }

    draw(t, dt, color) {

        //Amplitude taken from highest value
        let amplitude = 0.0;
        let i = 0;
        for (i=0; i<analyzer_data.length; i++) {
            if ((analyzer_data[i] + 200) > amplitude) {
                amplitude = analyzer_data[i] + 200;
            }
        }
        amplitude = amplitude / 100.0;
        //console.log(amplitude);
        //Wavelength taken from average value
        let wavelength = 0.0;
        for (i=0; i<analyzer_data.length; i++) {
            wavelength += analyzer_data[i];
        }
        wavelength = wavelength / (i*50);
        //console.log(wavelength);

        // draw the stats
        // ctx.font = '25px serif';
        // ctx.fillStyle = 'black';
        // ctx.fillText('Wavelength: '+wavelength, 20, 100);
        // ctx.fillText('Amplitude: '+amplitude, 20, 130);

        // draw wave
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        let sw = canvas.width / this.detail;

        for (let i = 0; i < this.detail + 1; i++){
            
            let ft = i / this.detail * Math.PI * 2 * this.freq_scale;

            let dft = (t / this.speed) + this.x_offset;

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