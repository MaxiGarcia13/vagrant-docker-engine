const exec = require('./exec');
const { getLocations } = require('./locations');

(async () => {
  try {
    console.log('🚦 Down vagrant');

    const { scriptLocation, currentDirectory } = await getLocations();

    const moveToScriptLocation = `cd ${scriptLocation} && cd ..`;
    const moveToCurrentDirectory = `cd ${currentDirectory}`;

    await exec(`${moveToScriptLocation} && vagrant suspend && ${moveToCurrentDirectory}`);

    console.log('🚦 success');
  } catch (error) {
    console.log(error);
  }
})();
