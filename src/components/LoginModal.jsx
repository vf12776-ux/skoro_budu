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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '300px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}>
        <h3 style={{ marginTop: 0 }}>Вход для курьера</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Логин</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ background: '#007bff', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Войти</button>
            <button type="button" onClick={onClose} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};