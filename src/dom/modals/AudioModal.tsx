import React from 'react';
import { GAME } from '../../GAME';


interface AudioModalProps {
  isVisible: boolean;
  onClose: () => void;
}

// Запитуємо, чи ввімкнути звук, і передаємо вибір гравця грі.
export default function AudioModal({ isVisible, onClose }: AudioModalProps) {
  // Нічого не відображаємо, якщо батьківський компонент закрив вікно.
  if (!isVisible) return null;

  // Закриваємо вікно й повідомляємо грі, що звук потрібно ввімкнути.
  const handleYesClick = () => {
    onClose();
    GAME.events.enableSound.dispatch(true);
  };

  // Закриваємо вікно й повідомляємо грі, що звук має залишитися вимкненим.
  const handleNoClick = () => {
    onClose();
    GAME.events.enableSound.dispatch(false);
  };

  // Показуємо запит і дві кнопки вибору.
  return (
    <div className="game-ui__popup">
      Play with sound enabled?<br />
      <div className="game-ui__button" onClick={handleNoClick}>
        NO
      </div>
      <div className="game-ui__button" onClick={handleYesClick}>
        YES
      </div>
    </div>
  );
} 
