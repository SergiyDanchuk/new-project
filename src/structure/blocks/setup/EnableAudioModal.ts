import GameUI from "../../../dom/gameUI";
import { GAME } from "../../../GAME";
import { Block } from "../../Block";

export class EnableAudioModal extends Block {

    constructor(name: string) {
        super(name);
    }

    start() {

        GameUI.getInstance()?.showAudioPopup(true);
        this._progressAfterAudioModal();
    }

    private _progressAfterAudioModal(): void {
      
        GAME.events.enableSound.add(this._onModalClose.bind(this));
    }

    private _onModalClose(): void {
        
        console.log("🎛️-----------------------EnableAudioModal-----------------------🎛️");
        this.end();
    }
}
