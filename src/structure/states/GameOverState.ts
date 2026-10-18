import { State } from "../State";
import { GAME, gameConfig } from "../../GAME";
import { GameState } from "./StateDefinitions";
import GameUI from "../../dom/gameUI";
import GameControlArea from "../../dom/gameControlArea";
import { CleanUpGame } from "../blocks/game-over/CleanUpGame";
import { SetSymbolsToReel } from "../blocks/game-ready/SetSymbolsToReel";
import { AnimateWinlines } from "../blocks/game-over/AnimateWinLines";
import { winMultipliers } from "../../models/ReelModel";
import { WinAmountModal } from "../blocks/game-over/WinAmountModal";
import { Ticker } from "pixi.js";

// Перевіряє виграші й баланс, відтворює ефекти результату та повертається до очікування.
export class GameOverState extends State {

    // Ставка, збережена до зміни балансу; використовується для розрахунку виплати.
    private _currentBet: number = 0;
    // Чи вистачає гравцеві коштів на наступне обертання.
    private _insufficientFunds: boolean;
    // Ключі шаблонів виграшних ліній, що збіглися в останньому обертанні.
    private _landedWinLines: string[] = [];
    
    // Оновлюємо показ балансу під час обробки результату.
    setupEvents(): void {

        console.log("💀---------------------GameOverState----------------------💀");
        GAME.events.gameInfo.add(this._updateGameInfo.bind(this));
    }

    // Скидаємо попередні ознаки результату, перевіряємо виграші й оновлюємо кошти.
    modelChanges(): void {

        this._resetWin();
        this._trimReelDisplay();
        this._checkWinLines();
        this._deductNextBet();
        this._awardPayout();
        this._checkInsufficientFunds();
    }

    // Ставимо в чергу очищення, розміщення символів, анімації виграшу й показ виплати.
    setupBlocks(): void {

        this.blocks = [
            new CleanUpGame("Clean up reel overflow"),
            new SetSymbolsToReel("Set symbols to reel"),
            new AnimateWinlines("Animate Winlines"),
            new WinAmountModal("Win amount modal"),
        ];
    }

    // Видаляємо обробник цього стану перед поверненням до стану готовності.
    removeEvents(): void {
        
        GAME.events.gameInfo.removeAll();
    }

    // За нестачі коштів ставимо гру на паузу й показуємо вікно, потім повертаємося до очікування.
    exitState(): void {

        if (this._insufficientFunds) {

            GameUI.getInstance()?.showPopup(true);
            this.models.progress.isPaused = true;
            const ticker = Ticker.shared;
            ticker.stop();
        }

        GAME.states[GameState.GAME_READY].enterState();
    }

    // -------------------------------------------------------------------------//

    // Скидаємо ознаку попереднього виграшу перед перевіркою поточного.
    private _resetWin() :void {

        this.models.result.isWin = false;
    }

    // Прибираємо тимчасові рядки й залишаємо на барабанах остаточний результат.
    private _trimReelDisplay(): void {

        this.models.reel.reelDisplay = this.models.result.spinResult;
    }

    // Ставимо гру на паузу, якщо немає балансу, ставки та виграшу.
    private _checkInsufficientFunds(): void {

        const { bet, result } = this.models;

        if(bet.bankBalance === 0 && bet.betAmount === 0 && !result.isWin) {
            this._insufficientFunds = true;
        }
    }

