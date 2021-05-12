// Utils.
const utils = require('./utils')

// Caelum Lib.
const Caelum = require('../src/index')
const Blockchain = require('../src/utils/substrate')
const Crypto = Caelum.loadCrypto()

// Constants
const GOVERNANCE = 'wss://substrate.tabit.caelumapp.com'
const STORAGE = 'https://api.bigchaindb.caelumapp.com/api/v1/'
let pool

// Main function.
const load = async (did) => {
    return new Promise((resolve) => {

  const caelum = new Caelum(STORAGE, GOVERNANCE)
  caelum.loadOrganization(did)
    .then(result => {
      pool = result
      return Promise.all([
        pool.loadInformation(),
        pool.loadApplications(),
        pool.loadCertificates(),
        pool.searchCertificates()])
    })
    .then((result) => {
      resolve()
    })
  })
}

/**
* Main
**/
const main = async () => {
  utils.start()
  const did = await utils.ask('Did')
  await load(did)
  utils.end()
}
main()
