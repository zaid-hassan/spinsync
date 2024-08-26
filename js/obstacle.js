export default class Obstacle {
    constructor(game, ballPair) {
        this.game = game;
        this.ballPair = ballPair;

        this.radius = this.ballPair.radius;

        this.width = Math.floor(Math.random() * (3 * this.radius - 1.5 * this.radius) + 1.5 * this.radius);
        this.height = Math.floor(Math.random() * (6 * this.radius - 4 * this.radius) + 4 * this.radius);

        this.x = Math.floor(Math.random() * (this.game.width - this.width));

        this.y = -this.height;

        this.speedY = 5;
        this.available = true;
    }

    start() {
        this.available = false;
        this.x = Math.floor(Math.random() * (this.game.width - this.width));
        this.y = -this.height;
    }

    reset() {
        this.available = true;
    }

    update() {
        if (!this.available) {
            this.y += this.speedY;
            if (this.y > this.game.height) {
                this.reset();
            }
        }
    }

    draw() {
        if (!this.available) {
            this.game.ctx.beginPath();
            this.game.ctx.fillStyle = '#FFFF00';
            this.game.ctx.rect(this.x, this.y, this.width, this.height);
            this.game.ctx.fill();
        }
    }
}
