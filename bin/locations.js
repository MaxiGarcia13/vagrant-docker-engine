const exec = require('./exec');

const getLocations = async () => {
  const scriptLocation = __dirname;
  const currentDirectory = await exec('pwd');

  return {
    scriptLocation,
    currentDirectory,
  };
};

module.exports = {
  getLocations,
};
