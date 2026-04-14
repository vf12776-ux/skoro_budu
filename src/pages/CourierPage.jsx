import { useState } from 'react';
import { useOrder } from '../contexts/OrderContext';
import { Map } from '../components/Map';

export const CourierPage = () => {
  const { orders, updateOrderStatus, addMessage, messages, updateCourierLocation } = useOrder();
  const [chatInput, setChatInput] = useState({});
  const courierId = 'courier1'; // имитация текущего курьера

  const courierOrders = orders.filter(o => o.courierId === courierId && o.status !== 'completed');

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
    <div style={{ padding: '20px' }}>
      <h2>Курьер: Активные заказы</h2>
      {courierOrders.length === 0 && <p>Нет активных заказов</p>}
      {courierOrders.map(order => (
        <div key={order.id} style={{ border: '1px solid blue', margin: 10, padding: 10 }}>
          <p>От: {order.from} → До: {order.to}</p>
          <p>Статус: {order.status}</p>
          <button onClick={() => handleSendLocation(order.id)}>Отправить моё местоположение</button>
          <button onClick={() => handleComplete(order.id)}>Завершить заказ</button>
          {order.courierLocation && (
            <p>Моё местоположение: {order.courierLocation.lat}, {order.courierLocation.lng}</p>
          )}
          <div>
            <h4>Чат с клиентом</h4>
            {(messages[order.id] || []).map((msg, i) => (
              <p key={i}><b>{msg.sender}:</b> {msg.text}</p>
            ))}
            <input
              value={chatInput[order.id] || ''}
              onChange={e => setChatInput({ ...chatInput, [order.id]: e.target.value })}
            />
            <button onClick={() => handleSendMessage(order.id)}>Отправить</button>
          </div>
        </div>
      ))}
    </div>
  );
};