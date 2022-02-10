const exec = require('./exec');
const { getLocations } = require('./locations');

(async () => {
  try {
    console.log('🏗  Up vagrant');

    const { scriptLocation, currentDirectory } = await getLocations();

    const moveToScriptLocation = `cd ${scriptLocation} && cd ..`;
    const moveToCurrentDirectory = `cd ${currentDirectory}`;
    const ssh_add = 'ssh-add --apple-use-keychain ./.vagrant/machines/default/virtualbox/private_key';

    await exec(`${moveToScriptLocation} && vagrant up && ${ssh_add} && ${moveToCurrentDirectory}`);

    console.log('☑️ Succes');
  } catch (error) {
    console.log(error);
  }
})();
