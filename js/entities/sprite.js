// creates and returns a sprite object
export default class Sprite {
    constructor(options) {
        this.frames = [0];	// holds the frame indices to draw

        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
        this.frameIndex = 0;
    }

    draw (screen) {

        // draw the background keys
        screen.drawImage(
            this.image,
            0,
            0,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height);

        // draw the keys currently pressed
        for (var i = 0; i < this.frames.length; i++) {
            screen.drawImage(
                this.image,
                this.frames[i] * this.width,
                0,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height);
        }
    }

    update (frameIndices) {
        this.frames = frameIndices;
    }
}
