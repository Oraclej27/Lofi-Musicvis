//Functions for controls 
function ControlsAndInput() {

    this.menuDisplayed = false;
    this.playbackButton = new PlaybackButton(); // Create a new PlaybackButton instance

    //global variable properties for new UI menu. I drew circles with the number of the visualizer inside.
    var circleDiameter = 25; 
    var circleSpacing = 40; // for even spacing between circles
    var startX = 45; //starting x for the first circle 

    // mouse pressed function calls playback button hitcheck and menu hitcheck
    this.mousePressed = function() {
        if (this.playbackButton.hitCheck()) {
        } 
        //menu 
        if(this.menuHitcheck()){
        }
    };  

    // key press function for number keys and spacebar
    this.keyPressed = function(keycode) {
        //use the space bar to play or pause music
        if (keycode == 32) { 
            if (sound.isPlaying()) {
                sound.pause();
            } else {
                sound.loop();
            }
            this.playbackButton.playing = !this.playbackButton.playing; // to update the playback button
        }
        // assigning number keys to visualizations remains the same
        if (keycode > 48 && keycode < 58) {
            var visNumber = keycode - 49;
            vis.selectVisual(vis.visuals[visNumber].name);
        }
    };

    //draws new media buttons including slider, also draws new menu. 
    this.draw = function() {
        push();
        // media controls
        this.playbackButton.draw();
        // menu 
        this.menu();
     pop();
    };

    this.menu = function() {
        // drawing properties for new menu
        noStroke();
        textSize(15);
        for (let i = 0; i < vis.visuals.length; i++) {
            let xPos = startX + i * circleSpacing;
            let yPos = 60;
    
            // if statement to check which music visual is selected and indicate it with a change in color. 
            if (vis.selectedVisual.name === vis.visuals[i].name) {
                fill(0,139,138,);; // will change the fill color of the button
            } else {
                fill(255,235,205); // Otherwise, keep it this color 
            }
    
            //circles
            ellipse(xPos, yPos, circleDiameter, circleDiameter);
            //to display the number inside the circle
            fill(0);
            textAlign(CENTER, CENTER);
            text(i + 1, xPos, yPos);
        }
    };

    // menu hitcheck properties
    this.menuHitcheck = function(){
            // for loop and if statement to check if the menu elements have been clicked. 
            for (let i = 0; i < vis.visuals.length; i++) {
                let xPos = startX + i * circleSpacing;
                let yPos = 60;
    
                if (dist(mouseX, mouseY, xPos, yPos) < circleDiameter / 2) {
                    // change the visualization to the one selected and break to get out of the loop. 
                    vis.selectVisual(vis.visuals[i].name); 
                    break; 
                }
            }
    }
}
