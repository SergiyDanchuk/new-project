import React, { Component } from 'react';
// Підключаємо глобальні стилі в кореневому компоненті React.
import './styles.css';
// Імпортуємо HTML-інтерфейс і полотно, на якому Pixi малює ігрову сцену.
import GameUI from './dom/gameUI';
import PixiCanvas from './pixi/PixiCanvas';
// Імпортуємо спільні моделі гри, дані яких показує інтерфейс.
import { GAME_MODELS } from './GAME';

// Рекурсивно робить поля моделей доступними лише для читання, щоб UI не змінював стан гри напряму.
type DeepReadonly<T> = {
  // Зберігаємо властивості типу й рекурсивно позначаємо їхні значення як readonly.
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Кореневий компонент монтує HTML-інтерфейс і полотно Pixi.
class App extends Component {
  // Формує дерево компонентів застосунку.
  render() {
    return(
      <>
        {/* Передаємо HTML-інтерфейсу дані гри лише для читання. */}
        <GameUI models={GAME_MODELS as DeepReadonly<typeof GAME_MODELS>} />
        {/* Pixi відображає інтерактивну сцену гри на полотні. */}
        <PixiCanvas />
      </>
    ) 
  }
}

export default App;
