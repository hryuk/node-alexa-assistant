const _Speaker = require('speaker');
import { EventEmitter } from 'events';
import config from './config';


export default class Speaker extends EventEmitter {

    speaker = null;
    openTime = 0;
    responseLength = 0;
    _timer = null;

    constructor() {
        super();

        this.speaker = new _Speaker(config.speaker);

        this.speaker.on('open', () => {
            this.open();
        });
    }

    open() {
        this.responseLength = 0;
        this.openTime = new Date().getTime();
        this.emit('open');
    }

    write(data) {
        this.speaker.write(data);
        const now = new Date().getTime();

        this.responseLength += data.length;
        const audioTime = this.responseLength / (config.speaker.sampleRate * 16 / 8) * 1000;

        clearTimeout(this._timer);

        this._timer = setTimeout(() => {
            this.speaker = new _Speaker(config.speaker);

            this.speaker.on('open', () => {
                this.open();
            });

            this.emit('ended');

        }, audioTime - Math.max(0, now - this.openTime));
    }
};