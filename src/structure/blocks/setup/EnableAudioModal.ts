import GameUI from "../../../dom/gameUI";
import { GAME } from "../../../GAME";
import { Block } from "../../Block";

// Призупиняє налаштування, доки гравець не вибере параметр звуку.
export class EnableAudioModal extends Block {

    constructor(name: string) {
        super(name);
    }

    // Показуємо запит і очікуємо подію відповіді.
    start() {

        GameUI.getInstance()?.showAudioPopup(true);
        this._progressAfterAudioModal();
    }

    // Підписуємо обробник, який продовжить налаштування після відповіді.
    private _progressAfterAudioModal(): void {
      
        GAME.events.enableSound.add(this._onModalClose.bind(this));
    }

    // Завершуємо блок після вибору гравцем налаштування звуку.
    private _onModalClose(): void {
        
        console.log("🎛️-----------------------EnableAudioModal-----------------------🎛️");
        this.end();
    }
}
