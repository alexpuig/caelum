/* eslint-disable jest/no-try-expect */
'use strict'
const Caelum = require('.')
// const GOVERNANCE = 'wss://substrate.tabit.caelumapp.com'
const STORAGE = {
  url: 'localhost',
  port: 1984,
  protocol: 'http',
  testMode: true
}
let caelum, org
test('Constructor', async () => {
  caelum = await Caelum.connect(STORAGE)
  org = await caelum.newOrganization()

  // Caelum.
  expect(org.caelum.storage).toBeDefined()
  expect(org.caelum.testMode).toEqual(true)

  // Governance Keys. Substrate.
  expect(org.keys.governance).toBeDefined()
  expect(org.keys.governance.mnemonic).toBeDefined()
  expect(org.keys.governance.address).toBeDefined()
  expect(org.keys.governance.publicKey).toBeDefined()
  expect(org.keys.governance.keyPair).toBeDefined()

  // Storage Keys. Arweave.
  expect(org.keys.storage).toBeDefined()
  expect(org.keys.storage.key).toBeDefined()
  expect(org.keys.storage.key.kty).toBeDefined()
  expect(org.keys.storage.key.n).toBeDefined()
  expect(org.keys.storage.key.d).toBeDefined()
  expect(org.keys.storage.key.e).toBeDefined()

  // W3C Keys. Zenroom.
  expect(org.keys.w3c[org.did]).toBeDefined()
  expect(org.keys.w3c[org.did].keypair).toBeDefined()
  expect(org.keys.w3c[org.did].keypair.private_key).toBeDefined()
  expect(org.keys.w3c[org.did].keypair.public_key).toBeDefined()
})

test('Sign membership', async () => {
  const peerDid = 'ABC'
  const vc = await org.addMember(peerDid, 'admin')
  // console.log(vc)
  // const vc = 'hello'
  expect(vc).toBeDefined()
})

test('Save Org Information', async () => {
  await org.saveInformation({ name: 'test' }, 'open')
  expect(org.did).toBeDefined()
  // expect(org.keys.w3c[org.did]).toBeDefined()
  // const info = await org.getInformation()
})
