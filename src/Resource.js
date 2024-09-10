class Resources {
    constructor() {

        // List of every image we plan to use
        this.toLoad = {
            sky: '/sprites/sky.png',
            ground: '/sprites/ground.png',
            hero: '/sprites/hero-sheet.png',
            shadow: '/sprites/shadow.png',
        }
        
        // List to keep all the images we will use
        this.images = {};
        
        // Load all the images with functionality to check is loaded or not
        Object.keys(this.toLoad).forEach((key) => {
            const img =  new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            };
            img.onload = () => {

                this.images[key].isLoaded = true;
            }
            img.onerror = (error) => {
                this.images[key].error = error;
                console.error(`Error loading image ${key}:`, error);
            };
        })
    }
}

export const resources = new Resources();