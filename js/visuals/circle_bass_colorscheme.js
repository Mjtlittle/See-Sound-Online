class CircleBassColorSchemeVisual {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius;
        this.color;
        this.circles = [];
        this.myCircle;
    }

    draw(t, dt) {

        let theme = get_theme();
        this.color = theme.get_color(1/4);
        //Background
        ctx.fillStyle = theme.get_color(2/4);
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

        //Random Circle
        this.myCircle = new CircleColorScheme((Math.random() * 4000 + 1000) / Math.abs(getAverageFreq()), theme.get_color(Math.round(Math.random() + 3)/4));
        this.circles.push(this.myCircle);
        for (let i=0; i<this.circles.length; i++) {
            this.circles[i].refresh(this);
            this.circles[i].draw();
        }

        //Bass Circle
        this.radius = 15000 / Math.abs(getAverageBassFreq());
        this.bassColor = theme.get_color(1/4);
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

class CircleColorScheme {
    constructor(radius, color) {
        this.x = Math.random() * canvas.clientWidth;
        this.y = Math.random() * canvas.height;
        this.color = color;
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