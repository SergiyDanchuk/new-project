import { Assets, Text } from "pixi.js";
import { Block } from "../../Block";
import { GAME } from "../../../GAME";
import { XContainer } from "../../../pixi/XContainer";
import { TGraphics } from "../../../pixi/TGraphics";

export class AssetLoad extends Block {

    private progressBar: TGraphics;
    private randomQuotes = [
        "Time flies over us,\nbut leaves its shadow behind...",
        "Time is what we want most,\nbut what we use worst...",
        "Lost time is never found again...",
        "The two most powerful warriors\nare patience and time..."
    ];

    constructor(name: string) {
        super(name);
    }

    start() {

        this._organiseContainer();
        this._createProgressBar();

        this._loadAssets().then(() => {
         
            this._destroyProgressBar();
            this.end();
        });
    }

    private async _loadAssets(): Promise<void> {
       
        Assets.addBundle('all-assets', {

            intro_BG: '/assets/images/spins-of-doom-intro-bg.jpg',
            dungeon_BG: '/assets/images/dungeon_BG.jpg',
            game_logo: '/assets/images/game-logo.png',
            game_frame: '/assets/images/game-frame.png',

            high_symbol_animations: '/assets/spritesheets/high-symbol/high-symbol-spritesheet.json',
            mid_symbol_animations: '/assets/spritesheets/mid-symbol/mid-symbol-spritesheet.json',
            low_symbol_animations: '/assets/spritesheets/low-symbol/low-symbol-spritesheet.json',
        }
        );

        // Load assets with progress tracking
        const assets = await Assets.loadBundle('all-assets', (progress: number) => {

            const percentage = Math.round(progress * 100);
            this._updateProgressBar(percentage);
        });

    }

    private _organiseContainer(): void {

        const { progress_container } = GAME.config.getConfig();
        GAME.containers.progressContainer = new XContainer(progress_container);
        GAME.app.stage.addChild(GAME.containers.progressContainer);
    }

    private _createProgressBar(): void {

        const { loading_background_bar, progress_bar, progress_text } = GAME.config.getConfig();
        const backgroundBar = new TGraphics(loading_background_bar);

        this.progressBar = new TGraphics(progress_bar);
        const randomQuoteSelected = Math.floor(Math.random() * this.randomQuotes.length);

        const progressText = new Text({text: this.randomQuotes[randomQuoteSelected], style: progress_text.style});

        progressText.scale.set(progress_text.scale);
        progressText.anchor.set(progress_text.anchor);
        progressText.position.set(progress_text.position.x, progress_text.position.y);

        GAME.containers.progressContainer.addChild(progressText);
    }

    private _updateProgressBar(percentage: number): void {

        const maxWidth = 300;
        const currentWidth = (percentage / 100) * maxWidth;
        this.progressBar.w = () => currentWidth;
        GAME.events.redraw.dispatch();
    }

    private _destroyProgressBar(): void {

        GAME.app.stage.removeChild(GAME.containers.progressContainer);
        GAME.containers.progressContainer.destroy();
        GAME.events.redraw.removeAll();
    }
}