//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for change track and previous track function
var currentSongIndex = 0;
//variable for p5 fast fourier transform
var fourier;
// backgrounds array 
var backgroundImages = [];
//variable for amplitude
var amplitude;
// array of song nams to load for changing tracks 
var songs = [
    'TokyoBossa.mp3',
    'SwimmingBird.mp3',
    'CanYouHoldMe.mp3',
	'90sFreestyle.mp3'
];

function preload(){
	sound = loadSound('assets/TokyoBossa.mp3');
	for (let i = 0; i < songs.length; i++) {
        loadSound('assets/' + songs[i]); 
    }
	backgroundImages.push(loadImage('Images/Window.JPG'));
    backgroundImages.push(loadImage('Images/headphones.jpg'));
    backgroundImages.push(loadImage('Images/Kakashi.png'));
    backgroundImages.push(loadImage('Images/Sky.jpg'));
    backgroundImages.push(loadImage('Images/lofiGirl.png'));
	backgroundImages.push(loadImage('Images/lofitrain.jpeg'));
	backgroundImages.push(loadImage('Images/Skyforeground.png'));
}

function setup(){
	var canvas = createCanvas(windowWidth,windowHeight);
	canvas.parent('music__vis');
	controls = new ControlsAndInput();
	 //instantiate the fft object
	fourier = new p5.FFT();
	amplitude = new p5.Amplitude();
	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
	 vis.add(new WaveTriangle());
	 vis.add(new ParticlePattern());
	 vis.add(new Cubes());
}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
	// Draw circles that disapear after media button has been pressed 
	controls.playbackButton.update();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}

