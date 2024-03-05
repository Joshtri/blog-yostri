// prisma/handler.js

import generatePrisma from './generate.js';

const handleGeneratePrisma = async (req, res) => {
  try {
    await generatePrisma();
    res.status(200).json({ message: 'Prisma Client generated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Prisma Client' });
  }
};

export default handleGeneratePrisma;
