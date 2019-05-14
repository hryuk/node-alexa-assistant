import path from 'path';

let config = {
    assistant: {
        auth: {
            keyFilePath: path.resolve(__dirname, '../config/client_secret.json'),
            savedTokensPath: path.resolve(__dirname, '../config/tokens.json'),
        },
        conversation: {
            audio: {
                encodingIn: 'LINEAR16',
                sampleRateIn: 16000,
                encodingOut: 'LINEAR16',
                sampleRateOut: 16000,
            },
            lang: 'en-US',
            deviceModelId: ''
        }
    },
    snowboy: {
        model: {
            file: './resources/alexa.umdl',
            sensitivity: '0.6',
            hotwords: 'alexa'
        },
        detector: {
            resource: "./resources/common.res",
            models: null,
            audioGain: 2.0,
            applyFrontend: true,
        }
    },
    speaker: {
        channels: 1,
        bitDepth: 16,
        sampleRate: 16000,
        //device: 'plughw:1,0'
    },
    mic: {
        rate: '16000',
        channels: '1',
        debug: true,
        //device: 'plughw:1,0'
    },
    kodi: {
        address: '127.0.0.1',
        port: 9090
    },
    youtube: {
        api_key: ''
    },
    mqtt: {
        address: 'mqtt://127.0.0.1:1883'
    }
}

export default config;
