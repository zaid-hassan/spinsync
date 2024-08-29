export default class BallPair {
    constructor(game, obstaclePool) {
        this.game = game;
        this.obstaclePool = obstaclePool;

        // this.radius = this.game.width * .05; // 1% of game width
        this.radius = 20;
        // this.distance = this.game.width * .40; // 15% of game width
        this.distance = this.radius * 7;

        this.originX = this.game.width * .5 - this.distance * .5 + this.distance * .5; // 50% of game width minus 50% of distance aligns the origin to center of screen
        this.originY = this.game.height - this.distance * .9;

        this.redBallX = this.originX - this.distance * .5;
        this.redBallY = this.originY;
        this.blueBallX = this.originX + this.distance * .5;
        this.blueBallY = this.originY;

        this.angle = 0;
        this.rotationalSpeed = 0.05;

        this.available = false;
    }
    start() {
        this.available = false;
    }
    reset() {
        this.available = true;
    }
    update() {
        if (!this.available) {
            // Handle keyboard input
            if (this.game.keys.includes('ArrowLeft')) this.angle -= this.rotationalSpeed; // Rotate to left
            if (this.game.keys.includes('ArrowRight')) this.angle += this.rotationalSpeed; // Rotate to right

            // Handle touch input
            if (this.game.touch.x !== undefined) {
                if (this.game.touch.x > this.game.width / 2) {
                    this.angle += this.rotationalSpeed; // Rotate to the right
                } else if (this.game.touch.x < this.game.width / 2) {
                    this.angle -= this.rotationalSpeed; // Rotate to the left
                }
            }

            const cosAngle = Math.cos(this.angle);
            const sinAngle = Math.sin(this.angle);

            // Update ball positions based on the new angle
            this.redBallX = this.originX + this.distance * 0.5 * cosAngle;
            this.redBallY = this.originY + this.distance * 0.5 * sinAngle;
            this.blueBallX = this.originX - this.distance * 0.5 * cosAngle;
            this.blueBallY = this.originY - this.distance * 0.5 * sinAngle;


            this.obstaclePool.forEach(obstacle => {
                if (!obstacle.available) {
                    const collisionRed = this.game.checkCollision(this.redBallX, this.redBallY, this.radius, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
                    const collisionBlue = this.game.checkCollision(this.blueBallX, this.blueBallY, this.radius, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

                    if (collisionRed || collisionBlue) {
                        this.reset()
                    }
                }
            })
        }
    }
    draw() {
        if (!this.available) {
            this.game.ctx.beginPath();
            this.game.ctx.fillStyle = '#00FFFF';
            this.game.ctx.arc(this.redBallX, this.redBallY, this.radius, 0, Math.PI * 2, true);
            this.game.ctx.fill()

            this.game.ctx.beginPath();
            this.game.ctx.fillStyle = '#BFFF00';
            this.game.ctx.arc(this.blueBallX, this.blueBallY, this.radius, 0, Math.PI * 2, true);
            this.game.ctx.fill()

            // this.game.ctx.beginPath();
            // this.game.ctx.strokeStyle = '#00FFFF';
            // this.game.ctx.arc(this.originX, this.originY, this.distance / 2, 0, Math.PI * 2, true);
            // this.game.ctx.stroke()
        }
    }
}