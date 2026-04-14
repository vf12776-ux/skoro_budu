import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { OrderProvider } from './contexts/OrderContext';
import { ClientPage } from './pages/ClientPage';
import { CourierPage } from './pages/CourierPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <OrderProvider>
      <BrowserRouter>
        <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Клиент</Link>
          <Link to="/courier" style={{ marginRight: '15px' }}>Курьер</Link>
          <Link to="/admin">Админ</Link>
        </div>
        <Routes>
          <Route path="/" element={<ClientPage />} />
          <Route path="/courier" element={<CourierPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  );
}

export default App;