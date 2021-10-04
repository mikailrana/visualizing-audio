const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;

container.addEventListener('click', function(){
    let audio1 = new Audio('https://firebasestorage.googleapis.com/v0/b/mikmusic-8c7e3.appspot.com/o/NewStuff%2Fdigital.m4a?alt=media');
    audio1.crossOrigin="anonymous";

    //let audio1 = document.getElementById("audio1");

    const audioContext = new AudioContext();
    audio1.play();
    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 32;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = (canvas.width/2)/bufferLength;
    let barHeight;
    let x;

    function animate(){
        x = 0;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        console.log(dataArray);
        for (let i = 0; i < bufferLength; i++){
            barHeight = dataArray[i] * 4;
            const red = i * barHeight / 20;
            const green = i * 4;
            const blue = barHeight / 2;
            ctx.fillStyle = 'white';
            ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight - 15, barWidth, 20)
            ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
            ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight)
            x += barWidth;
        }
        for (let i = 0; i < bufferLength; i++){
            barHeight = dataArray[i] * 4;
            const red = i * barHeight / 20;
            const green = i * 4;
            const blue = barHeight / 2;
            ctx.fillStyle = 'white';
            ctx.fillRect(x, canvas.height - barHeight - 15, barWidth, 20)
            ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
            x += barWidth;
        }
        requestAnimationFrame(animate);
    }
    animate();
});
