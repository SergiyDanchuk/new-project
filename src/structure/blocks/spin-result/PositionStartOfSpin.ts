
import { Block } from "../../Block";
import { gameConfig, GAME } from "../../../GAME";

export class PositionStartOfSpin extends Block {
   
    constructor(name: string) {
        super(name);
    }

    start() {

        this._secretlyMoveReels();
        this.end();
    }

    private _secretlyMoveReels(): void {
                
        GAME.containers.reelAContainer.y =- GAME.containers.reelAContainer.height;
        GAME.containers.reelAContainer.y += gameConfig.gameWidth;

        GAME.containers.reelBContainer.y =- GAME.containers.reelBContainer.height;
        GAME.containers.reelBContainer.y += gameConfig.gameWidth;

        GAME.containers.reelCContainer.y =- GAME.containers.reelCContainer.height;
        GAME.containers.reelCContainer.y += gameConfig.gameWidth;

        GAME.containers.reelDContainer.y =- GAME.containers.reelDContainer.height;
        GAME.containers.reelDContainer.y += gameConfig.gameWidth;
    }
}
