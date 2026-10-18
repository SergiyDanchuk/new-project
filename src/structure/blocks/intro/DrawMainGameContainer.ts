import { GAME } from "../../../GAME";
import { Block } from "../../Block";
import { Assets } from "pixi.js";
import { TGraphics } from "../../../pixi/TGraphics";
import { VSprite } from "../../../pixi/VSprite";
import { XContainer } from "../../../pixi/XContainer";

// Створює основні шари сцени Pixi та додає фонову графіку.
export class DrawMainGameContainer extends Block {

    constructor(name: string) {
        super(name);
    }

    // Створюємо контейнери й фонові шари, а потім завершуємо блок.
    start() {

        this._organiseContainers();
        this._appendGameBackground();
        //this._appendConsistentBackboard();
        this.end();
    }
 
    // Створюємо головний контейнер гри й додаємо його на сцену Pixi.
    private _organiseContainers(): void {

        const config = GAME.config.getConfig();
        const { main_game_container } = config;
        GAME.containers.mainGameContainer = new XContainer(main_game_container);
        GAME.app.stage.addChild(GAME.containers.mainGameContainer);

    }

    // Додаємо зображення тла до головного контейнера сцени.
    private _appendGameBackground(): void {

        const image = Assets.get("dungeon_BG");
        const originalWidth = image.orig.width;
        const originalHeight = image.orig.height;

        const imageAspectRatio = originalWidth / originalHeight;

        const getScaleFactor = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const windowAspectRatio = windowWidth / windowHeight;
            
            return windowAspectRatio < imageAspectRatio 
                ? windowHeight / originalHeight  // Scale by height
                : windowWidth / originalWidth;   // Scale by width
        };

        const { dungeon_BG } = GAME.config.getConfig();
        dungeon_BG.w = () => originalWidth * getScaleFactor();
        dungeon_BG.h = () => originalHeight * getScaleFactor();
        
        const maingBackgroundImage = new VSprite(dungeon_BG);
        maingBackgroundImage.sprite.anchor.set(0.5, 0);
    }

    //debug tool
    // Додаємо нерухомий шар підкладки за барабанами.
    private _appendConsistentBackboard(): void {

        const { main_game_backboard } = GAME.config.getConfig();
        const mainGameBackboard = new TGraphics(main_game_backboard);
        mainGameBackboard.graphics.alpha = 0.5;
    }
}
