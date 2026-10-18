import { Block } from "../../Block";
import { GAME } from "../../../GAME";
import GameUI from "../../../dom/gameUI";

// Показує кнопки зміни ставки та запуску обертання.
export class PlayerControlButton extends Block {

    constructor(name: string) {

        super(name);
    }

    // Показуємо панель керування й підписуємося на обертання, потім завершуємо блок.
    start() {

       this._gameControlsVisible();
       this._spinButtonEventsOn();

        //end in button control click
    }

    private _gameControlsVisible(): void {

        GameUI.getInstance()?.showGameControlArea(true);
        GameUI.getInstance()?.showGameControls(true);
    }

    private _spinButtonEventsOn(): void {
        
        // spinButton event turned off end of gameReadyState
        GAME.events.spinButton.add(this._onSpinButtonPress.bind(this));
    }
    
    private _onSpinButtonPress(): void {

        GAME.sound?.play('UI-pick');
        GameUI.getInstance()?.showGameControls(false);
        this.end();
    }

}

