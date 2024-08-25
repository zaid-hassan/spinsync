import Obstacle from "./obstacle.js";

export default class Game {
    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
        this.mouse = {
            x: undefined,
            y: undefined,
        }

        this.start()

        this.obstaclePool = [];
        this.numberOfObstacles = 20;
        this.obstacleTimer = 0;
        this.obstacleInterval = 500;
        this.createObstacles();
        console.log(this.obstaclePool)

        window.addEventListener('resize', (e) => {
            this.resize(e.target.innerWidth, e.target.innerHeight)
        })
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        })
    }

    createObstacles () {
        for (let i = 0; i < this.numberOfObstacles; i++) {
            this.obstaclePool.push(new Obstacle(this));
        }
    }
    getObstacles () {
        for (let i = 0; i < this.obstaclePool.length; i++) {
            if (this.obstaclePool[i].available) return this.obstaclePool[i];
        }
    }
    handleObstacles (deltatime) {
        if (this.obstacleTimer < this.obstacleInterval) {
            this.obstacleTimer += deltatime;
        } else {
            this.obstacleTimer = 0
            const obstacle = this.getObstacles();
            if (obstacle) obstacle.start()
        }
    }

    start () {
        this.resize(window.innerWidth, window.innerHeight);
    }
    resize (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    render (deltatime) {
        this.handleObstacles(deltatime);
        this.obstaclePool.forEach((obstacle) => {
            obstacle.update();
            obstacle.draw();
        })
    }
}