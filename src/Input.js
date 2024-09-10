export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

export class Input{
    constructor(){

        this.heldDirections = [];

        document.addEventListener('keydown', (e) => {
                switch (e.key) {
                case 'w':
                case 'ArrowUp':
                    this.onArrowPressed(UP);
                    break;
                case 'a':
                case 'ArrowLeft':
                    this.onArrowPressed(LEFT);
                    break;
                case 's':
                case 'ArrowDown':
                    this.onArrowPressed(DOWN);
                    break;
                case 'd':
                case 'ArrowRight':
                    this.onArrowPressed(RIGHT);
                    break;
            }
        })

        document.addEventListener('keyup', (e) => {
            switch (e.key) {
            case 'w':
            case 'ArrowUp':
                this.onArrowReleased(UP);
                break;
            case 'a':
            case 'ArrowLeft':
                this.onArrowReleased(LEFT);
                break;
            case 's':
            case 'ArrowDown':
                this.onArrowReleased(DOWN);
                break;
            case 'd':
            case 'ArrowRight':
                this.onArrowReleased(RIGHT);
                break;
        }
    })


    }

    get direction(){
        return this.heldDirections[0];
    }

    onArrowPressed(direction){
        if (this.heldDirections.indexOf(direction) === -1){
        this.heldDirections.unshift(direction);
        }
    }

    onArrowReleased(direction){
        const index = this.heldDirections.indexOf(direction);
        if (index === -1){
           return;
        }
        this.heldDirections.splice(index, 1);
    }
}