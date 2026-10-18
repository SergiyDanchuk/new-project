import { GAME, GAME_MODELS } from "../GAME";
import { Models } from "../models/Models";

// Deep readonly utility type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Базова одиниця роботи стану; нащадки реалізують потрібну дію.
export abstract class Block {
  // Назва блоку, яку можна виводити в налагоджувальний журнал.
  name: string = "Step";
  // Моделі гри, доступні блоку лише для читання.
  protected readonly models: DeepReadonly<Models>;

  // Зберігаємо назву блоку й посилання на спільні моделі гри.
  constructor(name: string) {
    this.name = name;
    this.models = GAME_MODELS;
  }

  // Запускаємо роботу блоку; нащадок повідомляє про завершення через end().
  abstract start(): void; // visual manipulation goes here and can be overridden

  // Повідомляємо активному стану, що блок завершився.
  end(): void {
    GAME.events.blockComplete.dispatch();
  }
}
