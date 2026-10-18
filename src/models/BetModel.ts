import { gameConfig } from "../GAME";

// Зберігає ставку й баланс для керування грою та розрахунку виплат.
export class BetModel {
    // Початкова ставка з налаштувань гри.
    betAmount: number = gameConfig.defaultBet;
    // Віднімаємо початкову ставку від налаштованого балансу.
    bankBalance: number = gameConfig.bankBalance - gameConfig.defaultBet; // your bank balance should include the bet amount
}
