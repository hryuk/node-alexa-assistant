const mqtt = require('mqtt');
import config from '../config';

export default class LightOff {

    mqtt_client = null;

    constructor() { }

    run(params) {
        return new Promise((resolve, reject) => {
            console.log("##### Light Off #####");

            this.mqtt_client = mqtt.connect(config.mqtt.address);
            this.mqtt_client.on('connect', () => {
                this.mqtt_client.publish('cmnd/sonoff1/POWER', 'OFF');
            });

            // Asyncronous return to not let the assistant waiting for mqtt connection
            resolve();
        });
    }
}