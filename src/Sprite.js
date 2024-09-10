import { Vector2 } from "./Vector2";

export class Sprite {
    constructor({
        resource, // image we want to draw
        frameSize, // size of the crop of the image
        hFrames, // how the sprite is arranged horizontally
        vFrames, // how the sprite is arranged vertically
        frame, // which frame we want to show
        scale, // the scale of the image we want to raw
        position, // where to draw it
        animations,
    }){
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16,16);
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1; 
        this.position = position ?? new Vector2(0,0);
        this.animations = animations ?? {};
        this.buildFrameMap();
    }

    buildFrameMap(){
        let frameCount = 0;
        for (let v = 0; v < this.vFrames; v++){
            for (let h = 0; h < this.hFrames; h++){
                this.frameMap.set(
                    frameCount,
                    new Vector2(h * this.frameSize.x, v * this.frameSize.y)
                )
                frameCount++;
            }
        }
    }

    step(delta){
        if (!this.animations) return;

        this.animations.step(delta);
        this.frame = this.animations.frame;
    }


    drawImage(ctx, x, y){
        if (!this.resource.isLoaded) return;

        let frameCoordX = 0;
        let frameCoordY = 0;

        const frame = this.frameMap.get(this.frame);

        if (frame){
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;

        ctx.drawImage(

            // image we want to draw
            this.resource.image,

            // top left corner of the crop
            frameCoordX, frameCoordY,

            // size of the crop
            frameSizeX, frameSizeY,
            
            // where do we want to place this in canvas
            x, y,
            
            // how large do we want to draw this
            frameSizeX * this.scale,
            frameSizeY * this.scale
        )
    }
}


/*
Example of usage:

const hero = new Sprite({
    resource: resources.images.hero,
    frameSize: [32, 32],
    hFrames: 4,
    vFrames: 4,
    frame: 0,
    scale: 2,
    position: [0, 0]
})

hero.drawImage(ctx, 0, 0)



*/ 