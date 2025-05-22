const prisma = require('../../config/db');

// Get user by ID (with selected fields)
const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      country: true,
      createdAt: true,
    },
  });
};

// Get all users (Admin only)
const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      country: true,
      createdAt: true,
    },
  });
};

// Delete user by ID
const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

module.exports = {
  getUserById,
  getAllUsers,
  deleteUser,
};
