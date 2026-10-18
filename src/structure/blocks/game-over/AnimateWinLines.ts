import { Block } from "../../Block";
import { GAME } from "../../../GAME";

// Підсвічує символи, що входять до виграшної комбінації.
export class AnimateWinlines extends Block {

    constructor(name: string) {
        super(name);
    }

    // Анімуємо виграшні символи, якщо є виграш; інакше одразу продовжуємо.
    start() {

        this._animateWinLines();
        // End the block after animating
    }

    private _animateWinLines(): void {

        const {linesToAnimate} = this.models.result;

        const reelContainers = [
            GAME.containers.reelAContainer,
            GAME.containers.reelBContainer,
            GAME.containers.reelCContainer,
            GAME.containers.reelDContainer
        ];
        
        // Check if we have winning lines to animate
        if (!linesToAnimate || linesToAnimate.length === 0) {

            this.end();
            return;
        }

        // Animate each winning symbol position
        linesToAnimate.forEach(({ reelIndex, symbolIndex }) => {

            const container = reelContainers[reelIndex];

            if (container && container.children[symbolIndex]) {

                const symbol = container.children[symbolIndex] as any;

                if (symbol && typeof symbol.gotoAndPlay === 'function') {

                    symbol.gotoAndPlay(0);
                }
            }
        });
        
        // End the block after animating
        this.end();
    }
}
