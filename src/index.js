import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 이 줄이 있어야 스타일이 화면에 나타납니다!
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);