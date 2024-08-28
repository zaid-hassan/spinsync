export default class BallPair {
    constructor(game, obstaclePool) {
        this.game = game;
        this.obstaclePool = obstaclePool;

        // this.radius = this.game.width * .05; // 1% of game width
        this.radius = 25;
        // this.distance = this.game.width * .40; // 15% of game width
        this.distance = this.radius * 7;

        this.originX = this.game.width * .5 - this.distance * .5 + this.distance * .5; // 50% of game width minus 50% of distance aligns the origin to center of screen
        this.originY = this.game.height - this.distance * .9;

        this.redBallX = this.originX - this.distance * .5;
        this.redBallY = this.originY;
        this.blueBallX = this.originX + this.distance * .5;
        this.blueBallY = this.originY;

        this.aim;
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
            if (this.game.keys.includes('ArrowLeft')) this.angle -= this.rotationalSpeed;
            if (this.game.keys.includes('ArrowRight')) this.angle += this.rotationalSpeed;

            const cosAngle = Math.cos(this.angle);
            const sinAngle = Math.sin(this.angle);
            console.log(cosAngle, sinAngle)

            this.redBallX = this.originX + this.distance * 0.5 * cosAngle;
            this.redBallY = this.originY + this.distance * 0.5 * sinAngle;
            this.blueBallX = this.originX - this.distance * 0.5 * cosAngle;
            this.blueBallY = this.originY - this.distance * 0.5 * sinAngle;


            // this.aim = this.game.calcAim(this.game.mouse.x, this.game.mouse.y, this.originX, this.originY);
            // this.redBallX = this.originX + this.distance * .5 * this.aim[0];
            // this.redBallY = this.originY + this.distance * .5 * this.aim[1];
            // this.blueBallX = this.originX + this.distance * .5 * this.aim[0] * -1;
            // this.blueBallY = this.originY + this.distance * .5 * this.aim[1] * -1;
            this.obstaclePool.forEach(obstacle => {
                if (!obstacle.available) {
                    const collisionRed = this.game.checkCollision(this.redBallX, this.redBallY, this.radius, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
                    const collisionBlue = this.game.checkCollision(this.blueBallX, this.blueBallY, this.radius, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

                    if (collisionRed || collisionBlue) {
                        console.log('collision')
                        this.reset()
                    }
                }
            })
        }
    }
    draw() {
        if (!this.available) {
            this.game.ctx.beginPath();
            this.game.ctx.fillStyle = '#FF0000';
            this.game.ctx.arc(this.redBallX, this.redBallY, this.radius, 0, Math.PI * 2, true);
            this.game.ctx.fill()

            this.game.ctx.beginPath();
            this.game.ctx.fillStyle = '#00FFFF';
            this.game.ctx.arc(this.blueBallX, this.blueBallY, this.radius, 0, Math.PI * 2, true);
            this.game.ctx.fill()

            this.game.ctx.beginPath();
            this.game.ctx.strokeStyle = 'black';
            this.game.ctx.arc(this.originX, this.originY, this.distance / 2, 0, Math.PI * 2, true);
            this.game.ctx.stroke()
        }
    }
}