import { GAME, gameConfig, GAME_MODELS } from "../GAME";
import { Block } from "./Block";
import { Models } from "../models/Models";

// Базовий клас ігрової фази, що послідовно виконує блоки логіки чи анімації.
export abstract class State {
    // Блоки, які ще мають виконатися в поточному стані.
    blocks: Block[] = [];
    // Спільні моделі, якими користуються всі стани гри.
    protected models: Models;

    // Отримуємо спільну колекцію моделей під час створення стану.
    constructor() {
        this.models = GAME_MODELS;
    }

    // Готуємо стан і запускаємо послідовність його блоків.
    enterState(): void {

        this._setupBlockLoopEvent();
        this.setupEvents();
        this.modelChanges();
        this.setupBlocks();
        this._playThroughBlocks(); //exit state called from playThroughBlocks
    }
    
    private _setupBlockLoopEvent(): void {

        GAME.events.blockComplete.add(this._playThroughBlocks.bind(this));
    }

    // Тут стан підписується на потрібні йому події.
    abstract setupEvents(): void;

    // Тут оновлюємо моделі під час входу в стан.
    abstract modelChanges(): void;

    // Тут формується черга робіт для цього стану.
    abstract setupBlocks(): void;

    // Запускаємо наступний блок або очищуємо підписки й виходимо, коли черга спорожніла.
    private _playThroughBlocks(): void {

        if (this.blocks.length > 0) {
            const currentBlock = this.blocks.shift();
            gameConfig.showBlockConsole ? console.log(currentBlock.name) : null;
            currentBlock.start(); // current block calls the blockComplete event at the end of its tasks            
        } 
        else {
            this._removeBlockLoopEvent();
            this.removeEvents();
            this.exitState();
        }
    }
    
    // Видаляємо обробник циклу блоків після завершення послідовності.
    private _removeBlockLoopEvent(): void {

        GAME.events.blockComplete.removeAll();
    }

    // Кожен стан видаляє тут свої підписки на події.
    abstract removeEvents(): void;

    // Кожен стан визначає, яка ігрова фаза буде наступною.
    abstract exitState(): void;
}

