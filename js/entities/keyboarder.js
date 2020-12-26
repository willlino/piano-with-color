export default class Keyboarder {
    constructor() {
        this.ALLKEYS = [65, 87, 83, 69, 68, 82, 70, 71, 89, 72, 85, 74, 75, 79, 76, 80, 186, 219, 222, 13];
        this.KEYS = {'65' : 0, // a
                     '87' : 1, // w
                     '83' : 2, // s
                     '69' : 3, // e
                     '68' : 4, // d
                     '82' : 5, // r
                     '70' : 6, // f
                     '71' : 7, // g
                     '89' : 8, // y
                     '72' : 9, // h
                     '85' : 10, // u
                     '74' : 11, // j
                     '75' : 12, // k
                     '79' : 13, // o
                     '76' : 14, // l
                     '80' : 15, // p
                     '186' : 16, // ;
                     '219' : 17, // [
                     '222' : 18, // '
                     '13' : 19  // enter
                      };
    
        // the list of all keys currently being held down
        this.keysDown = [];
        this.newKeyDown = false;
        this.newKeyUp = false;
    
        // event listeners for keyboard input
        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));
    }

    keyDown(event) {
        if (this.keysDown.indexOf(event.keyCode) === -1) {
            this.keysDown.push(event.keyCode);
            this.newKeyDown = true;
        }
    }

    keyUp(event) {
        var index = this.keysDown.indexOf(event.keyCode);
        if (index > -1) {
            this.keysDown.splice(index, 1);
            this.newKeyUp = true;
        }
    }

    filter() {
        var isInArray = function(array) {
            return function(e) {
                return array.indexOf(e) > -1;
            };
        };

        var isInAllKeys = isInArray(this.ALLKEYS);

        this.keysDown = this.keysDown.filter(isInAllKeys);
    }
}