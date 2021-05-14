const TestWeave = require('testweave-sdk').default
const Arweave = require('arweave')

/**
 * Javascript Class to interact with Arweave.
 */
module.exports = class Storage {
  /*
   * Constructor
   *
   * @param {string} connectUrl Connection URL
   * @param {integer} port Connection port
   * @param {string} protocol Connection protocol
   */
  constructor (test = false) {
    this.test = test
    this.arweave = false
    this.testWeave = false
  }

  /*
   * Connect to arweave node.
   */
  async connect (connectUrl = 'localhost', port = 1984, protocol = 'https') {
    console.log(connectUrl, port, protocol)
    this.connectUrl = connectUrl
    this.port = port
    this.protocol = protocol
    this.arweave = Arweave.init({
      host: this.connectUrl,
      port: this.port,
      protocol: this.protocol
    })

    // TEST MODE.
    if (this.test) {
      console.log('Init test')
      this.testWeave = await TestWeave.init(this.arweave)
    }
  }

  /**
   * Calculate DID
   * @returns {string} DID
   */
  async newKeys () {
    const key = await this.arweave.wallets.generate()
    const address = await this.arweave.wallets.jwkToAddress(key)
    return ({ key, address })
  }

  async save (vc, did, type, index, key) {
    const txData = JSON.stringify(vc)
    console.log('save', txData, type, index, did, this.testWeave.rootJWK)
    let transaction = await this.arweave.createTransaction({ data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>' }, this.testWeave.rootJWK)
    transaction = await this.arweave.createTransaction({ data: 'Hello world' }, key)
    console.log('save2')
    transaction.addTag('Content-Type', 'text/json')
    transaction.addTag('did', did)
    transaction.addTag('index', index)
    transaction.addTag('type', type)
    await this.arweave.transactions.sign(transaction, key)
    console.log('save3')
    const response = await this.arweave.transactions.post(transaction)
    return (response === 200)
  }
}
