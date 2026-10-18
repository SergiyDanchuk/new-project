import { State } from "../State";
import { gameConfig, GAME } from "../../GAME";
import { GameState } from "./StateDefinitions";
import GameControlArea from "../../dom/gameControlArea";
import { PlayerControlButton } from "../blocks/game-ready/PlayerControlButtons";
import { SetSymbolsToReel } from "../blocks/game-ready/SetSymbolsToReel";
import { AnimateOccasional } from "../blocks/game-ready/AnimateOccasional";

// Фаза очікування: показує кнопки, змінює ставку й запускає обертання за дією гравця.
export class GameReadyState extends State {

    // Підписуємося на події інтерфейсу, доступні під час гри.
    setupEvents(): void {

        console.log("🎮---------------------GameReadyState---------------------🎮");

        const { events } = GAME;
        events.changeBet.add(this._updateBet.bind(this));
        events.gameInfo.add(this._updateGameInfo.bind(this));
        // Демоподія: підписуємо обробник і одразу викликаємо цю подію.
        events.dammyEvent.add(this._updateDammyInfo.bind(this));

        events.dammyEvent.dispatch();
    }

    // Готуємо показані символи й очищуємо дані попередньої виплати.
    modelChanges(): void {

        this._prepareDisplayReel();
        this._resetLastWinAmount();
    }

    // Розставляємо символи, за потреби анімуємо їх і вмикаємо кнопки керування.
    setupBlocks(): void {

        this.blocks = [
            new SetSymbolsToReel("Set symbols to reel"),
            new AnimateOccasional("Animate occasional"),
            new PlayerControlButton("Player control button"),
        ];
    }

    // Відписуємо обробники цього стану перед переходом до наступного.
    removeEvents(): void {

        const { events } = GAME;

        events.changeBet.removeAll();
        events.spinButton.removeAll();
        events.gameInfo.removeAll();
        events.dammyEvent.removeAll();
    }

    // Після натискання обертання переходимо до формування результату й анімації барабанів.
    exitState(): void {

        GAME.states[GameState.SPIN_RESULT].enterState();
    }

    //-----------------------------------------------------------------------------------//

    // Переносимо попередній результат на барабани й очищуємо його буфер.
    private _prepareDisplayReel(): void {

        const { reel, result } = this.models;

        reel.reelDisplay = [];
        reel.reelDisplay = result.spinResult;
        result.spinResult = [];
    }

    // Скидаємо попередню виплату перед наступним обертанням.
    private _resetLastWinAmount(): void {

        this.models.result.lastWinAmount = 0;
    }

    // Змінюємо ставку в межах балансу й надсилаємо подію оновлення інтерфейсу.
    private _updateBet(betChange: number): void {

        const { bet } = this.models;
        const { events } = GAME;
        
        GAME.sound?.play('UI-pick');

        if (betChange === 1) {
            const dynamicChangeAmount = bet.betAmount >= 50 ? 50 : gameConfig.betChangeAmount;
            
            const potentialSpend = ((bet.bankBalance + bet.betAmount) / dynamicChangeAmount) * dynamicChangeAmount;

            var incremementsRemaining = ((potentialSpend - bet.betAmount) / dynamicChangeAmount);
            if (incremementsRemaining >= 1) {

                bet.betAmount += dynamicChangeAmount;
                bet.bankBalance -= dynamicChangeAmount;
            }
        }

        if (betChange === -1) {

            const dynamicChangeAmount = bet.betAmount > 50 ? 50 : gameConfig.betChangeAmount;
            var decremementsRemaining = bet.betAmount / dynamicChangeAmount;
            if (decremementsRemaining > 1) {

                bet.betAmount -= dynamicChangeAmount;
                bet.bankBalance += dynamicChangeAmount;
            }
        }

        events.gameInfo.dispatch();
    }

    // Передаємо поточну ставку й баланс змонтованому компоненту керування.
    private _updateGameInfo(): void {

        const { bet } = this.models;

        const gameControlArea = GameControlArea.getInstance();

        if (gameControlArea) {

            gameControlArea.setBankInfo(bet.betAmount, bet.bankBalance);
        }
    }

    // Виводимо повідомлення, щоб перевірити спрацювання підписки на демоподію.
    private _updateDammyInfo(): void {
        console.log("Dammy event triggered");
    }
}
