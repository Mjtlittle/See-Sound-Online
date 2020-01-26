class SplashScreen {
    constructor() {
        this.color = [100,100,100];
     }

    draw(d, dt) {

        if(Math.random()>.5){this.color[0]+=1;}else{this.color[0]-=1;}
        if(Math.random()>.5){this.color[1]+=1;}else{this.color[1]-=1;}
        if(Math.random()>.5){this.color[2]+=1;}else{this.color[2]-=1;}

        ctx.fillStyle = 'rgb('+this.color[0]+','+this.color[1]+','+this.color[2]+')';
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

        ctx.font = '40px Arial Black';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Welcome to See Sound Online!',canvas.clientWidth/2,canvas.height/4);
        ctx.textAlign = 'left';
        ctx.fillText('< Click the left side\nto switch color schemes.',20,canvas.height*.55);
        ctx.textAlign = 'right';
        ctx.fillText('Click the right side\nto switch visualizers. >', canvas.clientWidth-100,canvas.height*.7);

    }
}