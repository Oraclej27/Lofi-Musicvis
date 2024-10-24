//Function to draw particles. 
function ParticlePattern() {
    this.name = "particlepattern";
    this.burstSize = 50;
    this.minSize= 2;
    this.maxSize = 10;
    this.minSpeed = 1;
    this.maxSpeed = 3; 

    let maxRadius;
    // how many layers of particles there are . I wanted to ceate depth. also maxradius defined, and make sure to call maxRadius
    //again after window resize. 
    const layers = 3;
    function calculateMaxRadius() {
        maxRadius = Math.min(windowWidth, windowHeight);
    }
    calculateMaxRadius(); 
    windowResized(() => {
        calculateMaxRadius();
    });
    
    // This code is written from online video and web sources and has been tweaked or changed to fit my idea. 
    function Particle(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.angle = Math.random() * 2 * Math.PI;
    }
    // this code and for loop is to create the diffeent size and speed of each layer and how many particles each layer will have. 
    // it was written in combination with video tutorial and information from the course and music template. 
    let particles = [];
    let burstParticles = [];

    for (let layer = 0; layer < layers; layer++) {
        particles[layer] = [];
        const numParticles = 40 * (layer + 1);

        for (let i = 0; i < numParticles; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const x = width /2+ Math.cos(angle) * Math.random() * maxRadius;
            const y = height /2 + Math.sin(angle) * Math.random() * maxRadius;
            const size = Math.random() * 3 + 1 * (layer + 1);
            const speed = Math.random() * 2 + 1;

            particles[layer].push(new Particle(x, y, size, speed));
        }
    }
    // for the draw fuction I recieved help from peers.Most of this section uses seggestions from classmates 
    //and I changed a few values and re-wrote the code for learning purposes. 
    // This section uses constants and arrays from the above section to draw the particles. 
    this.draw = function () {
        push();
        image(backgroundImages[3], 0, 0, width, height);
        colorMode(HSB, 360, 250, 300);
        noStroke();
        //spectrum value
        let spectrum = fourier.analyze();
        
        //loop through layers 
        for (let layer = 0; layer < layers; layer++) {

            fill(60, 200, 300);// set particle color
            //loop through particles 
            for (let i = 0; i < particles[layer].length; i++) {
            // get refrence from current particle
                const p = particles[layer][i];
                // draw ellipse 
                ellipse(p.x, p.y, p.size);

                //calculate spectrum and get values
                const spectrumIndex = Math.floor(map(i, 0, particles[layer].length, 0, spectrum.length - 1));
                const fftValue = spectrum[spectrumIndex];
                const angleChange = map(fftValue, 0, 255, -Math.PI, Math.PI);
                p.angle += angleChange; 
                // particle position 
                p.x += Math.cos(p.angle) * p.speed;
                p.y += Math.sin(p.angle) * p.speed;
                
            }
        }
    
        //create bass burst
        var bassFrequency = fourier.getEnergy("bass");
        if (Math.floor(bassFrequency) == bassFrequency && bassFrequency > 220) {
            for (let i = 0; i < this.burstSize; i++) {
                const x = width * 0.8; 
                const y = height * 0.3; 
                const size = random(this.minSize, this.maxSize);
                const speed = random(this.minSpeed, this.maxSpeed);
                const angle = random(TWO_PI);
                burstParticles.push(new Particle(x, y, size, speed, angle));
            }
        }
        
        //draw burst particles
        fill(180, 250, 300); 
        for (let i = 0; i < burstParticles.length; i++) {
            const p = burstParticles[i];
            ellipse(p.x, p.y, p.size);
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            if (dist(p.x, p.y, width / 2, height / 2) > maxRadius) {
                burstParticles.splice(i, 1); // To burst particles when they move too far
            }
        }
        // added forground image
        image(backgroundImages[6], 0, 0, width, height);
        pop();
    };
}
