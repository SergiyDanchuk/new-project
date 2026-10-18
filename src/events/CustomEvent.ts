import { gameConfig } from "../GAME";

// Невеликий типізований механізм подій для зв'язку станів гри та компонентів інтерфейсу.
export class CustomEvent<T = void> {
    // Назва події для налагоджувальних повідомлень.
    private eventName: string;
    // Чи очікується для цієї події кілька обробників.
    private multipleCallersAllowed: boolean;
    // Функції, які викликаються під час dispatch цієї події.
    private listeners: ((arg?: T) => void)[] = [];

    // Зберігаємо параметри події; якщо multiAllowed не задано, він дорівнює false.
    constructor(name:string, multiAllowed?: boolean){
        this.eventName = name;
        this.multipleCallersAllowed = multiAllowed;
    }

  // Add listener
  // Додаємо обробник і за потреби попереджаємо про дублікати для одиничної події.
  add(listener: (arg?: T) => void) {
    this.listeners.push(listener);
    if(this.listeners.length > 1 && !this.multipleCallersAllowed ) {
        gameConfig.showEventConsole ? console.warn(`More than one event added to ${this.eventName}`) : null;
        this.listeners.forEach(element => {
            gameConfig.showEventConsole ? console.warn(element) : null;
        });
    }
  }

  // Remove listener
  // Відписуємо вказаний обробник, залишаючи решту підписок.
  remove(listener: (arg?: T) => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // Видаляємо всі обробники цієї події.
  removeAll() {
    this.listeners = [];
  }

  // Dispatch event
  // Викликаємо всі поточні обробники та за потреби повідомляємо про відсутність підписок.
  dispatch(arg?: T) {
    if (gameConfig.showEventConsole) {
      console.log(`⚡ DISPATCH : ${this.eventName} (${this.listeners.length} listeners)`);
    }
    
    for (const listener of this.listeners) {
      listener(arg);
    }
    
    if(this.listeners.length < 1) {
      if (gameConfig.showEventConsole) {
        console.warn(`NO listeners added to ${this.eventName}`);
        console.warn("Event dispatched from:", this.getCallerInfo());
      }
    }
  }

  // Get information about where the event is being dispatched from
  // Знаходимо в трасуванні стека місце виклику події без обробників.
  private getCallerInfo(): string {
    try {
      // Create an error to get the stack trace
      const error = new Error();
      const stack = error.stack?.split('\n') || [];
      
      // Find the first line that's not from this file or Error constructor
      for (let i = 0; i < stack.length; i++) {
        const line = stack[i];
        if (line && 
            !line.includes('CustomEvent.ts') && 
            !line.includes('Error') && 
            !line.includes('getCallerInfo') &&
            !line.includes('dispatch')) {
          // Clean up the stack trace line
          return line.trim().replace(/^at\s+/, '');
        }
      }
      
      return 'Unknown location';
    } catch (e) {
      return 'Unable to determine caller';
    }
  }

  // Check if there are listeners
  // Перевіряємо, чи є зараз хоча б один підписаний обробник.
  hasListeners(): boolean {
    return this.listeners.length > 0;
  }
}
