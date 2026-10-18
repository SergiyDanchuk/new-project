import { Sprite, Texture, Assets } from "pixi.js"
import { GAME } from "../GAME";
import { posInterface } from "./TGraphics";
import { CustomEvent } from "../events/CustomEvent";

interface SInput extends posInterface {
    anchor: number | null;
    textureKey: Texture | string,
}
// Обгортка спрайта з розміром за формулами та необов'язковою обробкою натискання.
export class VSprite  {
   
    sprite: Sprite;
    label: string;
    parent: any;

    anchor: number | null;
    altEvent?: CustomEvent<void>;

    w: () => number;
    h: () => number;
    x: () => number;
    y: () => number;
    click?: () => void;
    
    private boundRedraw: () => void;

    // Знаходимо текстуру, налаштовуємо спрайт, додаємо його до батька й підписуємося на перемальовування.
    constructor(sInput : SInput ) {
        
        const texture = typeof sInput.textureKey === 'string' 
            ? Assets.get(sInput.textureKey) 
            : sInput.textureKey;
        
        this.sprite = new Sprite(texture);
        
        this.label = sInput.label;
        this.sprite.label = sInput.label;
        this.parent = sInput.parent;

        this.anchor = sInput.anchor ? sInput.anchor : 0;
        this.w = sInput.w;
        this.h = sInput.h;
        this.x = sInput.x;
        this.y = sInput.y;
        this.click = sInput.click;
        this.altEvent = sInput.altEvent;

        // set initial position on first render
        this.sprite.width = this.w();
        this.sprite.height = this.h();
        this.sprite.x = this.x();
        this.sprite.y = this.y();
        this.sprite.anchor.set(this.anchor);

        // ACTIVATES CLICK EVENT = COULD THIS BE POINTER UP INSTEAD?
        if (this.click) {
            this.sprite.eventMode = "static";
            this.sprite.on('pointerdown', () => {
                this.click?.call(this);
            });
        }

        // wont appear unless parented
        this.parent.addChild(this.sprite);

        // Store bound function reference for proper cleanup
        this.boundRedraw = this.redraw.bind(this);
        
        // Subscribe to redraw events
        if (this.altEvent) {
            this.altEvent.add(this.boundRedraw);
        } else {
            GAME.events.redraw.add(this.boundRedraw);
        }
    }

    // Перераховуємо розмір і розташування спрайта після зміни макета.
    redraw(): void {

        this.sprite.width = this.w();
        this.sprite.height = this.h();
        this.sprite.x = this.x();
        this.sprite.y = this.y();
    }
}
