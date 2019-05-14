# Node Alexa Assistant

## Introduction
A simple daemon for runing [Google Assitant Service](https://developers.google.com/assistant/sdk/guides/service/python/) with Snowboy's hotword detection with support for [custom device actions](https://developers.google.com/assistant/sdk/guides/service/python/extend/custom-actions).

## Techs behind
+ [snowboy](https://github.com/Kitt-AI/snowboy) Alexa hotword detection
+ [google-assistant](https://github.com/endoplasmic/google-assistant) Google Assistant bindings for node
+ [node-sepeaker](https://github.com/TooTallNate/node-speaker#readme) Speaker for node
+ [mic](https://github.com/ashishbajaj99/mic2) Microphone for node

## Included custom device actions
+ Change pvr channel in kodi
+ Turn on and off lights over mqtt
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

And save it in 
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
## Customizing actions
A few custom device example actions are provided. Each action is defined in two places. First, a definition for the actions must be set in actions.en.json **AND** actions.es.json. If you only need one language, you must edit package.json actions with proper configuration. Then, in src/actions, the .ts filename must match the pattern 
```typescript
`node-alexa.commands.${execution.command}.ts`
```

Note that you need to update google actions project whenever the json definition is modified:
```
yarn deploy-actions
```

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.