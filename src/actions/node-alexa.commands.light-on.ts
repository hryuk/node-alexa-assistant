const mqtt = require('mqtt');
import config from '../config';

export default class LightOn {

    mqtt_client = null;

    constructor() { }

    run(params) {
        return new Promise((resolve, reject) => {
            console.log("##### Light On #####");

            this.mqtt_client = mqtt.connect(config.mqtt);
            this.mqtt_client.on('connect', () => {
                this.mqtt_client.publish('cmnd/sonoff1/POWER', 'ON');
            });

            // Asyncronous return to not let the assistant waiting for mqtt connection
            resolve();
        });
    }
}