const formService = require('./form.service');

const getAllForms = async (req, res) => {
  try {
    const forms = await formService.getAllForms();
    res.json(forms);
  } catch (err) {
    console.error('Error fetching forms:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getFormByName = async (req, res) => {
  try {
    const form = await formService.getFormByName(req.params.name);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (err) {
    console.error('Error fetching form:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllForms,
  getFormByName,
};
