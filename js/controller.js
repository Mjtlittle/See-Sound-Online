let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let active_visual = 0;
let visuals = [
    new WaveVisual(),
    new DynamicWavesVisual(),
    new BarVisual(),
    new HistogramVisual(),
    new CircleVisual(),
    new CircleBassVisual(),
];


// auto resize canvas when then window changes size
window.addEventListener('resize', update_canvas_size);
function update_canvas_size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    call_visual_setup();
}

// change the visual on click
canvas.addEventListener('click', next_visual);

// switch to the previous visual
function next_visual() {
    active_visual += 1;
    active_visual %= visuals.length;
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

    if (analyzer != null)
        visuals[active_visual].draw(t, dt);
        
    this.prev_t = t;
}

run();
