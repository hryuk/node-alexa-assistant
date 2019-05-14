import { exec } from "child_process";

export default class Shutdown {

    constructor() { }

    run(params) {
        return new Promise((resolve, reject) => {
            console.log("##### Shutdown #####");

            let number = parseInt(params.number);
            let unit_multiplier = 1;
            if (params.unit === 'HOURS') unit_multiplier = 60;
            number *= unit_multiplier;

            exec(`shutdown ${number}`);

            resolve();
        });
    }
}