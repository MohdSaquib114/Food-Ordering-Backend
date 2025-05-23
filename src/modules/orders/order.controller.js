const orderService = require('./order.service');

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'At least one item is required' });
    }

    const order = await orderService.createOrder(req.user.id, items);
    res.status(201).json(order);
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
};


const checkoutOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentMethodId } = req.body;

    if (!paymentMethodId) {
      return res.status(400).json({ message: 'Payment method required' });
    }

    const result = await orderService.checkoutOrder(
      Number(orderId),
      Number(paymentMethodId),
      req.user
    );

    res.json({ message: 'Order paid', order: result });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(400).json({ message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders(req.user);
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const result = await orderService.cancelOrder(Number(req.params.id), req.user);
    res.json({ message: 'Order cancelled', order: result });
  } catch (err) {
    console.error('Cancel order error:', err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createOrder,
  checkoutOrder,
  getOrders,
  cancelOrder,
};