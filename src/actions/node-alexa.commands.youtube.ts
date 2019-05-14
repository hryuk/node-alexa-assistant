let Youtube = require('youtube-node');
let kodi = require('kodi-ws');
let youtube = new Youtube();
import config from '../config';
youtube.setKey(config.youtube.api_key);

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
            console.log("###### Youtube #####");
            youtube.addParam('type', 'video');
            youtube.search(params.query, 1, (error, result) => {
                if (error) {
                    reject();
                }
                else {
                    if (result && result.items && result.items[0] && result.items[0].id && result.items[0].id.videoId) {

                        let videoid = result.items[0].id.videoId;
                        console.log(`Playing ${videoid}`);

                        kodi(config.kodi.address, config.kodi.port).then(async (connection) => {
                            await stopAllActivePlayers(connection);
                            await connection.Player.Open({
                                item: {
                                    file: `plugin://plugin.video.youtube/?action=play_video&videoid=${videoid}`
                                }
                            });

                            resolve();
                        });
                    } else reject();
                }
            });
        });
    }
}