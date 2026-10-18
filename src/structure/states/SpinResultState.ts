import { State } from "../State";
import { gameConfig, GAME } from "../../GAME";
import { GameState } from "./StateDefinitions";
import GameControlArea from "../../dom/gameControlArea";
import { SYMBOLS } from "../../models/ReelModel";
import { AnimateReels } from "../blocks/spin-result/AnimateReels";
import { PositionStartOfSpin } from "../blocks/spin-result/PositionStartOfSpin";
import { SetSymbolsToReel } from "../blocks/game-ready/SetSymbolsToReel";
import { getRandomForcedResult } from "../../utils/ReelHelper";

// Формує результат обертання, анімує барабани й переходить до перевірки виграшу.
export class SpinResultState extends State {

    // Очікуємо події оновлення відображення балансу під час обертання.
    setupEvents(): void {

        console.log("🎲--------------------SpinResultState---------------------🎲");
        GAME.events.gameInfo.add(this._updateGameInfo.bind(this));
    }

    // Вибираємо й зберігаємо результат до запуску анімаційних блоків.
    modelChanges(): void {

        this._generateSpinResult();
    }

    // Додаємо в чергу розміщення символів, початкову позицію й рух барабанів.
    setupBlocks(): void {

        this.blocks = [
            new SetSymbolsToReel("SetSymbolsToReel"),
            new PositionStartOfSpin("Position Start Of Spin"),
            new AnimateReels("Animate Reels")
        ];
    }

    // Видаляємо підписку інтерфейсу після завершення фази обертання.
    removeEvents(): void {

        GAME.events.gameInfo.removeAll();
    }

    // Після обертання переходимо до підрахунку виплати й перевірки ліній.
    exitState(): void {

        GAME.states[GameState.GAME_OVER].enterState();
    }
    // ------------------------------------------------------

    // Використовуємо примусовий результат за налаштуванням або випадковим шансом.
    private _generateSpinResult(): void {

        if (gameConfig.useForcedResult || this._randomDecideUseForcedResult()) {

            this._generateForcedSpinResult();
        } else {

            this._generateRandomSpinResult();
        }
    }

    // Вибираємо примусовий результат із шансом 1 до заданого знаменника.
    private _randomDecideUseForcedResult(): boolean {

        const probability = gameConfig.probabilityFRChosen;
        return Math.floor(Math.random() * probability) + 1 === 1;
    }

    // Формуємо ряд із чотирьох випадково вибраних ідентифікаторів символів.
    private _generateRandomDisplayRow(): string[] {

        const symbols = Object.values(SYMBOLS);
        var row = [];
        for (var x = 0; x < 4; x++) {

            row.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
        return row;
    }

    // Додаємо випадкові рядки на барабан і зберігаємо чотири як результат.
    private _generateRandomSpinResult(): void {

        const { reel, result } = this.models;
        // Add 12 random filler rows
        for (var y = 0; y < 12; y++) {

            const randomRow = this._generateRandomDisplayRow();
            reel.reelDisplay.unshift(randomRow);
        }

        // Add 4 random result rows
        for (var y = 0; y < 4; y++) {

            const randomRow = this._generateRandomDisplayRow();
            reel.reelDisplay.unshift(randomRow);
            result.spinResult.unshift(randomRow);
        }
    }

    // Додаємо випадкові рядки перед копією заданого результату.
    private _generateForcedSpinResult(): void {

        const { reel, result } = this.models;

        const randomForcedResult = getRandomForcedResult();
        //const randomForcedResult = FORCED_RESULTS[1].result;

        for (var y = 0; y < 12; y++) {

            const randomRow = this._generateRandomDisplayRow();
            reel.reelDisplay.unshift(randomRow);
        }

        // Add forced result at end (create deep copy to avoid mutating original)
        const resultCopy = randomForcedResult.result.map((row: string[]) => [...row]);
        // Add copy of forced result to reel display
        reel.reelDisplay.unshift(...resultCopy);
        result.spinResult = resultCopy;
    }

    // Оновлюємо показані елементами керування ставку й баланс.
    private _updateGameInfo(): void {

        const { bet } = this.models;

        const gameControlArea = GameControlArea.getInstance();
        if (gameControlArea) {

            gameControlArea.setBankInfo(bet.betAmount, bet.bankBalance);
        }
    }
}
