import Player from './player.js';
import Keyboarder from './keyboarder.js';
import Sprite from './sprite.js';
import SoundColor from './soundColor.js';


export default class Game {
    constructor(canvasId) {
        var canvas = document.getElementById(canvasId);
        var screen = canvas.getContext('2d');
        var audioCtx = new AudioContext();

        this.gameSize = { x: canvas.width, y: canvas.height };
        this.keyboarder = new Keyboarder();
        this.player = new Player(174.614, 20); // F3 (a) to C5 (enter)

        // piano
        var piano = new Image(2880, 2100);
        this.piano = new Sprite({
            width: 960,
            height: 300,
            image: piano,
        });
        piano.src = "Images/KeyboardSpriteSheet.png";

        var self = this;
        var tick = function () {
            self.update(audioCtx);
            self.draw(screen);
            requestAnimationFrame(tick);
        };
        tick();
    }

    update(audioCtx) {

        // filter keysDown to be only those that map to notes
        this.keyboarder.filter();

        // update piano keyboard sprite
        var frameIndices = this.keyboarder.keysDown.map(function (n) {
            var KEYS = {
                '65': 0, // a
                '87': 1, // w
                '83': 2, // s
                '69': 3, // e
                '68': 4, // d
                '82': 5, // r
                '70': 6, // f
                '71': 7, // g
                '89': 8, // y
                '72': 9, // h
                '85': 10, // u
                '74': 11, // j
                '75': 12, // k
                '79': 13, // o
                '76': 14, // l
                '80': 15, // p
                '186': 16, // ;
                '219': 17, // [
                '222': 18, // '
                '13': 19  // enter
            };
            return KEYS[n] + 1;
        });
        this.piano.update(frameIndices);

        // when a key has just been pressed
        if (this.keyboarder.newKeyDown) {
            for (var i = 0; i < this.keyboarder.keysDown.length; i++) {
                var key = this.keyboarder.keysDown[i]
                var index = this.keyboarder.KEYS[key]

                // start the appropriate oscillators, only if they are not already playing
                if (this.player.oscillators[index] == null) {
                    this.player.start(audioCtx, index);

                    var currentFrequency = this.player.frequencies[index];

                    var noteColorHex = new SoundColor(currentFrequency, this.player).getSoundColorHex();
                    this.setBackgroundColor(noteColorHex.color);
                }
            }
        }

        // when a key has just been lifted
        if (this.keyboarder.newKeyUp) {
            var keyDiffs = this.keyboarder.ALLKEYS.diff(this.keyboarder.keysDown);

            // turn off appropriate oscialltors only if they're already playing
            for (var i = 0; i < keyDiffs.length; i++) {
                var index = this.keyboarder.KEYS[keyDiffs[i]];
                if (this.player.oscillators[index] != null) {
                    this.player.stop(index);
                }
            }
        }

        // to ensure that newKeyDown is true only once when a new key is pressed
        this.keyboarder.newKeyDown = false;
        this.keyboarder.newKeyUp = false;
    }

    draw(screen) {
        this.piano.draw(screen);
    }

    setBackgroundColor(backgroundColor) {
        $('body')[0].animate({
            backgroundColor: [backgroundColor]
        }, {
            duration: 200,
            easing: 'ease-out',
            fill: 'both'
        });
    }
}