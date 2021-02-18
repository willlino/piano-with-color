export default class SoundColor {
    constructor(soundFrequency, player) {
        this.notes = [
            { color: '#FF0000', index: 0 },
            { color: '#FF4D00', index: 1 },
            { color: '#FF9900', index: 2 },
            { color: '#FFCC00', index: 3 },
            { color: '#FFFF00', index: 4 },
            { color: '#00aa00', index: 5 },
            { color: '#009180', index: 6 },
            { color: '#0077FF', index: 7 },
            { color: '#2B3CC4', index: 8 },
            { color: '#550088', index: 9 },
            { color: '#910099', index: 10 },
            { color: '#cc00aa', index: 11 }
        ];

        this.soundFrequency = soundFrequency;
        this.startingPitch = player.startingPitch;
    }

    getSoundColorHex(){
        return this.notes.find(note => note.index === this.getIndexNote() || note.index === this.getIndexNote() % 12);
    }

    customLog(val, base) {
        return Math.log(val) / Math.log(base);
    }

    getIndexNote() {
        var indexNote = 12 * this.customLog(this.soundFrequency, 2) - 12 * this.customLog(this.startingPitch, 2);
        return Math.round(indexNote);
    }
}