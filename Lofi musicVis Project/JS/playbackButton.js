//displays and handles clicks on the playback button.
function PlaybackButton(){
    // these are properties to the play button 
    this.x = 60;
    this.y = 20;
    this.width = 20;
    this.height = 20;
    this.playing = false;

    // these are properties for the circles that apear when a media button is pressed. 
	this.circleTimer = 0;
    this.circleDuration = 10; // Duration in frames
    this.circleTimer2 = 0;
    this.circleDuration2 = 10;
    this.circleTimer3 = 0;
    this.circleDuration3 = 10;

    // These properties for track change button 
    this.trackChangeButtonWidth = 25;
    this.trackChangeButtonHeight = 25;

    // properties for the previous button
    this.previousButtonWidth = 25;
    this.previousButtonHeight = 25;

    // properties for the track duration slider 
    this.sliderWidth = 120;
    this.sliderHeight = 20;
    
    // created a volume slider in the dom
    this.volume = createSlider(0,1,0.5, 0.01);
    this.volume.parent('sliders');
    let currentSongName = '';
    let playButtonPressed = false;

    this.draw = function() {
        //draws media button pill container
	    noStroke();
        fill(176,224,230,100);
        arc(this.x + 235, this.y + 33, 78, 90, -HALF_PI, HALF_PI, OPEN);
        arc(this.x - 20, this.y + 33, 78, 90, HALF_PI, -HALF_PI, OPEN);
        rect(this.x - 20,this.y -12,255,90);

        // draws circle animations around media buttons when pressed
		if (this.circleTimer > 0) {
			fill(0,139,138,100);
            ellipse(this.x + this.width / 2, this.y + this.height / 2, 35, 35);
        }
        if (this.circleTimer2 > 0) {
            fill(0,139,138,100);
            ellipse(this.x + 50, this.y + 9, this.trackChangeButtonWidth, this.trackChangeButtonHeight);
        }
        if (this.circleTimer3 > 0) {
            fill(0,139,138,100);
            ellipse(this.x - 35, this.y + 9, this.previousButtonWidth, this.previousButtonHeight);
        }

        // Draw playback button
        if (this.playing) {
			fill(255,235,205);
            rect(this.x, this.y, this.width/2 - 2, this.height);
            rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
        } else {    
			fill(255,235,205);
            triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);
        }
	
        // draw track change button
		fill(255,235,205);
        triangle(this.x + 43, this.y + 3, this.x + 55, 
				 this.y + 10 , this.x + 43, this.y + 17);
		rect(this.x + 55, this.y + 4, 3, 12);
       
		//draw previus track button 
		triangle(this.x -28, this.y +3 , this.x -40, 
			     this.y + 10, this.x - 28, this.y + 17);
        rect(this.x - 43, this.y +4, 3, 12);

        //draw track time slider
		fill(0,139,138);
		rect(this.x + 100, this.y, this.sliderWidth, this.sliderHeight);
		ellipse(this.x + 100, this.y +10, 20, this.sliderHeight);
		ellipse(this.x +220, this.y+10, this.sliderHeight);
		fill(255,235,205);
        //map the song duration to the slider
		let sliderPosition = map(sound.currentTime(), 0, sound.duration(), this.x +100, (this.x +100) + this.sliderWidth);
		ellipse(sliderPosition, this.y + this.sliderHeight / 2, 15, 15);
		// draw time remaining to the right of the slider 
		let timeRemaining = sound.duration() - sound.currentTime();
		let minutes = floor(timeRemaining / 60);
		let seconds = nf(floor(timeRemaining % 60), 2);
		textAlign(LEFT);
		textSize(12);
		fill(255);
		text(minutes + ':' + seconds, (this.x +100) + this.sliderWidth + 15, (this.y + this.sliderHeight / 2) +4);

        //Volume is added to slider and style
        sound.setVolume(this.volume.value());
        this.volume.style('width', '150px'); // Set width
        this.volume.style('height', '20px'); // Set height
       
        //draw song names
        fill(255);
        textSize(13);
        stroke(20);
        textAlign(LEFT);
        text(currentSongName, this.x + 50, this.y + 70);
    };

    //track slider hitcheck function , decided to write it in its own function to is if it was an easier way to be called
    // into to biger hitcheck function. I might be a better way to compartmentalize if this was done to all of the media buttons. 
	this.sliderHitCheck = function() {
        return (mouseX > this.x + 100 && mouseX < (this.x +100) + this.sliderWidth &&
                mouseY > this.y && mouseY < this.y + this.sliderHeight);
    };

    //hitcheck functions for media buttons 
	this.hitCheck = function() {
        //hitcheck for playback button
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            if (!playButtonPressed) {
                currentSongName = songs[currentSongIndex];
                playButtonPressed = true;
            }
            
            if (sound.isPlaying()) {
                sound.pause();
                // add animation if clicked 
				this.circleTimer = this.circleDuration;
            } else {
                sound.loop();
                //animation for everytime it is clicked 
				this.circleTimer = this.circleDuration;
            }
            this.playing = !this.playing;
            return true;
            //track change button hitcheck
        } else if (mouseX > (this.x +50)-10 && mouseX < (this.x +50) + this.trackChangeButtonWidth -10&&
            mouseY > (this.y + 9) -10 && mouseY < (this.y + 9) + this.trackChangeButtonHeight -10) {
            // if button is ckicked then call changeTrack
            changeTrack();
            // again add animation 
			this.circleTimer2 = this.circleDuration2;
            return true;
            //previous track hitcheck
        }else if (mouseX > (this.x -35) && mouseX -10 < (this.x -35) + this.previousButtonWidth-10 &&
            mouseY > (this.y + 9) -10 && mouseY < (this.y + 9) + this.previousButtonHeight-10){
            // if button is clicked then call previousTrack 
			previousTrack();
            // animation 
			this.circleTimer3 = this.circleDuration3;
			return true;
		} else if (this.sliderHitCheck()) {
            // Update the playback track position based on the slider position
            let newPosition = map(mouseX, this.x + 100, (this.x +100) + this.sliderWidth, 0, sound.duration());
            // I used sound.jump to jump to new track position 
            sound.jump(newPosition);
            return true;
            } 
        return false;
    };

    //Function to change track 
    function changeTrack() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        sound.stop();
        sound = loadSound('assets/' + songs[currentSongIndex], function() {
            sound.loop();
            currentSongName = songs[currentSongIndex];
        });
    }

    //Function to go back to previous track 
	function previousTrack(){
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        sound.stop();
        sound = loadSound('assets/' + songs[currentSongIndex], function() {
            sound.loop();
            currentSongName = songs[currentSongIndex];
	});
    }
	
    // update media button animation timer 
	this.update = function() {
		if (this.circleTimer > 0) {
			this.circleTimer--;
		}
		if (this.circleTimer2 > 0) {
		this.circleTimer2--;
	    }
		if (this.circleTimer3 > 0) {
		this.circleTimer3--;
	    }
	};
}
