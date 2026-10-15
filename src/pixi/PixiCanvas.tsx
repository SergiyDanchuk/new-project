import { useLayoutEffect, useRef } from 'react';
import { Application } from 'pixi.js';
import { GAME, GAME_MODELS } from '../GAME';

const PixiCanvas = () => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<Application | null>(null);

  useLayoutEffect(() => {
    if (!canvasRef.current || appRef.current) return;

    const app = GAME.app;
    app.init({
      resizeTo: window,
      canvas: canvasRef.current,
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true, 
      antialias: true
    });

    window.addEventListener('resize', onResize);

    function onResize(): void {

      GAME.events.redraw.dispatch();
      GAME.events.tempRedraw.dispatch();
    }

    appRef.current = app;

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

  return <canvas ref={canvasRef} />;
};

export default PixiCanvas;
