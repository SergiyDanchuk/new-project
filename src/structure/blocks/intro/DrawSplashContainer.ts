
import { GAME, gameConfig } from "../../../GAME";
import { Block } from "../../Block";
import { VSprite } from "../../../pixi/VSprite";
import { XContainer } from "../../../pixi/XContainer";
import { ZAnimatedSprite } from "../../../pixi/ZAnimatedSprite";
import { Assets } from "pixi.js";

// Створює початкову заставку й додає декоративні анімовані спрайти.
export class DrawSplashContainer extends Block {

    constructor(name: string) {
        super(name);
    }

    // Складаємо елементи заставки, чекаємо завершення показу й завершуємо блок.
    start() {

        this._createSplashContainer();
        this._drawIntroSprite();
        // this._drawDecorativeAnimations();
        // draw decorative animated sprites either side of the splash image

        // end in onclick function of sprite
    }

    override end(): void {

        GAME.events.spinButton.removeAll();
        GAME.app.stage.removeChild(GAME.containers.splashContainer);
        GAME.events.blockComplete.dispatch();
    }

    // Створюємо контейнер заставки й додаємо його на сцену Pixi.
    private _createSplashContainer() : void {

        const app = GAME.app;
        const { splash_container} = GAME.config.getConfig();
        GAME.containers.splashContainer = new XContainer(splash_container);
        const splashContainer = GAME.containers.splashContainer;
        app.stage.addChild(splashContainer);
    }

    // Додаємо зображення вступного тла до контейнера заставки.
    private _drawIntroSprite(): void {
   
        GAME.events.spinButton.add(() => this.end());
        const { intro_BG } = GAME.config.getConfig();
        intro_BG.click = () => {
            this.end();
        };
        const splashImage = new VSprite(intro_BG);
        splashImage.sprite.zIndex = 1;
        splashImage.sprite.cursor = 'pointer';
    }

    // Додаємо декоративні анімовані елементи вступної сцени.
    private _drawDecorativeAnimations(): void {

        const { decorative_animation } = GAME.config.getConfig();
        const sheet = Assets.get("low_symbol_animations");
        const frames = sheet.animations.FIRE;
        decorative_animation.textures = frames;
        const decorativeAnimation = new ZAnimatedSprite(decorative_animation);
        GAME.containers.splashContainer.addChild(decorativeAnimation);
        decorativeAnimation.play();

        decorative_animation.x = () => -(gameConfig.gameWidth /3 + gameConfig.gameWidth / 6);
        const decorativeAnimationLeft = new ZAnimatedSprite(decorative_animation);
        GAME.containers.splashContainer.addChild(decorativeAnimationLeft);
        decorativeAnimationLeft.play();
    }

}
