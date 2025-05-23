const prisma = require('../../config/db');

const createOrder = async (userId, items) => {
  return await prisma.order.create({
    data: {
      userId,
      status: 'PENDING',
      orderItems: {
        create: items.map(item => ({
          menuItemId: item.id,
          restaurantId: item.restaurantId,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      orderItems: true,
    },
  });
};


const checkoutOrder = async (orderId, paymentMethodId, user) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          restaurant: true,
        },
      },
    },
  });

  if (!order) throw new Error("Order not found");

  if (user.role !== "ADMIN") {
    const unauthorized = order.orderItems.some(
      (item) => item.restaurant.country !== user.country
    );
    if (unauthorized) throw new Error("Access denied");
  }

  // Optional: Validate paymentMethodId belongs to user
  if (paymentMethodId) {
    const payment = await prisma.paymentMethod.findFirst({
      where: {
        id: paymentMethodId,
        userId: user.id,
      },
    });
    if (!payment) throw new Error("Invalid payment method");
  }

  // Mark order as paid
  return await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "PAID",
    },
  });
};

const getOrders = async (user) => {
  const filters = {};

  if (user.role === 'MANAGER') {
    // Only include orders that have at least one item from a restaurant in the user's country
    filters.orderItems = {
      some: {
        restaurant: {
          country: user.country,
        },
      },
    };
  } else if (user.role === 'MEMBER') {
    filters.userId = user.id;
  }

  return await prisma.order.findMany({
    where: filters,
    include: {
      user: {
        select: { id: true, name: true, role: true },
      },
      orderItems: {
        include: {
          menuItem: true,
          restaurant: {
            select: { id: true, name: true, country: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};


const cancelOrder = async (orderId, user) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          restaurant: true,
        },
      },
    },
  });

  if (!order) throw new Error('Order not found');

  if (user.role !== 'ADMIN') {
    const hasOtherCountryItem = order.orderItems.some(
      (item) => item.restaurant.country !== user.country
    );

    if (hasOtherCountryItem) {
      throw new Error('Access denied: Cannot cancel order with items outside your country');
    }
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'CANCELLED',
    },
  });
};

module.exports = {
  createOrder,
  checkoutOrder,
  getOrders,
  cancelOrder,
};
