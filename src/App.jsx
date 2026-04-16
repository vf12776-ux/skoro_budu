import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { OrderProvider } from './contexts/OrderContext';
import { ClientPage } from './pages/ClientPage';
import { CourierPage } from './pages/CourierPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './components/LoginPage';

function App() {
  const [role, setRole] = useState('client'); // 'client', 'courier', 'admin'

  const handleLogin = (newRole) => {
    setRole(newRole);
  };

  const handleLogout = () => {
    setRole('client');
  };

  return (
    <OrderProvider>
      <BrowserRouter>
        <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          {role === 'client' && (
            <>
              <Link to="/" style={{ marginRight: '15px' }}>Клиент</Link>
              <button onClick={() => setRole('client')}>Выйти (клиент)</button>
            </>
          )}
          {role === 'courier' && (
            <>
              <Link to="/courier" style={{ marginRight: '15px' }}>Курьер</Link>
              <button onClick={handleLogout}>Выйти</button>
            </>
          )}
          {role === 'admin' && (
            <>
              <Link to="/admin" style={{ marginRight: '15px' }}>Админ</Link>
              <button onClick={handleLogout}>Выйти</button>
            </>
          )}
          {role === 'client' && (
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => setRole('login')}>Вход для курьера/админа</button>
            </div>
          )}
        </div>

        {role === 'login' ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <Routes>
            <Route path="/" element={role === 'client' ? <ClientPage /> : <div>Нет доступа</div>} />
            <Route path="/courier" element={role === 'courier' ? <CourierPage /> : <div>Нет доступа</div>} />
            <Route path="/admin" element={role === 'admin' ? <AdminPage /> : <div>Нет доступа</div>} />
          </Routes>
        )}
      </BrowserRouter>
    </OrderProvider>
  );
}

export default App;