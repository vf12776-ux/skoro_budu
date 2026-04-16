import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState({});

  // Загрузка заказов из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('orders');
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (err) {
        console.error('Ошибка загрузки заказов', err);
      }
    }
  }, []);

  // Сохранение заказов в localStorage
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Загрузка сообщений из localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (err) {
        console.error('Ошибка загрузки сообщений', err);
      }
    }
  }, []);

  // Сохранение сообщений в localStorage
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const addOrder = (order) => {
  console.log('Добавлен заказ в контекст:', order);
  setOrders(prev => [...prev, { 
    ...order, 
    id: Date.now(), 
    status: 'pending',
    clientId: order.clientId  // сохраняем ID клиента
  }]);
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
  const deleteOrder = (orderId) => {
  setOrders(prev => prev.filter(o => o.id !== orderId));
};
  const cancelOrder = (orderId) => {
  setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
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
      rateOrder,
      deleteOrder,
      cancelOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};