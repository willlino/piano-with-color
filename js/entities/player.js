export default class Player {

    constructor(startingPitch, numNotes) {
        this.startingPitch = startingPitch;
        this.numNotes = numNotes;
        this.frequencies = [];
        this.oscillators = [];

        for (var i = 0; i < numNotes; i++) {
            this.frequencies.push(startingPitch * Math.pow(2, i / 12));
        }

        for (var i = 0; i < this.oscillators.length; i++) {
            this.oscillators.push(null);
        }
    }

    newOscillator(audioCtx, frequency) {
        var oscillator = audioCtx.createOscillator();
        oscillator.frequency.value = frequency;
        oscillator.connect(audioCtx.destination);
        return oscillator;
    }

    start(audioCtx, index) {
        this.oscillators[index] = this.newOscillator(audioCtx, this.frequencies[index]);
        this.oscillators[index].start(0);
    }

    stop(index) {
        this.oscillators[index].stop();
        this.oscillators[index] = null;
    }

}

