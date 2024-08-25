export default class BallPair {
    constructor(game) {
        this.game = game;

        // this.radius = this.game.width * .05; // 1% of game width
        this.radius = 25; // 1% of game width
        // this.distance = this.game.width * .40; // 15% of game width
        this.distance = this.radius * 7 ; // 15% of game width

        this.originX = this.game.width * .5 - this.distance * .5 + this.distance * .5; // 50% of game width minus 50% of distance aligns the origin to center of screen
        this.originY = this.game.height - this.distance * .55; 

        this.redBallX = this.originX - this.distance * .5;
        this.redBallY = this.originY;
        this.blueBallX = this.originX + this.distance * .5;
        this.blueBallY = this.originY;
    }
    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.arc(this.redBallX, this.redBallY, this.radius, 0, Math.PI * 2, true);
        this.game.ctx.fill()

        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = 'blue';
        this.game.ctx.arc(this.blueBallX, this.blueBallY, this.radius, 0, Math.PI * 2, true);
        this.game.ctx.fill()

        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = 'black';
        this.game.ctx.arc(this.originX, this.originY, this.distance / 2, 0, Math.PI * 2, true);
        this.game.ctx.stroke()
    }
}