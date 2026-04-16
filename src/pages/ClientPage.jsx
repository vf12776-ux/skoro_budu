import { useState } from 'react';
import { useOrder } from '../contexts/OrderContext';
import { Map } from '../components/Map';

export const ClientPage = () => {
  const { orders, addOrder, addMessage, messages, rateOrder, cancelOrder,deleteOrder} = useOrder();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedLat, setSelectedLat] = useState(null);
  const [selectedLng, setSelectedLng] = useState(null);
  const [chatInput, setChatInput] = useState({});
  const [rating, setRating] = useState({});
  const [clientId, setClientId] = useState(1); // ID текущего клиента

  const handleCreateOrder = () => {
    if (from && to) {
      const lat = selectedLat !== null ? selectedLat : 55.751244;
      const lng = selectedLng !== null ? selectedLng : 37.618423;
      addOrder({ from, to, location: { lat, lng }, clientId }); // передаём clientId
      setFrom('');
      setTo('');
      setSelectedLat(null);
      setSelectedLng(null);
    } else {
      alert('Заполните поля "Откуда" и "Куда"');
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

  // Фильтруем заказы только текущего клиента
  const clientOrders = orders.filter(o => o.clientId === clientId);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label>ID клиента (1-10): </label>
        <input
          type="number"
          min="1"
          max="10"
          value={clientId}
          onChange={e => setClientId(Number(e.target.value))}
          style={{ marginLeft: '10px' }}
        />
      </div>
      <h2>Клиент: Создать заказ</h2>
      <input placeholder="Откуда" value={from} onChange={e => setFrom(e.target.value)} />
      <input placeholder="Куда" value={to} onChange={e => setTo(e.target.value)} />
      <Map onLocationSelect={(lat, lng) => { setSelectedLat(lat); setSelectedLng(lng); }} />
      <button onClick={handleCreateOrder}>Создать заказ</button>

      <h3>Мои заказы</h3>
      {clientOrders.length === 0 && <p>Нет заказов</p>}
      {clientOrders.map(order => (
        <div key={order.id} style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
          <p>От: {order.from} → До: {order.to}</p>
          <p>Статус: {order.status}</p>
          {order.courierLocation && (
            <p>Курьер: {order.courierLocation.lat}, {order.courierLocation.lng}</p>
          )}
          {order.status !== 'completed' && order.status !== 'cancelled' && (
  <button onClick={() => cancelOrder(order.id)} style={{ marginLeft: '10px', backgroundColor: 'red' }}>
    Отменить заказ
  </button>
)}
{order.status === 'completed' && (
  <button onClick={() => deleteOrder(order.id)} style={{ marginLeft: '10px', backgroundColor: 'gray', color: 'white' }}>
    Удалить из истории
  </button>
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