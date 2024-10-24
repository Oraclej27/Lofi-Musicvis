// I experimented and changed this code to make the wave rotate in a circle. Also added another wave. 
function WavePattern() {
	// Visualization name
	this.name = "wavepattern";
  
	// This section was coded using a youtube video that teaches about cos, sin and radius. 
	// most of it came about from experementing different code and posiblilites
	// Variables for wave rotation
	let angle1 = 0;
	let angle2 = 0;
	let rotationSpeed = 0.0043; // This controls rotations speed. I initially wanted a slow rotation. Then I realized a quick rotation makes it look like a whole circle of waves. 
  
	// Draw the wave form within a circle, reffrence to youtube video then applied to original wave from template. 
	this.draw = function() {
	  push();
	  image(backgroundImages[2], 0, 0, width, height);
	  colorMode(HSB, 360, 250, 300);
	  noFill();
  
	  translate(width / 2, height / 2); // moved the origin to the center of the canvas so it will spin around it. 
	//initially started with one wave but added two rotating in counter direction for a better look. 
	// First wave (main wave)
	  stroke(180, 200, 300); 
	  strokeWeight(4); 
	  beginShape();
	  var wave = fourier.waveform();
	  for (var i = 0; i < wave.length; i += 5) {
		var radius = height * 0.3;
		var x = cos(angle1) * (radius + map(wave[i], -1, 1, 0, radius));
		var y = sin(angle1) * (radius + map(wave[i], -1, 1, 0, radius));
		vertex(x, y);
		angle1 += rotationSpeed;
	  }
	  endShape();
  
	  // Second wave (opposite direction)
	  stroke(200, 10, 300); // Different color for the second wave
	  beginShape();
	  for (var j = 0; j < wave.length; j += 5) {
		var radius2 = height * 0.25; // Different radius for the second wave, made this smaller to allow better visibility of waves. 
		var x2 = cos(angle2) * (radius2 + map(wave[j], -1, 1, 0, radius2));
		var y2 = sin(angle2) * (radius2 + map(wave[j], -1, 1, 0, radius2));
		vertex(x2, y2);
		angle2 -= rotationSpeed; // Opposite rotation direction for the second wave. not noticible for a faster rotation speed, but noticible for slower rotation speed. 
	  }
	  endShape();
	  pop();
	};
  }
  