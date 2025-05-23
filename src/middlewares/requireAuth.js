const prisma = require('../config/db');
const { verifyToken } = require('../utils/jwt');

module.exports = async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);

    // Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Optional role match check
    const expectedRole = req.body.role || req.query.role || req.params.role;
    if (expectedRole && expectedRole.toUpperCase() !== user.role) {
      return res.status(403).json({ message: 'Access denied: Role mismatch' });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
