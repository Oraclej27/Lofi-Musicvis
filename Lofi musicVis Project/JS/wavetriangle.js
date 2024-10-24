//Function for waveTriagle pattern. 
// This uses the activity video from the lecture on creating horizontal lines. I added to the code and change the colors.   
function WaveTriangle() {
  this.name = "wavetriangle";
  this.output = [];
  this.speed = 0.7;

  // Function to update dimensions based on window size
  this.updateDimensions = function() {
    this.startX = width / 5;
    this.endY = height / 5;
    this.startY = height - this.endY;
    this.spectrumWidth = (width / 5) * 3;
  };

  // Call updateDimensions when the window is resized
  this.windowResized = function() {
    this.updateDimensions();
  };

  this.addWave = function() {
    let w = fourier.waveform();
    let outputWave = [];
    let smallScale = 3;
    let bigScale = 40;

    // x cordinate for the base of the triangle , to match the horisontal lines to the starting point. 
    let baseX = this.startX + this.spectrumWidth / 2;
    // width of the triangles base, so the lines are not wider than the triangle base
    let baseWidth = this.spectrumWidth;

    for (let i = 0; i < w.length; i++) {
        if (i % 20 == 0) {
            // keep the lines in the right place after window resize 
            let x = map(i, 0, 1024, baseX - baseWidth / 2, baseX + baseWidth / 2);
            // calculate y cordinate
            let y;
            if (i < 1024 * 0.25 || i > 1024 * 0.75) {
                y = map(w[i], -1, 1, -smallScale, smallScale);
            } else {
                y = map(w[i], -1, 1, -bigScale, bigScale);
            }
            //adjust y-coordinate to start at the base of the triangle
            y += this.startY;
            outputWave.push({ x: x, y: y });
        }
    }
    this.output.push(outputWave);
};

  // Draw the pattern
  this.draw = function() {

      push();
      this.updateDimensions();
      image(backgroundImages[0], 0, 0, width, height);
      colorMode(HSB, 360, 250, 300);
      stroke(147, 112, 219);
      strokeWeight(2);
      fill(170, 224, 208, 0.5);

      // Draw triangle
      beginShape();
      vertex(this.startX + this.spectrumWidth / 2, this.endY);
      vertex(this.startX + this.spectrumWidth, this.startY);
      vertex(this.startX, this.startY);
      endShape(CLOSE);

      // Draw horizontal line waves
      if (frameCount % 20 == 0) {
          this.addWave();
      }
      for (let i = 0; i < this.output.length; i++) {
          let o = this.output[i];
          beginShape();
          for (let j = 0; j < o.length; j++) {
              o[j].y -= this.speed;
              vertex(o[j].x, o[j].y);
          }
          endShape();
          if (o[0].y < this.endY) {
              this.output.splice(i, 1);
          }
      }

      // Map amplitude to colors, refrence to p5.js website on lerpColor 
      let level = amplitude.getLevel();
      let mappedLevel = map(level, 0, 1, 0, 50);
      let colorLevel = map(level, 0, 1, 0, 1);
      let colorStart = color(221, 200, 300);
      let colorEnd = color(330, 200, 300);
      let changeColor = lerpColor(colorStart, colorEnd, colorLevel);
      stroke(changeColor);

      // draw the diamond shape that moves with amplitude. 
      noFill();
      beginShape();
      vertex(this.startX + this.spectrumWidth / 2 + random(-mappedLevel, mappedLevel), this.endY - 75 + random(-mappedLevel, mappedLevel));
      vertex(this.startX + this.spectrumWidth + 50 + random(-mappedLevel, mappedLevel), this.startY - 200 + random(-mappedLevel, mappedLevel));
      vertex(this.startX + this.spectrumWidth / 2 + random(-mappedLevel, mappedLevel), height - this.endY + 75 + random(-mappedLevel, mappedLevel));
      vertex(this.startX - 50 + random(-mappedLevel, mappedLevel), this.startY - 200 + random(-mappedLevel, mappedLevel));
      endShape(CLOSE);
      pop();
  };
}
