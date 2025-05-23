const prisma = require('../../config/db');

const getAllPaymentMethods = async (user) => {
  if (user.role === 'ADMIN') {
    return await prisma.paymentMethod.findMany({ where: { userId: user.id } });
  }

  // Manager can view all admin methods
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  return await prisma.paymentMethod.findMany({ where: { userId: admin.id } });
};

const addPaymentMethod = async (userId, data) => {
  return await prisma.paymentMethod.create({
    data: {
      userId,
      type: data.type,
      details: data.details,
    },
  });
};

const updatePaymentMethod = async (paymentMethodId, userId, data) => {
  // Optional: Verify this payment method belongs to the user (for security)
  const existing = await prisma.paymentMethod.findUnique({
    where: { id: paymentMethodId },
  });

  if (!existing) {
    throw new Error('Payment method not found');
  }

  if (existing.userId !== userId) {
    throw new Error('Unauthorized to update this payment method');
  }

  return await prisma.paymentMethod.update({
    where: { id: paymentMethodId },
    data: {
      type: data.type,
      details: data.details, // must be valid JSON from the controller
    },
  });
};

module.exports = {
  getAllPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod ,
};
