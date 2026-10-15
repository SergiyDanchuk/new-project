
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

export class IntroState extends State {
    
    setupEvents(): void {

        console.log("🌟-----------------------IntroState-----------------------🌟");
        GAME.events.audioToggle.add(this._toggleAudio.bind(this));
        GAME.events.volumeUp.add(this._volumeUp.bind(this));
        GAME.events.volumeDown.add(this._volumeDown.bind(this));
    }

    modelChanges(): void {
        //
    }
    
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

    removeEvents(): void {
        // stub
    }

    exitState(): void {

        GameUI.getInstance()?.showMenuAudio(true);
        GAME.states[GameState.GAME_READY].enterState();
    }    
// -------------------------------------------------------------------------//

    private _toggleAudio(): void {

        console.log("🔊-----------------------Audio Toggled-----------------------🔊");
        if (GAME.sound) {
            GAME.sound.toggleMuteAll();
        }
    }

    private _volumeUp(): void {

        console.log("🔊-----------------------Volume Up-----------------------🔊");
        if (GAME.sound) {
            GAME.sound.volumeAll += 0.5;
        }
    }

    private _volumeDown(): void {

        console.log("🔊-----------------------Volume Down-----------------------🔊");
        if (GAME.sound) {
            GAME.sound.volumeAll -= 0.5;
        }
    }

}