import { GAME } from "../../../GAME";
import { Block } from "../../Block";
import { VSprite } from "../../../pixi/VSprite";

// Додає декоративну рамку поверх ігрового вікна.
export class DrawGameFrame extends Block {

    constructor(name: string) {
        super(name);
    }

    // Малюємо рамку й завершуємо блок створення сцени.
    start() {

        this._appendGameFrame();
        this.end();
    }
 
    // Створюємо спрайт рамки за формулами макета й додаємо його до сцени.
    private _appendGameFrame(): void {

        const { game_frame } = GAME.config.getConfig();
        const gameFrameSprite = new VSprite(game_frame);
    }
}
