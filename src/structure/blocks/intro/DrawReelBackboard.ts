import { GAME } from "../../../GAME";
import { Block } from "../../Block";
import { XContainer } from "../../../pixi/XContainer";

export class DrawReelBackboard extends Block {

    constructor(name: string) {
        super(name);
    }

    start() {

        this._appendReelBackboard();
        this.end();
    }
    
    private _appendReelBackboard(): void {

        const { master_reel_container } = GAME.config.getConfig();
        GAME.containers.masterReelContainer = new XContainer(master_reel_container);
        const { mainGameContainer } = GAME.containers;
        mainGameContainer.addChild(GAME.containers.masterReelContainer);
    }
}
