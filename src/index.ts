import HotwordDetector from './hotword-detector';
import Assistant from './assistant';
import config from './config';

import mic from 'mic';
import wav from 'wav';
import fs from 'fs';
import _Speaker from 'speaker';

let micInstance = mic(config.mic);
micInstance.start();

const startDetection = async () => {
    const hotwordDetector = new HotwordDetector(micInstance);
    while (await hotwordDetector.detectHotword()) {
        let file = fs.createReadStream('resources/ding.wav');
        let reader = new wav.Reader();
        reader.on('format', (format: any) => {
            reader.pipe(new _Speaker(config.speaker));
        });

        file.pipe(reader);

        const assistant = new Assistant(micInstance);
        await assistant.startAssistant();
    }
}

startDetection();