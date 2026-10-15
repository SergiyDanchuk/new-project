import React, { Component } from 'react';
import { GAME } from '../GAME';
import { Models } from '../models/Models';

// Deep readonly utility type for React components
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface audioToggleProps {
    models: DeepReadonly<Models>;
}

interface audioToggleState {
    isMuted: boolean;
}

export default class AudioToggle extends Component<audioToggleProps, audioToggleState> {

    constructor(props: audioToggleProps) {
        super(props);
        this.state = {
            isMuted: !props.models.progress.playWithSound // Start based on user choice
        };

        // Listen for audio toggle events to update state
    }
    componentDidMount(): void {
        GAME.events.audioToggle.add(this.handleAudioToggle.bind(this));
        GAME.events.enableSound.add(this.handleEnableSound.bind(this));
    }

    handleAudioToggle = () => {
        // Toggle the mute state
        this.setState({ isMuted: !this.state.isMuted });
    }

    handleEnableSound = (enableSound: boolean) => {
        // Update mute state based on sound enabled choice
        this.setState({ isMuted: !enableSound });
    }

    render() {
        const { isMuted } = this.state;
        const audioClass = isMuted
            ? "burger-menu__audio-toggle burger-menu__audio-toggle--muted"
            : "burger-menu__audio-toggle burger-menu__audio-toggle--unmuted";

        return (
            <div className="burger-menu__audio-controls">
                <div className={audioClass} onClick={() => GAME.events.audioToggle.dispatch()}>
                    {isMuted ? '🔇' : '🔊'}
                </div>

                {!isMuted && (
                    <>
                        <div className="burger-menu__volume-up" onClick={() => GAME.events.volumeUp.dispatch()}>
                            ➕
                        </div>
                        <div className="burger-menu__volume-down" onClick={() => GAME.events.volumeDown.dispatch()}>
                            ➖
                        </div>
                    </>
                )}
            </div>
        );
    }
}
