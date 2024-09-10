export class GameLoop {
    constructor(update, render){
        this.lastTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000/60;

        this.update = update;
        this.render = render;

        this.rafId=null;
        this.isRunning = false;
    }


    mainLoop = (timeStamp) => {

        if (!this.isRunning) return;

        let deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;


        // time accumulated since last update
        this.accumulatedTime += deltaTime;


        // if the accumulated time is bigger than the time step
        // we update the game
        while (this.accumulatedTime >= this.timeStep){
            this.update(this.timeStep);
            this.accumulatedTime -= this.timeStep;
        }


        this.render();

        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    start(){
        this.isRunning = true;
        this.rafId = requestAnimationFrame(this.mainLoop);
    }


    stop(){
        if (this.rafId){

            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
}
