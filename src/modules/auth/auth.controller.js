const authService = require("./auth.service");

const login = async (req, res) => {
  try {
    const { username, password,role } = req.body;
    const result = await authService.login(username, password, role);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { login };
