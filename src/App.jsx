import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { OrderProvider } from './contexts/OrderContext';
import { ClientPage } from './pages/ClientPage';
import { CourierPage } from './pages/CourierPage';
import { AdminPage } from './pages/AdminPage';
import { LoginModal } from './components/LoginModal';

function App() {
  const [role, setRole] = useState('client');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (newRole) => {
    setRole(newRole);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setRole('client');
  };

  return (
    <OrderProvider>
      <BrowserRouter>
        <div style={{
          padding: '10px 20px',
          background: '#f8f9fa',
          borderBottom: '1px solid #dee2e6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            {role === 'client' && <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Клиент</span>}
            {role === 'courier' && <Link to="/courier" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff' }}>Курьер</Link>}
            {role === 'admin' && <Link to="/admin" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff' }}>Админ</Link>}
          </div>
          <div>
            {role === 'client' && (
              <button onClick={() => setShowLogin(true)} style={{
                padding: '6px 12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>Курьер / Админ</button>
            )}
            {(role === 'courier' || role === 'admin') && (
              <button onClick={handleLogout} style={{
                padding: '6px 12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>Выйти</button>
            )}
          </div>
        </div>

        {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}

        <Routes>
          <Route path="/" element={role === 'client' ? <ClientPage /> : <div style={{ padding: '20px' }}>Нет доступа</div>} />
          <Route path="/courier" element={role === 'courier' ? <CourierPage /> : <div style={{ padding: '20px' }}>Нет доступа</div>} />
          <Route path="/admin" element={role === 'admin' ? <AdminPage /> : <div style={{ padding: '20px' }}>Нет доступа</div>} />
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  );
}

export default App;