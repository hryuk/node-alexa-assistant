import Snowboy from 'snowboy';
const Detector = Snowboy.Detector;
const Models = Snowboy.Models;
import config from './config';


export default class HotwordDetector {

    micInstance: any;
    micInputStream: any;

    constructor(micInstance: any) {
        this.micInstance = micInstance;
        this.micInputStream = this.micInstance.getAudioStream();

    }

    detectHotword() {
        return new Promise((resolve, reject) => {
            const models = new Models();

            models.add(config.snowboy.model);

            let detector_config = config.snowboy.detector;
            detector_config.models = models;
            const detector = new Detector(detector_config);

            detector.on('error', () => {
                console.log('error');
                this.micInputStream.unpipe();
                reject();
            });

            detector.on('hotword', (index: any, hotword: any, buffer: any) => {
                this.micInputStream.unpipe();
                resolve();
            });


            this.micInputStream.pipe(detector);

            console.log('Waiting for hotword');
        });
    }
};