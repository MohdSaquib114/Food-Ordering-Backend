const prisma = require('../../config/db');

const getAllRestaurants = async (country) => {
  return await prisma.restaurant.findMany({
    where: { country },
    include: { menuItems: true },
  });
};

const getMenuByRestaurantId = async (restaurantId) => {
  return await prisma.menuItem.findMany({
    where: { restaurantId: Number(restaurantId) },
  });
};

module.exports = {
  getAllRestaurants,
  getMenuByRestaurantId,
};
