# Node Alexa Assistant

## Introduction
A simple daemon for runing [Google Assitant Service](https://developers.google.com/assistant/sdk/guides/service/python/) with Snowboy's hotword detection with support for [custom device actions](https://developers.google.com/assistant/sdk/guides/service/python/extend/custom-actions). Only Linux x86_64 is tested.

## Techs behind
+ [snowboy](https://github.com/Kitt-AI/snowboy) Alexa hotword detection
+ [google-assistant](https://github.com/endoplasmic/google-assistant) Google Assistant bindings for node
+ [node-speaker](https://github.com/TooTallNate/node-speaker#readme) Speaker for node
+ [mic](https://github.com/ashishbajaj99/mic2) Microphone for node

# Dependencies
+ For mic ```alsa-base alsa-utils```
+ For node-speaker ```libasound2-dev```
+ For snowboy ```python-pyaudio python3-pyaudio sox libmagic-dev libatlas-base-dev pyaudio```

Snowboy can be tricky to install. Refer to his repo for instructions to build the node module from source [README](https://github.com/kitt-ai/snowboy). Also, note that we are using a [unmerged patch](https://github.com/Kitt-AI/snowboy/pull/537) to allow it to be compiled on Node>8.

## Included custom device actions
+ Change PVR channel in kodi
+ Turn on and off light over mqtt
+ Scheduled shutdown
+ Play youtube query in kodi

## Get it running

To get started, clone the repo to your target directory and install dependencies:

```bash
git clone https://github.com/hzeroo/node-alexa-assistant
cd node-alexa-assistant
yarn install
```

Then, you need to create a google actions project as described here. Name it 'node-alexa-assistant':
https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account



Then, download the credentials .json file from here:
https://console.developers.google.com/apis/credentials?project=node-alexa-assistant&folder&organizationId

And save as 
```
config/client_secret.json
```

To upload the example actions to the project, gactions binary is provided in actions/gactions and commands are linked in package.json. If you didn't name your project 'node-alexa-assistant', you will need to update package.json with the actual project name. Then:
```
yarn update-actions
yarn test-actions
```

Your actions are now uploaded and set to test-mode in the google actions project.

You can now configure a few paremeters in the config file. If you are going to use mqtt, youtube or kodi example actions, proper configuration needs to be provided there. You can also configure the language the assistant will use; note that only english and spanish actions are provided, if you configure the assistant to another language and didn't update the actions, the assistant will not execute them.
```bash
cp config.example.ts config.ts
```

To start the assistant:

```bash
yarn start
```
## Customizing Assitant
Assistant language can be configured in config.ts. Note that custom device actions provided are localized.
You can set google assistant voice in google actions console. It can also be configured on Assistant Android APP if you are using the same account you used to create the project.
Hotword can be configured. You can use any hotword included in /resources (Alexa, Jarvis, Snowboy) by setting in config.ts. Refer to Snowboy's Repo for custom models.

## Customizing actions
A few custom device example actions are provided. Each action is defined in two places. First, a definition for the actions must be set in actions.en.json **AND** actions.es.json. If you only need one language, you must edit package.json actions with proper configuration. Then, in src/actions, the .ts filename must match the pattern 
```typescript
`node-alexa.commands.${execution.command}.ts`
```

Note that you need to update google actions project whenever the json definition is modified:
```
yarn deploy-actions
```

## Troubleshooting

### Audio input/output is not working
Probably because of wrong device setttings.
You can configure mic and speaker device in config.ts with anything valid supported by arecord and aplay, for example:
```typescript
    speaker: {
        channels: 1,
        bitDepth: 16,
        sampleRate: 16000,
        device: 'plughw:0,0'
    },
    mic: {
        rate: '16000',
        channels: '1',
        debug: true,
        device: 'plughw:3,0'
    },
```

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
