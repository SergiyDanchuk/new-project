import { Block } from "../../Block";
import { emptyAllReels } from "../../../utils/ReelHelper";

// Видаляє тимчасові об'єкти барабанів і повертає їх у початкові позиції.
export class CleanUpGame extends Block {

    constructor(name: string) {
        super(name);
    }

    // Очищуємо вміст барабанів, скидаємо позиції й завершуємо блок.
    start() {

        this._emptyContainers();
        this.end();
    }

    private _emptyContainers(): void {

        emptyAllReels();
    }
}
