import React from 'react';
// Імпортуємо клієнтський рендерер React для запуску застосунку в браузері.
import ReactDOM from 'react-dom/client';
// Імпортуємо кореневий компонент застосунку.
import App from './App';

// Знаходимо HTML-елемент, відведений під React-застосунок.
const rootElement = document.getElementById('app');
// Запускаємо React, лише якщо потрібний кореневий елемент є на сторінці.
if (rootElement) {
  // Створюємо корінь React у знайденому елементі сторінки.
  const root = ReactDOM.createRoot(rootElement);
  // Відображаємо застосунок у StrictMode з додатковими перевірками розробки.
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
