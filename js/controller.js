let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvas_ratio;

let splashscreen = true;
let logo_image = document.getElementById('logo');

let active_visual = 0;
let visuals = [
    new WaveVisual(),
    new DynamicWavesVisual(),
    new BarVisual(),
    new CircleVisual(),
    new CircleBassVisual(),
    new CircleBassColorSchemeVisual(),
    new HistogramVisual(),
    new BlockWavesVisual(),
];


// auto resize canvas when then window changes size
window.addEventListener('resize', update_canvas_size);
function update_canvas_size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas_ratio = canvas.width / canvas.height;
    call_visual_setup();
}



// // change the visual on click
// canvas.addEventListener('click', (event) => {

//     // control visualizer
//     if (event.x > canvas.width/2){
//         next_visual();

//     // control theme
//     } else {
//         next_theme();
//         call_visual_setup();
//     }

// });

// listen for key press
window.addEventListener('keydown', (event) => {

    switch(event.which) {
        case 37: //left arrow
            prev_visual();
            break;
        case 38: //down arrow
            next_theme();
            break;
        case 39: //right arrow
            next_visual();
            break;
        case 40: //up arrow
            prev_theme();
            break;
        default:
            //pass
    }

});

// switch to the next visual
function next_visual() {
    active_visual += 1;
    active_visual %= visuals.length;
    call_visual_setup();
    splashscreen = false;
}

// switch to previous visual
function prev_visual() {
    active_visual -= 1;
    active_visual %= visuals.length;
    call_visual_setup();
    splashscreen = false;
}

// calls the setup method on a visual if it exists
function call_visual_setup(){
    let visual = visuals[active_visual];
    if (visual.setup != null) {
        visual.setup()
    }
}

// run the visualizer
function run() {
    update_canvas_size();
    call_visual_setup();
    window.requestAnimationFrame(__update_loop);
}

let prev_t;
function __update_loop(t) {
    window.requestAnimationFrame(__update_loop);

    if (analyzer != null)
        analyzer.getFloatFrequencyData(analyzer_data);

    let dt = t - this.prev_t;

    // if the analyzer exists
    if (typeof analyzer !== 'undefined' && analyzer != null){
        
        visuals[active_visual].draw(t, dt);
        
        // overlay splashscreen on first visual
        if (splashscreen)
            overlay_splash_screen();
    }
    
    this.prev_t = t;
}

function overlay_splash_screen() {

    ctx.fillStyle = 'rgb(0,0,0,0.5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let scale = canvas_ratio / 4;

    let img_w = logo_image.width * scale;
    let img_h = logo_image.height * scale;
    let img_x = canvas.width / 2 - img_w / 2;
    let img_y = canvas.height / 2 - img_h - 60;

    ctx.drawImage(logo_image, img_x, img_y, img_w, img_h);

    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Welcome to See Sound Online!', canvas.width/2, canvas.height/2);

    ctx.font = '35px Arial';
    ctx.fillText('Click on the right side of the screen to change the visual', canvas.width/2, canvas.height/2+60);
    ctx.fillText('and click to the left side to change the theme.', canvas.width/2, canvas.height/2+100);
}
