class Particle {
    constructor(x, y){
        this.position = createVector(x,y);
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
    }

    update(x,y){
        // acceleration = new velocity - previous velocity
      // velocity = new position - previous position
        var newPos = createVector(x,y);
        var newVelocity = p5.Vector.sub(newPos, this.position);
        var newAcceleration = p5.Vector.sub(newVelocity, this.velocity);

        // assign new pos, vel, acc to our variables
        this.position = newPos
        this.velocity = newVelocity
        this.acceleration = newAcceleration;
        // console.log(this.acceleration.x, " ", this.acceleration.y);
    }

    display(){
        fill('red');
        circle(this.position.x, this.position.y, abs(this.acceleration.mag()) * 10);
        fill('pink');
        circle(this.position.x-15, this.position.y, 10);
    }
}