    // Зберігаємо початкову ставку, за потреби зменшуємо її й списуємо з балансу.
    private _deductNextBet(): void {

        const { bet } = this.models;

        // Зберігаємо початкову суму ставки до будь-яких змін.
        this._currentBet = bet.betAmount;

        if (bet.bankBalance < this._currentBet) {

            if (bet.bankBalance >= gameConfig.betChangeAmount) {

                bet.betAmount = gameConfig.betChangeAmount;
            } else {

                bet.betAmount = 0;
            }
        }

        // Списуємо суму ставки.
        if (bet.bankBalance >= bet.betAmount) {

            bet.bankBalance -= bet.betAmount;
        }
  
    }
    // Розраховуємо виплату за кожну виграшну лінію й додаємо суму до балансу.
    private _awardPayout(): void {

        const { bet, result } = this.models;

        if (result.isWin) {
            let totalWin = 0;
            
            for (const winLineKey of this._landedWinLines) {
                const pattern = result.winLines[winLineKey];
                let symbol: string | null = null;
                for (let row = 0; row < pattern.length; row++) {
                    for (let col = 0; col < pattern[row].length; col++) {
                        if (pattern[row][col] === "X") {
                            symbol = result.spinResult[row][col];
                            break;
                        }
                    }
                    if (symbol) break;
                }
                if (symbol && winMultipliers[symbol as keyof typeof winMultipliers]) {
                    const multiplier = winMultipliers[symbol as keyof typeof winMultipliers];
                    // Використовуємо збережену ставку, зокрема коли коштів на повну ставку бракує.
                    const winForLine = this._currentBet * multiplier;
                    console.log(`💵 Win line ${winLineKey}: Symbol ${symbol}, Multiplier ${multiplier}, Win ${winForLine}`);
                    totalWin += winForLine;
                }
            }

            bet.bankBalance += totalWin;
            result.lastWinAmount = totalWin;
        }
    }

    // Перевіряємо кожен шаблон і збираємо позиції збігів для анімації.
    private _checkWinLines(): void {

        const { result } = this.models;
        const { spinResult } = result;

        if (!spinResult || spinResult.length < 4) return;

        // Очищуємо списки ліній для анімації та знайдених виграшів.
        result.linesToAnimate = [];
        this._landedWinLines = [];

        // Перевіряємо кожну задану виграшну лінію.
        Object.entries(result.winLines).forEach(([winLineKey, winLinePattern]) => {
            if (this._checkWinLinePattern(spinResult, winLinePattern)) {
                result.isWin = true;
                this._landedWinLines.push(winLineKey);

                // Додаємо координати символів цієї лінії до списку анімації.
                const positions = this._getPositionsForWinLine(winLineKey);
                result.linesToAnimate.push(...positions);
            }
        });
    }

    // Повертаємо true, якщо всі позначені клітинки містять однаковий символ.
    private _checkWinLinePattern(spinResult: string[][], pattern: string[][]): boolean {
        // Збираємо координати всіх клітинок, позначених X.
        const xPositions: Array<{ row: number, col: number }> = [];

        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
                if (pattern[row][col] === "X") {
                    xPositions.push({ row, col });
                }
            }
        }

        // Перевіряємо, що в усіх позначених клітинках однаковий символ.
        if (xPositions.length === 0) return false;

        const firstSymbol = spinResult[xPositions[0].row][xPositions[0].col];

        return xPositions.every(pos => spinResult[pos.row][pos.col] === firstSymbol);
    }

    // Перетворюємо позначені клітинки шаблону на координати барабанів і символів.
    private _getPositionsForWinLine(winLineKey: string): Array<{ reelIndex: number, symbolIndex: number }> {

        const positions: Array<{ reelIndex: number, symbolIndex: number }> = [];
        const pattern = this.models.result.winLines[winLineKey];

        // Знаходимо клітинки X і перетворюємо їх на координати для анімації.
        for (let row = 0; row < pattern.length; row++) {

            for (let col = 0; col < pattern[row].length; col++) {

                if (pattern[row][col] === "X") {
                    positions.push({ reelIndex: col, symbolIndex: row });
                }
            }
        }

        return positions;
    }

    // Оновлюємо відображення ставки й балансу за спільною моделлю.
    private _updateGameInfo(): void {

        const { bet } = this.models;

        const gameControlArea = GameControlArea.getInstance();
    
        if (gameControlArea) {

            gameControlArea.setBankInfo(bet.betAmount, bet.bankBalance);
        }
    }
}
