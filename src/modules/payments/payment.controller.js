const service = require('./payment.service');

const getMethods = async (req, res) => {
  try {
    const methods = await service.getAllPaymentMethods(req.user);
    res.json(methods);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching methods' });
  }
};

const addMethod = async (req, res) => {
  try {
    const newMethod = await service.addPaymentMethod(req.user.id, req.body);
    res.status(201).json(newMethod);
  } catch (err) {
    res.status(400).json({ message: 'Error adding method' });
  }
};

const updateMethod = async (req, res) => {
    console.log("object")
  try {
    const { id } = req.params;
    console.log(id)
    const { type, details } = req.body;
    const updated = await service.updatePaymentMethod(
      parseInt(id),
      req.user.id,
      { type, details }
    );
    res.json(updated);
  } catch (err) {
    console.error('Update payment method error:', err);
    res.status(400).json({ message: err.message || 'Failed to update' });
  }
};

module.exports = { getMethods, addMethod, updateMethod };
