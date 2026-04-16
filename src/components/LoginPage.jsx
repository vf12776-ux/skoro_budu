import { useState } from 'react';

export const LoginPage = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Простая проверка (для демо)
    if (login === 'admin' && password === 'admin123') {
      onLogin('admin');
    } else if (login === 'courier' && password === 'courier123') {
      onLogin('courier');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
      <h2>Вход для курьера / администратора</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин: </label>
          <input value={login} onChange={e => setLogin(e.target.value)} />
        </div>
        <div>
          <label>Пароль: </label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};