export default class Obstacle {
    constructor(game) {
        this.game = game;
        this.width = Math.floor(Math.random() * this.game.width / 3) + this.game.width / 10;
        this.height = Math.floor(Math.random() * this.game.height / 10) + this.game.height / 50;
        this.x = Math.floor(Math.random() * this.game.width);
        this.y = -this.height;
        this.speedY = 5;
        this.available = true;
    }
    start() {
        this.available = false;
        this.x = Math.floor(Math.random() * this.game.width);
        this.y = -this.height;
    }
    reset() {
        this.available = true;
    }
    update() {
        if (!this.available) {
            this.y += this.speedY;
            if (this.y > this.game.height) this.reset()
        }
    }
    draw() {
        if (!this.available) {
            this.game.ctx.beginPath();
            this.game.ctx.fillStyle = 'white';
            this.game.ctx.rect(this.x, this.y, this.width, this.height);
            this.game.ctx.fill();
        }
    }
}