let kodi = require('kodi-ws');
import config from "../config";

/* Utility function to stop all active players of a kodi instance */
let stopAllActivePlayers = (connection) => {
    return connection.Player.GetActivePlayers().then((players) => {
        /* Stop everything thats playing */
        return Promise.all(players.map((player) => {
            return connection.Player.Stop(player.playerid);
        }));
    });
};


export default class LightOff {

    mqtt_client = null;

    constructor() { }

    run(params) {
        return new Promise((resolve, reject) => {
            console.log("###### Channel Switch #####");
            kodi(config.kodi.address, config.kodi.port).then(async (connection) => {
                await stopAllActivePlayers(connection);
                await connection.Player.Open({ "item": { "channelid": parseInt(params.number) } });
            });
        });
    }
}