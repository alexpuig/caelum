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
test('Authorised Capabilities', async () => {
  const credential = org.newAuthorisedCapability('ABC', 1, 'admin')
  expect(credential).toBeDefined()
  expect(credential.issuanceDate).toBeDefined()
  expect(credential.holder).toEqual('ABC')
  expect(credential.issuer).toEqual('did:caelum:' + org.did)
  expect(credential.id).toEqual('did:caelum:' + org.did + '#issued')
  expect(credential.credentialSubject.id).toEqual('did:caelum:' + org.did + '#issued-1')
  expect(credential.credentialSubject.capability.type).toEqual('admin')
  expect(credential.credentialSubject.capability.sphere).toEqual('professional')
  expect(credential.credentialSubject.capability.location).toBeUndefined()
})

test('Sign membership', async () => {
  const credential = org.newAuthorisedCapability('ABC', 1, 'admin')
  const vc = await org.signCredential(credential)
  expect(vc).toBeDefined()
  expect(vc.credentialSubject).toBeDefined()
  expect(vc.proof).toBeDefined()
  let result = await org.verifyCredential(vc)
  expect(result).toEqual(true)
  vc.holder = 'HHA'
  result = await org.verifyCredential(vc)
  expect(result).toEqual(false)
})

test('Save Org Information', async () => {
  // await org.saveInformation({ name: 'test' }, 'open')
  expect(org.did).toBeDefined()
  // expect(org.keys.w3c[org.did]).toBeDefined()
  // const info = await org.getInformation()
})
