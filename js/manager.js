let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let active_visual = null;
let analyzer = null;
let analyzer_data;

const streamAnalysis = function(stream) {

    const context = new (window.AudioContext || window.webkitAudioContext)();
    const processor = context.createScriptProcessor(1024, 1, 1);
    
    analyzer = context.createAnalyser();
    analyzer.connect(context.destination);

    analyzer_data = new Float32Array(analyzer.frequencyBinCount);

    analyzer.getFloatFrequencyData(analyzer_data);
}


navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(streamAnalysis);



// auto resize canvas when then window changes size
window.addEventListener('resize', this.update_canvas_size);
function update_canvas_size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function set_visual(visual) {
    active_visual = visual;
}

// run the visualizer
function run() {
    update_canvas_size();
    window.requestAnimationFrame(__update_loop);
}

let prev_t;
function __update_loop(t) {
    window.requestAnimationFrame(__update_loop);
    
    let dt = t - this.prev_t;
    active_visual.draw(t, dt);
    this.prev_t = t;
}

set_visual(new Visual());
run();
