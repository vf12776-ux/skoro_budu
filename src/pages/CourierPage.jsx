import { useState } from 'react';
import { useOrder } from '../contexts/OrderContext';

export const CourierPage = () => {
  const { orders, updateOrderStatus, addMessage, messages, updateCourierLocation } = useOrder();
  const [chatInput, setChatInput] = useState({});
  const [courierId, setCourierId] = useState(1);

  const courierOrders = orders.filter(o => Number(o.courierId) === Number(courierId) && o.status !== 'completed');

  const handleSendLocation = (orderId) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      updateCourierLocation(orderId, pos.coords.latitude, pos.coords.longitude);
    });
  };

  const handleComplete = (orderId) => {
    updateOrderStatus(orderId, 'completed');
  };

  const handleSendMessage = (orderId) => {
    const text = chatInput[orderId];
    if (text) {
      addMessage(orderId, text, 'courier');
      setChatInput({ ...chatInput, [orderId]: '' });
    }
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', marginBottom: 8 }}>🆔 ID курьера (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={courierId}
          onChange={e => setCourierId(Number(e.target.value))}
          style={{ width: 'auto', display: 'inline-block' }}
        />
      </div>

      <h3 style={{ marginBottom: 16 }}>🚚 Активные заказы</h3>
      {courierOrders.length === 0 && <div className="card">Нет активных заказов</div>}
      {courierOrders.map(order => (
        <div key={order.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 12 }}>
            <div><strong>От:</strong> {order.from}</div>
            <div><strong>До:</strong> {order.to}</div>
            <div><span className="role-badge">{order.status}</span></div>
          </div>
          {order.courierLocation && (
            <div style={{ fontSize: 14, color: '#555', marginBottom: 12 }}>📍 Ваша локация: {order.courierLocation.lat.toFixed(5)}, {order.courierLocation.lng.toFixed(5)}</div>
          )}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>💬 Чат с клиентом</div>
            <div style={{ background: '#f8f9fa', borderRadius: 12, padding: 12, maxHeight: 200, overflowY: 'auto', marginBottom: 8 }}>
              {(messages[order.id] || []).map((msg, i) => (
                <div key={i} style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
                  <strong>{msg.sender === 'courier' ? 'Вы' : 'Клиент'}:</strong>
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={chatInput[order.id] || ''} onChange={e => setChatInput({ ...chatInput, [order.id]: e.target.value })} placeholder="Сообщение..." />
              <button className="primary" onClick={() => handleSendMessage(order.id)}>Отправить</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="success" onClick={() => handleSendLocation(order.id)}>📍 Отправить геолокацию</button>
            <button className="danger" onClick={() => handleComplete(order.id)}>✅ Завершить заказ</button>
          </div>
        </div>
      ))}
    </div>
  );
};