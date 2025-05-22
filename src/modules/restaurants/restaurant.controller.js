const restaurantService = require('./restaurant.service');

const getRestaurants = async (req, res) => {
  try {
    const role = req.user.role;
    const country = role === 'ADMIN' ? undefined : req.user.country;
    const restaurants = await restaurantService.getAllRestaurants(country);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
};

const getMenu = async (req, res) => {
  try {
    const menuItems = await restaurantService.getMenuByRestaurantId(req.params.id);
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch menu' });
  }
};

module.exports = { getRestaurants, getMenu };
