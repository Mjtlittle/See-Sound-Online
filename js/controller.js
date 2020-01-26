let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let active_visual = 0;
let visuals = [
    new SplashScreen(),
    new WaveVisual(),
    new DynamicWavesVisual(),
    new BarVisual(),
    new CircleVisual(),
    new CircleBassVisual(),
    new CircleBassColorSchemeVisual(),
    new HistogramVisual(),
];


// auto resize canvas when then window changes size
window.addEventListener('resize', update_canvas_size);
function update_canvas_size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    call_visual_setup();
}

// change the visual on click
canvas.addEventListener('click', (event) => {

    // control visualizer
    if (event.x > canvas.width/2){
        next_visual();

    // control theme
    } else {
        next_theme();
        call_visual_setup();
    }

});

// switch to the previous visual
function next_visual() {
    active_visual += 1;
    active_visual %= visuals.length;
    if(active_visual == 0) {
        active_visual++;
    }
    call_visual_setup();
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

    if (typeof analyzer !== 'undefined' && analyzer != null)
        visuals[active_visual].draw(t, dt);
        
    this.prev_t = t;
}

run();
