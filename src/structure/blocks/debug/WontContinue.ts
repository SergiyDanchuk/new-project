import { Block } from "../../Block";

// Налагоджувальний блок, який навмисно не переходить до наступного блоку.
export class WontContinue extends Block {

    constructor(name: string) {
        super(name);
    }

    // Виводимо назву блоку й не викликаємо end(), щоб зупинити послідовність.
    start() {

        this.end();
    }
    
    override end(): void {
        // no block complete so game wont continue
    }
}
