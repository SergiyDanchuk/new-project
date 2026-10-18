import { useLayoutEffect, useRef } from 'react';
import { Application } from 'pixi.js';
import { GAME, GAME_MODELS } from '../GAME';

// Компонент React, що підключає застосунок Pixi та обробку клавіатури.
const PixiCanvas = () => {

  // Посилання на DOM-елемент полотна, до якого під'єднається Pixi.
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Посилання запобігає повторній ініціалізації під час рендерів React.
  const appRef = useRef<Application | null>(null);

  // Ініціалізуємо Pixi один раз після монтування полотна.
  useLayoutEffect(() => {
    // Виходимо, якщо полотна ще немає або Pixi вже ініціалізовано.
    if (!canvasRef.current || appRef.current) return;

    // Використовуємо спільний екземпляр Pixi-застосунку.
    const app = GAME.app;
    // Налаштовуємо розмір, роздільність, щільність пікселів і згладжування.
    app.init({
      resizeTo: window,
      canvas: canvasRef.current,
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true, 
      antialias: true
    });

    // Перемальовуємо шари гри, коли змінюється розмір вікна браузера.
    window.addEventListener('resize', onResize);

    // Просимо ігрові контейнери перерахувати розташування після зміни розміру.
    function onResize(): void {

      GAME.events.redraw.dispatch();
      GAME.events.tempRedraw.dispatch();
    }

    // Зберігаємо ініціалізований екземпляр, щоб не налаштувати його повторно.
    appRef.current = app;

    // Прив'язуємо клавіші до тих самих подій, що й екранні кнопки.
    document.addEventListener('keyup', function (event) {
      const { isPaused } = GAME_MODELS.progress;
    
      if (event.code === 'Space' && !isPaused) {
        GAME.events.spinButton.dispatch();
      }
      if (event.code === 'ArrowUp' && !isPaused) {
        GAME.events.changeBet.dispatch(1);
      }
      if (event.code === 'ArrowDown' && !isPaused) {
        GAME.events.changeBet.dispatch(-1);
      }
      
    })

  }, []);

  // Створюємо елемент полотна, на якому Pixi відображає гру.
  return <canvas ref={canvasRef} />;
};

export default PixiCanvas;
