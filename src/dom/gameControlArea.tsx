import React, { Component } from 'react';
import { GAME } from '../GAME';

interface GameControlAreaState {
    showControls: boolean;
    betAmount: number;
    bankBalance: number;
}

interface GameControlAreaProps {
    showControls: boolean;
    betAmount: number;
    bankBalance: number;
}

// Показує ставку й баланс, а дії гравця передає грі як події.
export default class GameControlArea extends Component<GameControlAreaProps, GameControlAreaState> {

    // Даємо станам гри доступ до змонтованого компонента для оновлення балансу.
    private static instance: GameControlArea | null = null;

    // Ініціалізуємо показані значення з властивостей батьківського інтерфейсу.
    constructor(props: GameControlAreaProps) {
        super(props);
        this.state = {
            showControls: props.showControls ?? false,
            betAmount: props.betAmount,
            bankBalance: props.bankBalance
        };
        GameControlArea.instance = this;
    }

    // Повертаємо змонтований компонент керування, якщо він існує.
    public static getInstance(): GameControlArea | null {
        return GameControlArea.instance;
    }

    // Оновлюємо ставку й баланс на екрані після зміни моделей.
    public setBankInfo(betAmount: number, bankBalance: number): void {
        this.setState({
            betAmount,
            bankBalance
        });
    }

    // Копіюємо зміну властивості showControls у локальний стан компонента.
    componentDidUpdate(prevProps: GameControlAreaProps): void {
        // Update state when showControls prop changes
        if (prevProps.showControls !== this.props.showControls) {
            this.setState({
                showControls: this.props.showControls
            });
        }
    }

    // Показуємо баланс і, за потреби, кнопки обертання та зміни ставки.
    render() {
        return <>
            <div className="game-controls__container">
                <div className="game-controls__button-container">
                    <div className="game-controls__display-container">
                        <div className="game-controls__bank-container">
                            <div className="game-controls__bet-display">${this.state.betAmount}</div>
                            <div className="game-controls__horizontal"></div>
                            <div className="game-controls__bank-display">${this.state.bankBalance}</div>
                        </div>
                    </div>
                    {this.state.showControls &&

                        <>
                            <div className="game-controls__display-container">
                                <div className="game-controls__spin-button" onClick={() => GAME.events.spinButton.dispatch()}>
                                    $
                                </div>
                            </div>
                            <div className="game-controls__display-container">
                                <div className="game-controls__bet-button-container">
                                    <div className="game-controls__bet-button --plus" onClick={() =>
                                        GAME.events.changeBet.dispatch(1)
                                    }>+</div>
                                    <div className="game-controls__bet-button --minus" onClick={() =>
                                        GAME.events.changeBet.dispatch(-1)}
                                    >-</div>
                                </div>
                            </div>
                        </>
                    }

                </div>

            </div>
        </>;
    }
}
