// prisma/generate.js

import { exec } from 'child_process';

const generatePrisma = () => {
  return new Promise((resolve, reject) => {
    const childProcess = exec('prisma generate');

    childProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    childProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    childProcess.on('error', (error) => {
      console.error(`Error: ${error.message}`);
      reject(error);
    });

    childProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Prisma Client generated successfully');
        resolve();
      } else {
        const errorMessage = `Prisma Client generation failed with code ${code}`;
        console.error(errorMessage);
        reject(new Error(errorMessage));
      }
    });
  });
};

export default generatePrisma;
