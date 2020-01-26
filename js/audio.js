let analyzer = null;
let analyzer_data;


// get the analyzer and audio context
const streamAnalysis = function(stream) {

console.log('stream');

    const context = new (window.AudioContext || window.webkitAudioContext)();
    const source = context.createMediaStreamSource(stream);
    
    //disableFileInput();
    document.getElementById('submit').remove();

    analyzer = context.createAnalyser();
    analyzer.minDecibels = -100;
    analyzer.maxDecibels = 0;
    analyzer.fftSize = 1024;
    source.connect(analyzer);

    analyzer_data = new Float32Array(analyzer.frequencyBinCount);
    analyzer.getFloatFrequencyData(analyzer_data);

    run();
    
}


document.getElementById('submit').addEventListener('click', (event) => {
    //Restore after demo
    //var filename = document.getElementById('input').files[0].name;
    var element = document.createElement("audio");
    //Restore after demo
    element.src = 'music/electric_feel.mp3'; //element.src = 'music/'+filename;
    element.type = 'audio/mpeg';
    document.body.append(element);
    
    //Remove after demo
    document.getElementById('submit').remove();

    //Restore after demo
    //disableFileInput();

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    var context = new AudioContext();
    const audioElement = document.querySelector('audio');
    const track = context.createMediaElementSource(audioElement);

    analyzer = context.createAnalyser();
    analyzer.minDecibels = -100;
    analyzer.maxDecibels = 0;
    analyzer.fftSize = 1024;

    track.connect(analyzer);

    analyzer_data = new Float32Array(analyzer.frequencyBinCount);
    analyzer.getFloatFrequencyData(analyzer_data);

    analyzer.connect(context.destination);


    audioElement.play();

    analyzer.getFloatFrequencyData(analyzer_data)

    run();

});

//Remove after demo
document.getElementById('input').remove();

//Should fail if access to mic is rejected
navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(streamAnalysis);

//Note: merely takes absolute value
//Not good for handling frequencies that are already positive, but those are unlikely
//Remember that when the decibels increase, these numbers will, in effect, decrease
function getBassFreq() {
    analyzer.getFloatFrequencyData(analyzer_data);
    //return 0-250hz decibel values
    new_data = analyzer_data.slice(0,251);
    for(let i=0; i<new_data.length; i++) {
        new_data[i] = Math.abs(new_data[i]);
    }
    return new_data;
}

function getNormalFreq() {
    analyzer.getFloatFrequencyData(analyzer_data);
    //return 250-2400hz decibel values
    new_data = analyzer_data.slice(251,2400);
    for(let i=250; i<new_data.length+250; i++) {
        new_data[i] = Math.abs(new_data[i]);
    }
    return new_data;
}

function getHighestFreq() {
    analyzer.getFloatFrequencyData(analyzer_data);
    let max_freq = -500.0;
    for(let i=0; i<analyzer_data.length; i++) {
        if(analyzer_data[i] > max_freq) {
            max_freq = analyzer_data[i];
        }
    }
    return max_freq;
}

function getLowestFreq() {
    analyzer.getFloatFrequencyData(analyzer_data);
    let min_freq = 500.0;
    for(let i=0; i<analyzer_data.length; i++) {
        if(analyzer_data[i] < min_freq) {
            min_freq = analyzer_data[i];
        }
    }
    return min_freq;
}

function getAverageFreq() {
    analyzer.getFloatFrequencyData(analyzer_data);
    sum = 0.0;
    for(let i=0; i<analyzer_data.length; i++) {
        sum += analyzer_data[i];
    }
    return sum / analyzer_data.length;
}

function getAverageBassFreq() {
    let analyzer_data = getBassFreq();
    sum = 0.0;
    for(let i=0; i<analyzer_data.length; i++) {
        sum += analyzer_data[i];
    }
    return sum / analyzer_data.length;
}