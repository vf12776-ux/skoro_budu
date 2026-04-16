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
    <div style={{ padding: '20px' }}>
      <h2>Администратор: Назначение курьеров</h2>
      {pendingOrders.length === 0 && <p>Нет заказов ожидающих назначения</p>}
      {pendingOrders.map(order => (
        <div key={order.id} style={{ border: '1px solid green', margin: 10, padding: 10 }}>
          <p>ID: {order.id}</p>
          <p>От: {order.from} → До: {order.to}</p>
          <p>Локация: {order.location?.lat}, {order.location?.lng}</p>
          <select
            value={selectedCourier[order.id] || ''}
            onChange={e => setSelectedCourier({ ...selectedCourier, [order.id]: Number(e.target.value) })}
          >
            <option value="">Выберите курьера</option>
            <option value={1}>Курьер 1</option>
            <option value={2}>Курьер 2</option>
            <option value={3}>Курьер 3</option>
            <option value={4}>Курьер 4</option>
            <option value={5}>Курьер 5</option>
          </select>
          <button onClick={() => handleAssign(order.id)}>Назначить</button>
        </div>
      ))}

      <h3>Все заказы</h3>
      {orders.map(order => (
        <div key={order.id} style={{ border: '1px solid gray', margin: 5, padding: 5 }}>
          <p>ID: {order.id} | Статус: {order.status} | Курьер: {order.courierId || '—'}</p>
          <button onClick={() => cancelOrder(order.id)}>Отменить</button>
<button onClick={() => deleteOrder(order.id)} style={{ marginLeft: '10px' }}>Удалить</button>
          {order.rating && <p>Оценка: {order.rating}</p>}
        </div>
      ))}
    </div>
  );
};