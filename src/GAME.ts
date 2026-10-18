import { Application } from "pixi.js";
import { Models } from "./models/Models";
import { PIXI_CONFIG } from "./PIXI_CONFIG";
import { XContainer } from "./pixi/XContainer";
import { GameState } from "./structure/states/StateDefinitions";
import { SetupState } from "./structure/states/SetupState";
import { IntroState } from "./structure/states/IntroState";
import { GameReadyState } from "./structure/states/GameReadyState";
import { SpinResultState } from "./structure/states/SpinResultState";
import { GameOverState } from "./structure/states/GameOverState";
import { CustomEvent } from "./events/CustomEvent";
import { sound } from "@pixi/sound";

// Параметри полотна, ставок, налагоджувальних повідомлень і примусових результатів.
type GameConfig = {
    gameWidth: number,
    gameHeight: number,
    reelSpinSpeed: number,
    defaultBet: number,
    betChangeAmount: number,
    bankBalance: number,
    useForcedResult: boolean,
    useForcedResultIndex: number | undefined,
    probabilityFRChosen: number,
    showBlockConsole: boolean,
    showEventConsole: boolean,
    masksEnabled: boolean
}

// Спільні налаштування, які використовують стани гри та засоби відображення.
export const gameConfig: GameConfig = {
    gameWidth: 320,
    gameHeight: 500,
    reelSpinSpeed: 19,
    defaultBet: 5,
    betChangeAmount: 5,
    bankBalance: 500,
    useForcedResult: false,
    useForcedResultIndex: undefined,
    probabilityFRChosen: 9,
    showBlockConsole: false,
    showEventConsole: false,
    masksEnabled: true
}

// Типова структура спільного глобального об'єкта гри.
type GAME_Type = {
    states: {
        [GameState.SETUP]: SetupState,
        [GameState.INTRO]: IntroState,
        [GameState.GAME_READY]: GameReadyState,
        [GameState.GAME_OVER]: GameOverState,
        [GameState.SPIN_RESULT]: SpinResultState
    },
    events: {
        audioToggle: CustomEvent<void>,
        volumeUp: CustomEvent<void>,
        volumeDown: CustomEvent<void>,
        blockComplete: CustomEvent<void>,
        redraw: CustomEvent<void>,
        tempRedraw: CustomEvent<void>,
        spinButton: CustomEvent<void>,
        gameInfo: CustomEvent<void>,
        changeBet: CustomEvent<number>,
        enableSound: CustomEvent<boolean>,
        dammyEvent: CustomEvent<void>,
    },
    containers: {
        progressContainer: XContainer | undefined,
        splashContainer: XContainer | undefined,
        mainGameContainer: XContainer | undefined,
        masterReelContainer: XContainer | undefined,
        reelAContainer: XContainer | undefined,
        reelBContainer: XContainer | undefined,
        reelCContainer: XContainer | undefined,
        reelDContainer: XContainer | undefined,
        winPanelContainer: XContainer | undefined,
    },
    sound: typeof sound | undefined,
    app: Application,
    config: PIXI_CONFIG | undefined
}

// Створюємо спільні моделі стану для інтерфейсу й ігрової логіки.
export const GAME_MODELS = new Models();

// Створюємо глобальний реєстр станів, подій, контейнерів Pixi та об'єктів застосунку.
export const GAME: GAME_Type = {
    states: {
        [GameState.SETUP]: new SetupState(),
        [GameState.INTRO]: new IntroState(),
        [GameState.GAME_READY]: new GameReadyState(),
        [GameState.SPIN_RESULT]: new SpinResultState(),
        [GameState.GAME_OVER]: new GameOverState()
    },
    events: {
        audioToggle: new CustomEvent<void>("audio-toggle", true), // audio and visuals
        volumeUp: new CustomEvent<void>("volume-up"),
        volumeDown: new CustomEvent<void>("volume-down"),
        blockComplete: new CustomEvent<void>("block-complete"),
        redraw: new CustomEvent<void>("redraw", true),
        tempRedraw: new CustomEvent<void>("temp-redraw", true),
        spinButton: new CustomEvent<void>("spin-button"),
        gameInfo: new CustomEvent<void>("game-info", true),
        changeBet: new CustomEvent<number>("change-bet"),
        enableSound: new CustomEvent<boolean>("sound-enabled", true),
        dammyEvent: new CustomEvent<void>("dammy-event"),
    },
    containers: {
        progressContainer: undefined,
        splashContainer: undefined,
        mainGameContainer: undefined,
        masterReelContainer: undefined,
        reelAContainer: undefined,
        reelBContainer: undefined,
        reelCContainer: undefined,
        reelDContainer: undefined,
        winPanelContainer: undefined
    },
    sound: undefined,
    app: new Application(),
    config: new PIXI_CONFIG()
}

// Запускаємо життєвий цикл гри: завантажуємо ресурси й готуємо звук.
GAME.states[GameState.SETUP].enterState();
