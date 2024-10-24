function Spectrum(){
	this.name = "spectrum";
// tweaked and changed this code to add a different color spectrum. 
	this.draw = function(){
		push();
		image(backgroundImages[1], 0, 0, width, height);
		//experimenting with HSB color
		colorMode(HSB, 360, 100, 100);
		var spectrum = fourier.analyze();
		noStroke();
		var barHeight = height / spectrum.length;

    	for (var i = 0; i < spectrum.length; i++) {
      	var h = map(spectrum[i], 0, 255, 0, height); 
      	var y = map(i, 0, spectrum.length, 0, height - barHeight);

      // To map the colors to the amplitude 
	  var hueValue = map(spectrum[i], 0, 255, 280, 200);
      var saturationValue = 100;
      var brightnessValue = 100;

      // Set the fill color based on HSB values
      fill(hueValue, saturationValue, brightnessValue);
	  //drawbars
      rect(0, y, h, barHeight);
  		}
		pop();
	};
}

  

