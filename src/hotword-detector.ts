const Detector = require('snowboy').Detector;
const Models = require('snowboy').Models;
import { EventEmitter } from 'events';
import config from './config';


export default class HotwordDetector extends EventEmitter {

    micInstance: any;
    micInputStream: any;

    constructor(micInstance: any) {
        super();
        this.micInstance = micInstance;
        this.micInputStream = this.micInstance.getAudioStream();

    }

    detectHotword() {

        const models = new Models();

        models.add(config.snowboy.model);

        let detector_config = config.snowboy.detector;
        detector_config.models = models;
        const detector = new Detector(detector_config);

        detector.on('error', () => {
            console.log('error');
            this.micInputStream.unpipe();
        });

        detector.on('hotword', (index: any, hotword: any, buffer: any) => {
            this.micInputStream.unpipe();
            this.emit('hotword');
        });


        this.micInputStream.pipe(detector);

        console.log('Waiting for hotword');
    }
};