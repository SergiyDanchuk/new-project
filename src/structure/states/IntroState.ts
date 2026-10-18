
import { State } from "../State";
import { GAME } from "../../GAME";
import { GameState } from "./StateDefinitions";
import GameUI from "../../dom/gameUI";
import { DrawSplashContainer } from "../blocks/intro/DrawSplashContainer";
import { DrawMainGameContainer } from "../blocks/intro/DrawMainGameContainer";
import { DrawGameFrame } from "../blocks/intro/DrawGameFrame";
import { DrawGameLogo } from "../blocks/intro/DrawGameLogo";
import { DrawReelBackboard } from "../blocks/intro/DrawReelBackboard";
import { DrawReelContainers } from "../blocks/intro/DrawReelContainers";

// Створює початкову сцену гри й переходить до фази очікування гравця.
export class IntroState extends State {
    
    // Підписуємося на керування звуком, поки вступна фаза обробляє ці події.
    setupEvents(): void {

        console.log("🌟-----------------------IntroState-----------------------🌟");
        GAME.events.audioToggle.add(this._toggleAudio.bind(this));
        GAME.events.volumeUp.add(this._volumeUp.bind(this));
        GAME.events.volumeDown.add(this._volumeDown.bind(this));
    }

    // Для створення вступної сцени змінювати моделі не потрібно.
    modelChanges(): void {
        //
    }
    
    // Формуємо чергу шарів сцени в порядку їх створення.
    setupBlocks(): void {

        this.blocks = [

            new DrawSplashContainer("Draw Splash Container"),
            new DrawMainGameContainer("Draw Main Game Container"),
            new DrawGameLogo("Draw game logo"),
            new DrawGameFrame("Draw game frame"),
            new DrawReelBackboard("Draw reel backboard"),
            new DrawReelContainers("Draw reel containers")
        ];
    }

    // Очищення подій вступної фази поки не реалізовано.
    removeEvents(): void {
        // stub
    }

    // Показуємо керування звуком і переходимо до стану готовності.
    exitState(): void {

        GameUI.getInstance()?.showMenuAudio(true);
        GAME.states[GameState.GAME_READY].enterState();
    }    
// -------------------------------------------------------------------------//

    // Перемикаємо вимкнення звуку Pixi, якщо звукову систему вже завантажено.
    private _toggleAudio(): void {

        console.log("🔊-----------------------Audio Toggled-----------------------🔊");
        if (GAME.sound) {
            GAME.sound.toggleMuteAll();
        }
    }

    // Збільшуємо загальну гучність на половину одиниці.
    private _volumeUp(): void {

        console.log("🔊-----------------------Volume Up-----------------------🔊");
        if (GAME.sound) {
            GAME.sound.volumeAll += 0.5;
        }
    }

    // Зменшуємо загальну гучність на половину одиниці.
    private _volumeDown(): void {

        console.log("🔊-----------------------Volume Down-----------------------🔊");
        if (GAME.sound) {
            GAME.sound.volumeAll -= 0.5;
        }
    }

}
