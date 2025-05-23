const prisma = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('../../utils/jwt');

const login = async (username, password, role) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error('Invalid username or password');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid username or password');

 
  if (user.role !== role.toUpperCase()) {
    throw new Error('Access denied: Role mismatch');
  }

  const token = jwt.generateToken({
    id: user.id,
    role: user.role,
    country: user.country,
  });

  return { token, user: { id: user.id, name: user.name, role: user.role } };
};

module.exports = { login };
