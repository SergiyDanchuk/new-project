import { Assets } from "pixi.js";
import { GAME, gameConfig } from "../GAME";
import { ZAnimatedSprite } from "../pixi/ZAnimatedSprite";
import { XContainer } from "../pixi/XContainer";
import { FORCED_RESULTS, ForcedResult } from "../forcedResults/FORCED-RESULTS";

// Deep freeze utility to make nested objects and arrays read-only
// Рекурсивно заморожуємо об'єкт і вкладені в нього масиви та об'єкти.
export function deepFreeze<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj;

    Object.freeze(obj);

    if (Array.isArray(obj)) {
        obj.forEach(item => deepFreeze(item));
    } else {
        Object.values(obj).forEach(value => deepFreeze(value));
    }

    return obj;
}

// Беремо примусовий результат за заданим індексом або вибираємо випадковий.
export function getRandomForcedResult(): ForcedResult {

    const potentialForcedResult = Object.keys(FORCED_RESULTS).map(Number);
    let randomKey;
    if (gameConfig.useForcedResultIndex !== undefined) {

        randomKey = potentialForcedResult[gameConfig.useForcedResultIndex - 1];
    } else {

        randomKey = potentialForcedResult[Math.floor(Math.random() * potentialForcedResult.length)];
    };
    const randomForcedResult = FORCED_RESULTS[randomKey as keyof typeof FORCED_RESULTS];
    return randomForcedResult;
}

// Повертаємо всі чотири контейнери барабанів у початкове вертикальне положення.
export function resetReelContainerPositions(): void {
    // reset the positions of the reel containers
    GAME.containers.reelAContainer.y = 0;
    GAME.containers.reelBContainer.y = 0;
    GAME.containers.reelCContainer.y = 0;
    GAME.containers.reelDContainer.y = 0;
}

// Знищуємо символи, видаляємо дочірні елементи барабанів і тимчасові обробники перемальовування.
export function emptyAllReels(): void {

    GAME.containers.reelAContainer.children.forEach(child => child.destroy());
    GAME.containers.reelBContainer.children.forEach(child => child.destroy());
    GAME.containers.reelCContainer.children.forEach(child => child.destroy());
    GAME.containers.reelDContainer.children.forEach(child => child.destroy());

    GAME.containers.reelAContainer.removeChildren();
    GAME.containers.reelBContainer.removeChildren();
    GAME.containers.reelCContainer.removeChildren();
    GAME.containers.reelDContainer.removeChildren();
    GAME.events.tempRedraw.removeAll();
}

// Знаходимо кадри анімації символу у відповідному спрайтшиті.
export function getSymbolFrames(symbol: string): any {

    var frames = [];
    var sheet;
    switch (symbol) {
        case "H1":
            sheet = Assets.get("high_symbol_animations");
            frames = sheet.animations.IDOL;
            break;
        case "H2":
            sheet = Assets.get("high_symbol_animations");
            frames = sheet.animations.RUBY;
            break;
        case "H3":
            sheet = Assets.get("high_symbol_animations");
            frames = sheet.animations.RING;
            break;
        case "M1":
            sheet = Assets.get("mid_symbol_animations");
            frames = sheet.animations.CHEST;
            break;
        case "M2":
            sheet = Assets.get("mid_symbol_animations");
            frames = sheet.animations.HELMET;
            break;
        case "M3":
            sheet = Assets.get("mid_symbol_animations");
            frames = sheet.animations.SHIELD;
            break;
        case "L1":
            sheet = Assets.get("low_symbol_animations");
            frames = sheet.animations.FIRE;
            break;
        case "L2":
            sheet = Assets.get("low_symbol_animations");
            frames = sheet.animations.POTION;
            break;
        case "L3":
            sheet = Assets.get("low_symbol_animations");
            frames = sheet.animations.SKULL;
            break;
    }
    return frames;
}

// Створюємо спрайт символу й зупиняємо його на першому кадрі.
export function createSymbol(frames: any, yPosition?: number): ZAnimatedSprite {
    // makes a symbol
    if (!frames || frames.length === 0) {
        console.error("No frames provided for symbol");
        return null;
    }
    const { animation_default } = GAME.config.getConfig();
    animation_default.textures = frames;

    // If yPosition is provided, create a custom y formula that returns the fixed position
    if (yPosition !== undefined) {

        animation_default.y = () => yPosition;
    }

    const symbol = new ZAnimatedSprite(animation_default);
    symbol.gotoAndStop(0); // Show first frame but don't animate
    return symbol;
}

// Створюємо анімований спрайт символу, спочатку зупинений на першому кадрі.
export function createAnimatedSymbol(frames: any, yPosition?: number): ZAnimatedSprite {
    // makes an animated symbol that can be animated after creation
    if (!frames || frames.length === 0) {
        console.error("No frames provided for animated symbol");
        return null;
    }
    const { animation_default } = GAME.config.getConfig();
    animation_default.textures = frames;

    // If yPosition is provided, create a custom y formula that returns the fixed position
    if (yPosition !== undefined) {
        animation_default.y = () => yPosition;
    }

    const symbol = new ZAnimatedSprite(animation_default);
    symbol.gotoAndStop(0); // Show first frame but don't animate initially
    return symbol;
}

// Перебудовуємо стовпець барабана з поточних рядків моделі та текстур символів.
export function setupReel(reelNumber: number, reelContainer: XContainer, models: any): void {
    
    const allReels = models.reel.reelDisplay.length;

    // remove previous symbols from reel
    reelContainer.children.forEach(child => {

        if (child instanceof ZAnimatedSprite) {
            // cleanup prevents listener errors trying to effect a destroyed object
            child.cleanup();
            child.destroy();
        }
    });

    reelContainer.removeChildren();

    for (var y = 0; y < allReels; y++) {
        const reelToBuild = models.reel.reelDisplay[y][reelNumber];
        const frames = getSymbolFrames(reelToBuild);
        const symbolHeight = gameConfig.gameWidth / 4; // Same as animation_default height
        const yPosition = symbolHeight * y;
        const symbol = createSymbol(frames, yPosition);

        if (symbol) {
            reelContainer.addChild(symbol);
        }
    }
}
