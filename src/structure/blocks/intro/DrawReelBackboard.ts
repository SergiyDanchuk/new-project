import { GAME } from "../../../GAME";
import { Block } from "../../Block";
import { XContainer } from "../../../pixi/XContainer";

// Малює графічну підкладку позаду вікон барабанів.
export class DrawReelBackboard extends Block {

    constructor(name: string) {
        super(name);
    }

    // Додаємо підкладку й завершуємо цей блок.
    start() {

        this._appendReelBackboard();
        this.end();
    }
    
    // Створюємо підкладку потрібного розміру й розташування та додаємо її до сцени.
    private _appendReelBackboard(): void {

        const { master_reel_container } = GAME.config.getConfig();
        GAME.containers.masterReelContainer = new XContainer(master_reel_container);
        const { mainGameContainer } = GAME.containers;
        mainGameContainer.addChild(GAME.containers.masterReelContainer);
    }
}
