class CircleBassVisual {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.r = Math.random()*255;
        this.g = Math.random()*255;
        this.b = Math.random()*255;
        this.r2 = Math.random()*255;
        this.g2 = Math.random()*255;
        this.b2 = Math.random()*255;
        this.radius = 50.0;
        this.color = getRandomColor();
        this.bassColor;
        this.circles = [];
        this.myCircle;
    }

    draw(t, dt) {

        //Background
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

        let random_scalar = 2;
        //Change this.color slowly
        if (Math.random() > .5) {
            this.r += Math.random()*random_scalar;
        }
        else {
            this.r -= Math.random()*random_scalar;
        }
        if (Math.random() > .5) {
            this.g += Math.random()*random_scalar;
        }
        else {
            this.g -= Math.random()*random_scalar;
        }
        if (Math.random() > .5) {
            this.b += Math.random()*random_scalar;
        }
        else {
            this.b -= Math.random()*random_scalar;
        }
        if (Math.random() > .5) {
            this.r2 += Math.random()*random_scalar;
        }
        else {
            this.r2 -= Math.random()*random_scalar;
        }
        if (Math.random() > .5) {
            this.g2 += Math.random()*random_scalar;
        }
        else {
            this.g2 -= Math.random()*random_scalar;
        }
        if (Math.random() > .5) {
            this.b2 += Math.random()*random_scalar;
        }
        else {
            this.b2 -= Math.random()*random_scalar;
        }

        this.color = "rgb("+this.r+","+this.g+","+this.b+")";

        //Random Circle
        this.myCircle = new Circle((Math.random() * 4000 + 1000) / Math.abs(getAverageFreq()));
        this.circles.push(this.myCircle);
        for (let i=0; i<this.circles.length; i++) {
            this.circles[i].refresh(this);
            this.circles[i].draw();
        }

        //Bass Circle
        this.radius = 15000 / Math.abs(getAverageBassFreq());
        this.bassColor = "rgb("+this.r2+","+this.g2+","+this.b2+")";
        ctx.fillStyle = this.bassColor;
        ctx.beginPath();
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, this.radius, 0, Math.PI * 2, false);
        ctx.fill();

    }

    removeCircle(c) {
        for (let i=0; i<this.circles.length; i++) {
            if (this.circles[i] == c) {
                this.circles.splice(i,i+1);
            }
        }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Circle {
    constructor(radius) {
        this.x = Math.random() * canvas.clientWidth;
        this.y = Math.random() * canvas.height;
        this.color = getRandomColor();
        this.radius = radius;
    }

    getRadius() {
        return this.radius;
    }

    setRadius(rad) {
        this.radius = rad;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    refresh(circleBass) {
        
        this.radius -= .3;
        if(this.radius <= 0.0) {
            circleBass.removeCircle(this);
            return;
        }
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

}