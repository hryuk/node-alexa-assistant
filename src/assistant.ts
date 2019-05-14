import GoogleAssistant from 'google-assistant';
import Speaker from './speaker';
import { EventEmitter } from 'events';
import config from './config';

export default class Assistant extends EventEmitter {

    micInstance: any;
    micInputStream: any;
    assistant: any;
    speaker: any;
    continueConversation: boolean;
    _callback: any;

    constructor(micInstance: any) {
        super();
        this.micInstance = micInstance;
        this.micInputStream = micInstance.getAudioStream();
        this.assistant = null;
        this.speaker = new Speaker();
        this.continueConversation = false;

        this.speaker.on('open', () => {
            console.log('==== ASSISTANT SPEAKING ... ====');
        });

        this.speaker.on('ended', () => {
            console.log('==== ASSISTANT ENDED SPEAKING ====');
            if (this.continueConversation) {
                this.continueConversation = false;
                this.assistant.start(config.assistant.conversation);
            }
        });

    }

    startAssistant(callback: any) {

        this._callback = callback;

        const startConversation = (conversation: any) => {
            conversation
                .on('audio-data', (data: any) => {
                    this.speaker.write(data);
                })
                .on('end-of-utterance', () => {
                    this.micInputStream.unpipe();
                })
                .on('transcription', (data: any) => console.log('Transcription:', data.transcription, ' --- Done:', data.done))
                .on('response', (text: any) => console.log('Assistant Text Response:', text))
                .on('volume-percent', (percent: any) => console.log('New Volume Percent:', percent))
                .on('device-action', action => {
                    action.inputs.forEach(input => {
                        input.payload.commands.forEach(command => {
                            command.execution.forEach(async execution => {
                                try {
                                    let Action = await import(`./actions/${execution.command}`);
                                    await new Action.default().run(execution.params);
                                } catch (err) {
                                    console.log(`Error executing action '${execution.command}'`);
                                    console.log(err);
                                }
                            });
                        });
                    });
                }
                )
                .on('ended', (error: any, continueConversation: any) => {
                    if (error) {
                        console.log('Conversation Ended Error:', error);
                        callback();
                    }
                    else if (continueConversation) {
                        this.continueConversation = true;
                        console.log('Continue Conversation');
                    }
                    else {
                        console.log('Conversation Complete');
                        this._callback();
                    }
                })
                .on('error', (error: any) => {
                    this.micInputStream.unpipe();
                    console.log('Conversation Error:', error);
                    callback();
                });

            console.log('Assistant started');

            this.micInputStream.pipe(conversation);
        }

        this.assistant = new GoogleAssistant(config.assistant.auth);
        this.assistant
            .on('ready', () => {
                this.assistant.start(config.assistant.conversation);
            })
            .on('started', startConversation)
            .on('error', (error: any) => {
                console.log('Assistant Error:', error);
            });
    }
}

