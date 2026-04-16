import { useState } from 'react';

export const LoginModal = ({ onLogin, onClose }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login === 'admin' && password === '12345') {
      onLogin('admin');
    } else {
      onLogin('courier');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="modal-title">🔐 Вход для курьера</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Логин</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Введите логин"
              autoFocus
            />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="primary">Войти</button>
            <button type="button" className="secondary" onClick={onClose}>Отмена</button>
          </div>
        </form>
        <p className="modal-hint">Администратор: admin / 12345<br />Курьер: любые данные</p>
      </div>
    </div>
  );
};