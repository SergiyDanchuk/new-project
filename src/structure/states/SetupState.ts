import { State } from "../State";
import { GAME } from "../../GAME";
import { GameState } from "./StateDefinitions";
import { AssetLoad } from "../blocks/setup/AssetLoad";
import { EnableAudioModal } from "../blocks/setup/EnableAudioModal";
import { SetupSounds } from "../blocks/setup/SetupSounds";

// Початкова фаза гри: завантаження ресурсів, вибір звуку та його налаштування.
export class SetupState extends State {

    // Очікуємо вибір гравця щодо звуку перед його налаштуванням.
    setupEvents(): void {

        console.log("🎛️-----------------------SetupState-----------------------🎛️");
        GAME.events.enableSound.add(this._enableAudioProperty.bind(this));
    }

    // Під час входу в налаштування моделі змінювати не потрібно.
    modelChanges(): void {
        //
    }

    // Ставимо в чергу завантаження ресурсів, запит про звук і його налаштування.
    setupBlocks(): void {

        this.blocks = [
            new AssetLoad("asset load step"),
            new EnableAudioModal("Enable Audio Modal"),
            new SetupSounds("Setup Sounds")
        ];
    }

    // Видаляємо обробник вибору звуку після виходу з початкової фази.
    removeEvents(): void {

        GAME.events.enableSound.removeAll();
    }

    // Після виконання блоків переходимо з налаштування до вступної сцени.
    exitState(): void {

        GAME.states[GameState.INTRO].enterState();
    }

    // -------------------------------------------------------------------------//
    // Зберігаємо вибір звуку для подальшої логіки гри та інтерфейсу.
    private _enableAudioProperty(enableSound: boolean): void {

        this.models.progress.playWithSound = enableSound;
        // GAME.sound will be set in SetupSounds block when sound library is loaded
    }
}
