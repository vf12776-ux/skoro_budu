import { useState } from 'react';
import { useOrder } from '../contexts/OrderContext';
import { Map } from '../components/Map';

export const ClientPage = () => {
  const { orders, addOrder, addMessage, messages, rateOrder } = useOrder();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedLat, setSelectedLat] = useState(null);
  const [selectedLng, setSelectedLng] = useState(null);
  const [chatInput, setChatInput] = useState({});
  const [rating, setRating] = useState({});

  const handleCreateOrder = () => {
    console.log('Создание заказа:', { from, to, selectedLat, selectedLng });
    if (from && to && selectedLat && selectedLng) {
      addOrder({ from, to, location: { lat: selectedLat, lng: selectedLng } });
      setFrom('');
      setTo('');
      setSelectedLat(null);
      setSelectedLng(null);
    }
  };

  const handleSendMessage = (orderId) => {
    const text = chatInput[orderId];
    if (text) {
      addMessage(orderId, text, 'client');
      setChatInput({ ...chatInput, [orderId]: '' });
    }
  };

  const handleRate = (orderId, value) => {
    rateOrder(orderId, value);
    setRating({ ...rating, [orderId]: value });
  };

  const clientOrders = orders.filter(o => !o.courierId); // только не назначенные

  return (
    <div style={{ padding: '20px' }}>
      <h2>Клиент: Создать заказ</h2>
      <input placeholder="Откуда" value={from} onChange={e => setFrom(e.target.value)} />
      <input placeholder="Куда" value={to} onChange={e => setTo(e.target.value)} />
      <Map
        onLocationSelect={(lat, lng) => { setSelectedLat(lat); setSelectedLng(lng); }}
      />
      <button onClick={handleCreateOrder}>Создать заказ</button>

      <h3>Мои заказы</h3>
      {clientOrders.map(order => (
        <div key={order.id} style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
          <p>От: {order.from} → До: {order.to}</p>
          <p>Статус: {order.status}</p>
          {order.courierLocation && (
            <p>Курьер: {order.courierLocation.lat}, {order.courierLocation.lng}</p>
          )}
          <div>
            <h4>Чат</h4>
            {(messages[order.id] || []).map((msg, i) => (
              <p key={i}><b>{msg.sender}:</b> {msg.text}</p>
            ))}
            <input
              value={chatInput[order.id] || ''}
              onChange={e => setChatInput({ ...chatInput, [order.id]: e.target.value })}
            />
            <button onClick={() => handleSendMessage(order.id)}>Отправить</button>
          </div>
          {order.status === 'completed' && !order.rating && (
            <div>
              <select onChange={e => handleRate(order.id, e.target.value)} defaultValue="">
                <option value="" disabled>Оцените</option>
                {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          )}
          {order.rating && <p>Ваша оценка: {order.rating}</p>}
        </div>
      ))}
    </div>
  );
};