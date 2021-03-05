class Ball {
    constructor(x,y,xS, yS){
        this.x = x;
        this.y = y;
        // speed determines direction!
        // positive xSpeed --> right
        // negative xSpeed ---> left
        this.xSpeed = xS;
        // positive ySpeed --> down
        // negative ySpeed --> up
        this.ySpeed = yS;
    }

    move(extraValue){
        // check if ball is hitting a wall
        // || ---> OR
        // && ---> AND
        // ! ---> NOT   !true = false
        if (this.x > width || this.x < 0) {
            // if we're going left, go right
            // if we're going right, go left
            this.xSpeed = -this.xSpeed;
        }
        if (this.y > height || this.y < 0) {
            // if we're going left, go right
            // if we're going right, go left
            this.ySpeed = -this.ySpeed;
        }
        
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.xSpeed += extraValue;
        this.ySpeed += extraValue;
    }

    // this function should only contain methods that impact the drawing
    // stroke(), fill(), circle(), text()
    // no logic here!
    render(){
        fill(255,0,0);
        circle(this.x,this.y, 25);
    }
}