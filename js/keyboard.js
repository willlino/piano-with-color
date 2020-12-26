import Game from './entities/game.js';
import { runAnimations } from './animations.js';

export function runPiano(){
	window.onload = function() {
		// we will use the difference of two arrays
		Array.prototype.diff = function(a) {
    		return this.filter(function(i) {return a.indexOf(i) < 0;});
		};

		let game = new Game("canvas");

		runAnimations(game);
	};

};