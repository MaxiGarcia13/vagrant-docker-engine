const { exec } = require('child_process');

module.exports = (command) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) reject(error);
      console.log(`➡ ${stdout}`);

      resolve(stdout);
    });
  });
