// Зберігає налаштування гравця та поточний стан паузи.
export class ProgressModel {
    // Коли true, гра ігнорує введення, анімації призупинені.
    isPaused: boolean = false;
    // Чи вибрав гравець відтворення звуку в грі.
    playWithSound: boolean = false;
}
