import Game from "./game.js";

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const game = new Game(canvas, ctx);
    
    let lastTimeStamp = 0;
    function animation (timeStamp) {
        const deltatime = timeStamp - lastTimeStamp;
        lastTimeStamp = timeStamp;
        console.log(deltatime)
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render(deltatime)
        requestAnimationFrame(animation)
    }

    requestAnimationFrame(animation)
})