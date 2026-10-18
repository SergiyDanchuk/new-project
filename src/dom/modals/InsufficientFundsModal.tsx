import React from 'react';

interface InsufficientFundsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

// Повідомляємо гравцеві, що балансу не вистачає на наступну ставку.
export default function InsufficientFundsModal({ isVisible, onClose }: InsufficientFundsModalProps) {
  // Нічого не відображаємо, поки вікно закрите.
  if (!isVisible) return null;

  // Закриваємо вікно й перезавантажуємо демогру, щоб скинути початковий баланс.
  const handleOkClick = () => {
    onClose();
    location.reload();
  };

  // Показуємо повідомлення про баланс і кнопку підтвердження.
  return (
    <div className="game-ui__popup">
      Insufficient funds<br />
      Top up your balance to continue
      <div className="game-ui__button" onClick={handleOkClick}>
        OK
      </div>
    </div>
  );
} 
