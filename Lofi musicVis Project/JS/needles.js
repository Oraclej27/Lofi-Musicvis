// needles functions has been changed. 
function Needles() {
    // name of the visualisation
    this.name = "needles";

    // how large is the arc of the needle plot.
    var minAngle = PI + PI / 10;
    var maxAngle = TWO_PI - PI / 10;

    this.plotsAcross = 4; // Change to have all dials in one row
    this.plotsDown = 1; // Change to have all dials in one row

    // frequencies used by the energy function to retrieve a value
    // for each plot.
    this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

    // Define properties for bins, needle, ticks, outer ellipse, and balls
    var binX = [];
    var binY = [];
    var binSpeedX = [];
    var binSpeedY = [];
    var needleX, needleY, needleSpeedX, needleSpeedY;
    var tickX = [];
    var tickY = [];
    var tickSpeedX = [];
    var tickSpeedY = [];
    var outerEllipseX, outerEllipseY, outerEllipseSpeedX, outerEllipseSpeedY;
  

    // resize the plots sizes when the screen is resized.
    this.onResize = function() {
        this.pad = width / 20;
        this.plotWidth = (width - this.pad) / this.plotsAcross;
        this.plotHeight = height / 3; // Adjust plot height
        this.dialRadius = (this.plotWidth - this.pad) / 2 - 10; // Adjust dial radius
        this.ballSize = 60; // Adjust ball size
        this.balls = []; // Array to store multiple balls

        // the start speed and positions of the circle bins containing the needles
        for (var i = 0; i < this.plotsAcross; i++) {
            binX.push(random(width));
            binY.push(random(height));
            binSpeedX.push(random(-2, 2));
            binSpeedY.push(random(-2, 2));
        }

        // positions and speed for other elements
        needleX = random(width);
        needleY = random(height);
        needleSpeedX = random(-2, 2);
        needleSpeedY = random(-2, 2);

        for (var j = 0; j < this.plotsAcross; j++) {
            tickX.push(random(width));
            tickY.push(random(height));
            tickSpeedX.push(random(-2, 2));
            tickSpeedY.push(random(-2, 2));
        }

        outerEllipseX = random(width);
        outerEllipseY = random(height);
        outerEllipseSpeedX = random(-2, 2);
        outerEllipseSpeedY = random(-2, 2);

        // To initialize the positions and velocity of the balls balls
        for (var i = 0; i < 16; i++) { 
            this.balls.push({
                x: random(width),
                y: random(height / 2, height),
                speedX: random(-4, 4),
                speedY: random(-4, 4),
                color: color(random(220, 270), random(150, 250), random(150, 250))
            });
        }
    };

    // call onResize to set initial values when the object is created
    this.onResize();

// draw the plots to the screen
this.draw = function() {
    // create an array amplitude values from the fft.
    var spectrum = fourier.analyze();
    // iterator for selecting frequency bin.
    var currentBin = 0;
    push();
    image(backgroundImages[5], 0, 0, width, height);
    colorMode(HSB, 360, 250, 300);
    fill(290, 100, 150, 0.4);
    noStroke();
    // loop to place plots in a single row
    for (var j = 0; j < this.plotsAcross; j++) {
        // size of the plots
        var x = (j + 0.5) * width / (this.plotsAcross + 1); // Adjust x position based on column and canvas width
        var y = height / 3; // Adjust y position to be in the middle of the canvas
        var w = this.plotWidth - this.pad; // Width of the plot
        var h = this.plotHeight - this.pad * 2; // Height of the plot

        // draw ellipse at that location and size
        ellipse(binX[j], binY[j], w - 10, this.dialRadius * 2); 
        // add on the ticks
        var centreX = binX[j];
        var bottomY = binY[j];

        this.ticks(centreX, bottomY, this.frequencyBins[currentBin], w);

        var energy = fourier.getEnergy(this.frequencyBins[currentBin]);

        // add the needle
        this.needle(energy, centreX, bottomY, h);
        currentBin++;
    }

    // This for loop will update positions and handle the collisions for bins and the canvas width and height. 
    for (var i = 0; i < this.plotsAcross; i++) {
        binX[i] += binSpeedX[i];
        binY[i] += binSpeedY[i];
        // Handle collisions with canvas boundaries
        if (binX[i] > width || binX[i] < 0) {
            binSpeedX[i] *= -1;
        }
        if (binY[i] > height || binY[i] < 0) {
            binSpeedY[i] *= -1;
        }
    }

     // draw and update all balls
     for (var i = 0; i < this.balls.length; i++) {
        var ball = this.balls[i];
        fill(ball.color);
      

        var lowMidEnergy = fourier.getEnergy("lowMid");
        ball.size = map(lowMidEnergy, 0, 255, 20, 60); 

        ellipse(ball.x, ball.y, ball.size, ball.size);
        // update the position of the ball
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        // check if the ball hits the walls, handles collisions with the canvas, bounce back. 
        if (ball.x > width - this.ballSize / 2 || ball.x < this.ballSize / 2) {
            ball.speedX *= -1; 
        }
        if (ball.y < this.ballSize / 2 || ball.y > height) {
            ball.speedY *= -1; 
        }
    }

    // check if the bass frequency exceeds 220 and does not have a decimal number. 
    var bassEnergy = fourier.getEnergy("bass");
    if (Math.floor(bassEnergy)== bassEnergy && bassEnergy > 220 ) {
        for (var i = 0; i < this.balls.length; i++) {
            this.balls[i].color = color(random(180, 330), random(150, 250), random(150, 300))
        }
    }
    // chick if treble frequency is above 100, if so then increas speed and movement of balls with random in both x and y . 
    var trebleEnergy = fourier.getEnergy("treble");
    if (trebleEnergy > 100) {
        for (var i = 0; i < this.balls.length; i++) {
            this.balls[i].speedX += random(-1, 1);
            this.balls[i].speedY += random(-1, 1);
        }
    }
    // if  treble frequency is greater then 50 then increase the speed. 
    if (trebleEnergy < 50 && trebleEnergy > 20){
        for (var i = 0; i < this.balls.length; i++) {
            this.balls[i].speedX *= 0.95; // Reduce speed in x direction
               this.balls[i].speedY *= 0.95; // Reduce speed in y direction
    }
    }
    pop();
};

    // draws a needle to an individual plot
    // @param energy: The energy for the current frequency
    // @param centreX: central x coordinate of the plot rectangle
    // @param bottomY: The bottom y coordinate of the plot rectangle
    this.needle = function(energy, centreX, bottomY, h) {
        push();
        stroke(240, 250, 350);
        translate(centreX, bottomY);
        theta = map(energy, 0, 255, minAngle, maxAngle);
        var x = this.dialRadius * cos(theta);
        var y = this.dialRadius * sin(theta);
        line(0, 0, x, y);
        pop();
    };

    // draw the graph ticks on an individual plot
    // @param centreX: central x coordinate of the plot rectangle
    // @param bottomY: The bottom y coordinate of the plot rectangle
    // @param freqLabel: Label denoting the frequency of the plot
    this.ticks = function(centreX, bottomY, freqLabel, w) {
        var nextTickAngle = minAngle;
        push();
        stroke(180, 250, 300);
        fill(90, 250, 300);
        translate(centreX, bottomY);

        // draw the semi circle for the bottom of the needle
        arc(0, 0, 20, 20, PI, 2 * PI);
        textAlign(CENTER);
        textSize(12);
        text(freqLabel, 0, -(this.plotHeight / -5));

        textAlign(CENTER);
        textSize(10);
        text(freqLabel, 0, -(w / 8)); // Adjust the distance here

        for (var i = 0; i < 9; i++) {
            var x = this.dialRadius * cos(nextTickAngle);
            var x1 = (this.dialRadius - 6) * cos(nextTickAngle);

            var y = this.dialRadius * sin(nextTickAngle);
            var y1 = (this.dialRadius - 6) * sin(nextTickAngle);

            line(x, y, x1, y1);
            nextTickAngle += PI / 10;
        }
        pop();
    };
}
