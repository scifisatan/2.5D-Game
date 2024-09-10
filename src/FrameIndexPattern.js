export class FrameIndexPattern{
    constructor(animationConfig){
        this.currentTime = 0;
        this.animationConfig = animationConfig;
        this.duration = animationConfig.duration ?? 500;
    }

    get frame(){
        const {frames} = this.animationConfig;
        for (let i = frames.length - 1; i >= 0; i--) {
            const frame = frames[i];
            if(this.currentTime >= frame.time){
                return frame.frame;
            }
        }
        throw new Error('No frame found');
    }

    step(delta){
        this.currentTime += delta;
        if(this.currentTime > this.duration){
            this.currentTime = 0;
        }
    }
}