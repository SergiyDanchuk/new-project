import { GAME } from "../../../GAME";
import { Block } from "../../Block";
import { VSprite } from "../../../pixi/VSprite";

// Додає спрайт логотипа до вступної сцени.
export class DrawGameLogo extends Block {

    constructor(name: string) {
        super(name);
    }

    // Малюємо логотип і завершуємо блок створення сцени.
    start() {

        this._appendGameLogo();
        this.end();
    }
 
    // Створюємо спрайт логотипа за формулами макета й додаємо його до сцени.
    private _appendGameLogo(): void {

        const { game_logo } = GAME.config.getConfig();   
        const gameLogoSprite = new VSprite(game_logo);
    }

}
