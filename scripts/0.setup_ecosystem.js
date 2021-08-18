const GOVERNANCE = 'ws://127.0.0.1:9944';
const Caelum = require('../src/index');

// Main function.
const init = async () => {
  // Connect Caelum-SDK.
  const caelum = new Caelum(GOVERNANCE);
  await caelum.connect();

  // New keys for token admin. Get some gas.
  const tokenAdmin = await caelum.newKeys();
  await caelum.sendGas('//Alice', tokenAdmin.address);
  console.log('Admin:' + tokenAdmin.address);

  // Register Token.
  await caelum.registerToken(tokenAdmin.mnemonic, 2, 'Caelum Ecosistem', 'CLAB2', 10000);
  console.log('Admin:' + tokenAdmin.mnemonic);
  console.log('Token', await caelum.getTokenDetails(2));

  // Disconnect.
  await caelum.disconnect();
};

/*
* Main
*/
const main = async () => {
  await init();
};

main();
