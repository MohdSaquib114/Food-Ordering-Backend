const prisma = require('../config/db');

/**
 * Checks if the user's country matches the country of a resource
 * Example: restaurantId, orderId, etc.
 *
 * @param {object} options
 * @param {'restaurant' | 'order'} options.entity - Type of entity to check
 * @param {string} options.param - Param name from req.params or req.body
 */
module.exports = function enforceCountryEntity({ entity, param }) {
  return async function (req, res, next) {
    if (req.user.role === 'ADMIN') return next();

    const id = req.params[param] || req.body[param];
console.log(id)
    if (!id) return res.status(400).json({ message: `Missing ${param}` });

    let resource;
    if (entity === 'restaurant') {
      resource = await prisma.restaurant.findUnique({
        where: { id: Number(id) },
        select: { country: true },
      });
    } else if (entity === 'order') {
      resource = await prisma.order.findUnique({
        where: { id: Number(id) },
        select: {
          restaurant: {
            select: { country: true },
          },
        },
      });
    }

    if (!resource) return res.status(404).json({ message: `${entity} not found` });

    const resourceCountry = entity === 'order' ? resource.restaurant.country : resource.country;

    if (resourceCountry !== req.user.country) {
      return res.status(403).json({ message: 'Access denied by country restriction' });
    }

    next();
  };
};
