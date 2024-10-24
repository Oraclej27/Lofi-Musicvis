//function to draw cubes
function Cubes() {
    // Visualization name 
    this.name = "cubes";

var rotationAngle = 0; 
var rotationSpeed = 0.01;

//This section of code was all written by me based of lecture videos and other vizualizations from this app. 
// Draw function, inizializes x and y locations and draws shapes to creat a 3d cube effect. 
    this.draw = function () {
        push();
        var x = 0;
        var y = 0; 
        var centerX = width/3; 
        var centerY = height/2; 
      
        //load bachground image 
        image(backgroundImages[4], 0, 0, width, height);
        // learning HSB colors 
        colorMode(HSB, 360, 250, 300);
        //map amplitude 
        let level = amplitude.getLevel();
        let getLevel = map(level, 0, 1, 0, 70);

        // rotate speed based on the amplitude 
        rotationAngle += rotationSpeed * getLevel;
      
        //set rotations 
        translate(centerX, centerY);        
        rotate(rotationAngle);
        noStroke();
        fill(300, 100, 255);
    
        //cube1
        //front face pink 
        beginShape();
        vertex((x + 125) + (getLevel * 6 ), (y -20) - (getLevel * 6 ));
        vertex((x + 125) + (getLevel * 6 ), (y -120) - (getLevel * 6 ));
        vertex((x + 25) + (getLevel * 6), (y -120) - (getLevel * 6 ));
        vertex((x + 25) + (getLevel * 6), (y -20)  - (getLevel* 6 ));
        endShape(CLOSE);
       
    
        // Bottom face purple 
        fill(270, 100, 255);
        beginShape();
        vertex((x + 125) + (getLevel * 6), (y -20) - (getLevel * 6));
        vertex((x + 100), y);
        vertex(x, y);
        vertex((x + 25) + (getLevel * 6), (y -20)  - (getLevel * 6));
        endShape(CLOSE);
    
        //side face green
        fill(150, 100, 255);
        beginShape();
        vertex((x + 25) + (getLevel * 6), (y -20)  - (getLevel * 6));
        vertex(x, y);
        vertex(x , y -60);
        vertex((x + 25) + (getLevel * 6), (y -120) - (getLevel * 6));
        endShape(CLOSE);
    
    
        fill(300, 100, 255);
        // Cube 2
        // Front face pink 
        beginShape();
        vertex((x - 125) - (getLevel * 6 ), (y -20) - (getLevel * 6 ));
        vertex((x - 125) - (getLevel * 6 ), (y -120) - (getLevel * 6 ));
        vertex((x - 25) - (getLevel * 6), (y -120) - (getLevel * 6 ));
        vertex((x - 25) - (getLevel * 6), (y -20)  - (getLevel* 6 ));
        endShape(CLOSE);
    
        // Bottom face purple 
        fill(270, 100, 255);
        beginShape();
        vertex((x - 125) - (getLevel * 6), (y -20) - (getLevel * 6));
        vertex((x - 100), y);
        vertex(x, y);
        vertex((x - 25) - (getLevel * 6), (y -20)  - (getLevel * 6));
        endShape(CLOSE);
    
        // Side face green
        fill(150, 100, 255);
        beginShape();
        vertex((x - 25) - (getLevel * 6), (y -20)  - (getLevel * 6));
        vertex(x, y);
        vertex(x , y -60 );
        vertex((x - 25) - (getLevel * 6), (y -120) - (getLevel * 6));
        endShape(CLOSE);
    
        // Cube 3
        // Front face pink 
        fill(300, 100, 255);
        beginShape();
        vertex(-(x + 125) - (getLevel * 6 ), (y +20) + (getLevel * 6 ));
        vertex(-(x + 125) - (getLevel * 6 ), (y +120) + (getLevel * 6 ));
        vertex(-(x + 25) - (getLevel * 6), (y +120) + (getLevel * 6 ));
        vertex(-(x + 25) - (getLevel * 6), (y +20)  + (getLevel * 6 ));
        endShape(CLOSE);
            
        // Bottom face purple 
        fill(270, 100, 255);
        beginShape();
        vertex(-(x + 125) - (getLevel * 6), (y +20) + (getLevel * 6));
        vertex(-(x + 100), y);
        vertex(-x, y);
        vertex(-(x + 25) - (getLevel * 6), (y +20)  + (getLevel * 6));
        endShape(CLOSE);
            
        // Side face green
        fill(150, 100, 255);
        beginShape();
        vertex(-(x + 25) - (getLevel * 6), (y +20)  + (getLevel * 6));
        vertex(-x, y );
        vertex(-x , y +55);
        vertex(-(x + 25) - (getLevel * 6), (y +120) + (getLevel * 6));
        endShape(CLOSE);
            
        // Cube 4
        // Front face pink 
        fill(300, 100, 255);
        beginShape();
        vertex(-(x - 125) + (getLevel * 6 ), (y +20) + (getLevel * 6 ));
        vertex(-(x - 125) + (getLevel * 6 ), (y +120) + (getLevel * 6 ));
        vertex(-(x - 25) + (getLevel * 6), (y +120) + (getLevel * 6 ));
        vertex(-(x - 25) + (getLevel * 6), (y +20)  + (getLevel* 6 ));
        endShape(CLOSE);
            
        // Bottom face purple 
        fill(270, 100, 255);
        beginShape();
        vertex(-(x - 125) + (getLevel * 6), (y +20) + (getLevel * 6));
        vertex(-(x - 100), y);
        vertex(-x, y);
        vertex(-(x - 25) + (getLevel * 6), (y +20)  + (getLevel * 6));
        endShape(CLOSE);
            
        // Side face green
        fill(150, 100, 255);
        beginShape();
        vertex(-(x - 25) + (getLevel * 6), (y +20)  + (getLevel * 6));
        vertex(-x, y);
        vertex(-x , y +55);
        vertex(-(x - 25) + (getLevel * 6), (y +120) + (getLevel * 6));
        endShape(CLOSE);
        pop();
    };
}

  
  

