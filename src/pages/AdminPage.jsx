import { useState } from 'react';
import { useOrder } from '../contexts/OrderContext';

export const AdminPage = () => {
  const { orders, assignCourier, cancelOrder, deleteOrder } = useOrder();
  const [selectedCourier, setSelectedCourier] = useState({});

  const pendingOrders = orders.filter(o => !o.courierId && o.status === 'pending');

  const handleAssign = (orderId) => {
    const courier = selectedCourier[orderId];
    if (courier && courier !== '') {
      assignCourier(orderId, courier);
      setSelectedCourier({ ...selectedCourier, [orderId]: '' });
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>⏳ Заказы на назначение</h3>
      {pendingOrders.length === 0 && <div className="card">Нет заказов, ожидающих назначения</div>}
      {pendingOrders.map(order => (
        <div key={order.id} className="card">
          <div style={{ marginBottom: 12 }}>
            <div><strong>От:</strong> {order.from}</div>
            <div><strong>До:</strong> {order.to}</div>
            <div><strong>Локация:</strong> {order.location?.lat}, {order.location?.lng}</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              value={selectedCourier[order.id] || ''}
              onChange={e => setSelectedCourier({ ...selectedCourier, [order.id]: Number(e.target.value) })}
              style={{ width: 'auto', minWidth: 150 }}
            >
              <option value="">Выберите курьера</option>
              {[1,2,3,4,5].map(id => <option key={id} value={id}>Курьер {id}</option>)}
            </select>
            <button className="primary" onClick={() => handleAssign(order.id)}>Назначить</button>
          </div>
        </div>
      ))}

      <h3 style={{ margin: '32px 0 16px' }}>📦 Все заказы</h3>
      {orders.map(order => (
        <div key={order.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 8 }}>
            <div><strong>ID:</strong> {order.id}</div>
            <div><strong>Статус:</strong> <span className="role-badge">{order.status}</span></div>
            <div><strong>Курьер:</strong> {order.courierId || '—'}</div>
          </div>
          <div style={{ marginBottom: 12 }}>От: {order.from} → До: {order.to}</div>
          {order.rating && <div>⭐ Оценка: {order.rating}</div>}
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button className="danger" onClick={() => cancelOrder(order.id)}>❌ Отменить</button>
            <button className="secondary" onClick={() => deleteOrder(order.id)}>🗑️ Удалить</button>
          </div>
        </div>
      ))}
    </div>
  );
};