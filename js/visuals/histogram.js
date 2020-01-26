
class HistogramVisual {
    constructor(){

        this.cached_buffer = null
        this.cache_width = null;
        this.cache_height = null;

    }

    setup() {
        // background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (this.cached_buffer != null && 
            this.cache_width == canvas.width && 
            this.cache_height == canvas.height){
            ctx.putImageData(this.cached_buffer, 0, 0);
        }

    }

    draw(t, dt) {

        // shift the screen over
        var image_buffer = ctx.getImageData(0, 0, canvas.width, canvas.height);
        this.cached_buffer = image_buffer;
        this.cache_width = canvas.width;
        this.cache_height = canvas.height;
        ctx.putImageData(image_buffer, -1, 0);

        // draw parts
        let bh = canvas.height / analyzer_data.length;
        for(let i = 0; i < analyzer_data.length; i++){
            let value = (1 - (analyzer_data[i] * -1) / 100) * 255;

            ctx.fillStyle = 'rgb(' + value + ',' + value + ',' + value + ')';
            ctx.fillRect(canvas.width-1, bh * i, 1,bh);
        }
    }
}