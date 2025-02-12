let W, H, c, ctx, arr = []

const heart = (x, c, d) => -d*Math.pow(x, 2/3) - c*Math.sqrt(1-x*x)

class Dot {
    constructor(x, y, d) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.r = 1
        this.rad = 3
    }
    getColor() {
        let red = Math.min(255, Math.max(0, 255 - this.rad));
        let blue = Math.min(255, Math.max(0, this.rad * 100));
        return `rgba(${red}, 0, ${blue}, 1)`;
    }
    draw() {
    ctx.beginPath()
    ctx.fillStyle = this.getColor()
    ctx.arc(this.x0, this.y0, this.rad,0,2*Math.PI)
    ctx.fill()
    }
    update() {
        this.x0 = W / 2 + this.d*this.x*this.r
        this.y0 = H / 2 + this.d*this.y*this.r
        this.r+=2
        this.rad = this.rad>0.1?this.rad-=0.02 : this.rad
        this.draw()
    }
}

const newHeart = () => {
    for(let i=0; i<1; i+=0.01){
        let y = heart(i, 1, 1);
        let y1 = heart(i, 1, -1);
        arr.push(new Dot(i, y, 1));
        arr.push(new Dot(-i, y, 1));
        arr.push(new Dot(i, y1, -1));
        arr.push(new Dot(-i, y1, -1));
    }
}

const updateDots = () => {
    for (let i = arr.length - 1; i >= 0; i--){
        arr[i].update();
        if (arr[i].rad < 0.2){
            arr.splice(i, 1);
        }
    }
};

const animate = () => {
    ctx.fillStyle = 'rgba(0,0,0,.15)'
    ctx.fillRect(0, 0, W, H);
    updateDots();
    requestAnimationFrame(animate);
};

const init = () => {
    c = document.getElementById("cnv")
    c.width = W = window.innerWidth;
    c.height = H = window.innerHeight;
    ctx = c.getContext("2d");
    newHeart();
    setInterval(newHeart, 700);
    requestAnimationFrame(animate);
}

//onload = init
window.onload = init;