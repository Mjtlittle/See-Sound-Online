let analyzer = null;
let analyzer_data;

// get the analyzer and audio context
const streamAnalysis = function(stream) {

    const context = new (window.AudioContext || window.webkitAudioContext)();
    const source = context.createMediaStreamSource(stream);
    
    analyzer = context.createAnalyser();
    analyzer.minDecibels = -100;
    analyzer.maxDecibels = 0;
    analyzer.fftSize = 64;
    source.connect(analyzer);

    analyzer_data = new Float32Array(analyzer.frequencyBinCount);
    analyzer.getFloatFrequencyData(analyzer_data);
    
}
navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(streamAnalysis);