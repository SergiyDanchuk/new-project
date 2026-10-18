import { BetModel } from "./BetModel";
import { ReelModel } from "./ReelModel";
import { Resultmodel } from "./ResultModel";
import { ProgressModel } from "./ProgressModel";

// Контейнер моделей, у яких зберігаються змінні дані гри.
export class Models {
  // Поточна ставка й доступний баланс.
  bet: BetModel = new BetModel();
  // Символи, які зараз показані на барабанах.
  reel: ReelModel = new ReelModel();
  // Результат останнього обертання, виграшні лінії та виплата.
  result: Resultmodel = new Resultmodel();
  // Ознаки паузи й налаштування звуку.
  progress: ProgressModel = new ProgressModel();
} 
