import { Block } from "../../Block";
import { Assets } from 'pixi.js';
import { GAME } from "../../../GAME";

// Налаштовує звукові ефекти й музику, якщо гравець увімкнув звук.
export class SetupSounds extends Block {

    constructor(name: string) {
        super(name);
    }

    // За потреби налаштовуємо звук і продовжуємо послідовність запуску гри.
    start() {

        if (this.models.progress.playWithSound) {
            this.setupSounds();
        }
        this.end();
    }

    // Завантажуємо модуль звуку, реєструємо аудіофайли й задаємо їхню початкову гучність.
    private setupSounds(): void {
        // Load sound library dynamically after user interaction
        import('@pixi/sound').then(({ sound }) => {
            // Assign the sound library to GAME.sound so it can be accessed elsewhere
            GAME.sound = sound;
            
            // BUTTON SFX
            sound.add('UI-pick', '/assets/audio/SFX/BUTTON_12.wav');
            sound.volume('UI-pick', 0.01);

            //MUSIC
            sound.add('music-1', '/assets/audio/music/trap-music-med.mp3');
            sound.volume('music-1', 0.1);

            //REEL SFX
            sound.add('reel-thud', '/assets/audio/SFX/light-thud-super-low.mp3');
            sound.volume('reel-thud', 0.6);

            // GAME EVENTS
            sound.add('coin-count-loop', '/assets/audio/SFX/coin-loop-detuned.wav');
            sound.volume('coin-count-loop', 0.05);

            sound.add('coin-flung', '/assets/audio/SFX/coin-flung-med.mp3');
            sound.volume('coin-flung', 0.2);

            sound.play('music-1', {
                loop: true,
            });
        });
    }
}
