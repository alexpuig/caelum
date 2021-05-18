const TestWeave = require('testweave-sdk').default
const Arweave = require('arweave')

const main = async () => {
  const arweave = Arweave.init({
    host: '127.0.0.1',
    port: 1984,
    protocol: 'http'
  })

  const key = await arweave.wallets.generate()
  const address = await arweave.wallets.jwkToAddress(key)
  console.log(address)
  const testWeave = await TestWeave.init(arweave)
  const data = JSON.stringify({ name: 'Alex' })
//  const dataTransaction = await arweave.createTransaction({ data }, testWeave.rootJWK)

  await arweave.transactions.sign(dataTransaction, testWeave.rootJWK)
  const statusBeforePost = await arweave.transactions.getStatus(dataTransaction.id)
  console.log(statusBeforePost) // this will return 404
  await arweave.transactions.post(dataTransaction)
  const statusAfterPost = await arweave.transactions.getStatus(dataTransaction.id)
  console.log(statusAfterPost) // this will return 202
  await testWeave.mine()
  console.log('mined')
  const statusAfterMine = await arweave.transactions.getStatus(dataTransaction.id)
  console.log(statusAfterMine) // this will return 200
}

main()
