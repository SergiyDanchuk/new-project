import { State } from "../State";
import { GAME } from "../../GAME";
import { GameState } from "./StateDefinitions";
import { AssetLoad } from "../blocks/setup/AssetLoad";
import { EnableAudioModal } from "../blocks/setup/EnableAudioModal";
import { SetupSounds } from "../blocks/setup/SetupSounds";

export class SetupState extends State {

    setupEvents(): void {

        console.log("🎛️-----------------------SetupState-----------------------🎛️");
        GAME.events.enableSound.add(this._enableAudioProperty.bind(this));
    }

    modelChanges(): void {
        //
    }

    setupBlocks(): void {

        this.blocks = [
            new AssetLoad("asset load step"),
            new EnableAudioModal("Enable Audio Modal"),
            new SetupSounds("Setup Sounds")
        ];
    }

    removeEvents(): void {

        GAME.events.enableSound.removeAll();
    }

    exitState(): void {

        GAME.states[GameState.INTRO].enterState();
    }

    // -------------------------------------------------------------------------//
    private _enableAudioProperty(enableSound: boolean): void {

        this.models.progress.playWithSound = enableSound;
        // GAME.sound will be set in SetupSounds block when sound library is loaded
    }
}