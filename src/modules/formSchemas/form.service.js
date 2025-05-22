const prisma = require('../../config/db');

const getAllForms = async () => {
  return await prisma.formSchema.findMany({
    include: {
      fields: true,
    },
  });
};

const getFormByName = async (name) => {
  return await prisma.formSchema.findUnique({
    where: { name },
    include: {
      fields: true,
    },
  });
};

module.exports = {
  getAllForms,
  getFormByName,
};
