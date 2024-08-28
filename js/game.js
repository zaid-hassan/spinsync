import BallPair from "./ballPair.js";
import Obstacle from "./obstacle.js";

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
        this.mouse = {
            x: undefined,
            y: undefined,
        }
        this.keys = [];

        this.start()

        this.obstaclePool = [];
        this.numberOfObstacles = 20;
        this.obstacleTimer = 0;
        this.obstacleInterval = 500;
        
        this.ballPair = new BallPair(this, this.obstaclePool);
        
        this.createObstacles();

        window.addEventListener('resize', (e) => {
            this.resize(e.target.innerWidth, e.target.innerHeight)
        })
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        })
        window.addEventListener('keydown', (e) => {
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
                console.log(this.keys)
            }
        })
        window.addEventListener('keyup', (e) => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
            console.log(this.keys)
        })
    }

    createObstacles() {
        for (let i = 0; i < this.numberOfObstacles; i++) {
            this.obstaclePool.push(new Obstacle(this, this.ballPair));
        }
    }
    getObstacles() {
        for (let i = 0; i < this.obstaclePool.length; i++) {
            if (this.obstaclePool[i].available) return this.obstaclePool[i];
        }
    }
    handleObstacles(deltatime) {
        if (this.obstacleTimer < this.obstacleInterval) {
            this.obstacleTimer += deltatime;
        } else {
            this.obstacleTimer = 0
            const obstacle = this.getObstacles();
            if (obstacle) obstacle.start()
        }
    }

    calcAim(ax, ay, bx, by) {
        const dx = ax - bx;
        const dy = ay - by;
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance;
        const aimY = dy / distance;
        return [aimX, aimY, dx, dy];
    }
    checkCollision(circleX, circleY, circleR, rectX, rectY, rectWidth, rectHeight) {
        let testX = circleX;
        let testY = circleY;

        if (circleX < rectX) {
            testX = rectX;
        } else if (circleX > rectX + rectWidth) {
            testX = rectX + rectWidth;
        }
        if (circleY < rectY) {
            testY = rectY;
        } else if (circleY > rectY + rectHeight) {
            testY = rectY + rectHeight;
        }
        const distanceX = circleX - testX;
        const distanceY = circleY - testY;
        const distance = Math.hypot(distanceX, distanceY);
        if (distance < circleR) {
            return true;
        } else {
            return false;
        }
    }

    start() {
        this.resize(window.innerWidth, window.innerHeight);
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    render(deltatime) {
        this.handleObstacles(deltatime);
        this.obstaclePool.forEach((obstacle) => {
            obstacle.update();
            obstacle.draw();
        })
        this.ballPair.update()
        this.ballPair.draw();
    }
}