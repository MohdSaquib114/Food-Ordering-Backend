const userService = require('./user.service');

// GET /users/me
const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /users/:id (Admin only)
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /users/:id (Admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(Number(req.params.id));
    res.json({ message: 'User deleted', user });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getCurrentUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
