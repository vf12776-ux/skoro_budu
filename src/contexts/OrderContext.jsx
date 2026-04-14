import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState({});

  const addOrder = (order) => {
    console.log('Добавлен заказ в контекст:', order);
    setOrders(prev => [...prev, { ...order, id: Date.now(), status: 'pending' }]);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const assignCourier = (orderId, courierId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, courierId, status: 'accepted' } : o));
  };

  const addMessage = (orderId, text, sender) => {
    setMessages(prev => ({
      ...prev,
      [orderId]: [...(prev[orderId] || []), { text, sender, timestamp: Date.now() }]
    }));
  };

  const updateCourierLocation = (orderId, lat, lng) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, courierLocation: { lat, lng } } : o));
  };

  const rateOrder = (orderId, rating) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, rating } : o));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      messages,
      addOrder,
      updateOrderStatus,
      assignCourier,
      addMessage,
      updateCourierLocation,
      rateOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};