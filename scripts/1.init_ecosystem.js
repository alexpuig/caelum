const GOVERNANCE = 'ws://127.0.0.1:9944';
const Caelum = require('../src/index');
require('dotenv').config();

// Main function.
const init = async () => {
  // Connect Caelum-SDK.
  const caelum = new Caelum(GOVERNANCE);
  await caelum.connect();

  // Connect as root.
  console.log(process.env.ROOT_SEED);
  // const root = await caelum.getOrganizationFromSeed(process.env.ROOT_SEED);
  const root = await caelum.getOrganizationFromSeed('//Alice');
  // await root.registerOrganization('CaelumLabs', 'B111', 2000);

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
