'use strict'
const axios = require('axios')
const Storage = require('../utils/bigchaindb')
const Blockchain = require('../utils/substrate')
const Crypto = require('../utils/crypto')
const SDK = require('./sdk')

/**
 * User
 */
module.exports = class User {
  /**
   * Constructor. It creates a User object.
   */
  constructor (caelum, connections, credentials, orgs) {
    this.caelum = caelum
    this.connections = connections
    this.credentials = credentials
    this.orgs = orgs
    this.sessions = {}
  }

  /**
   * open an SDK Instance.
   */
  openSdK (did) {
    // Must be loggedIn
    const sdk = new SDK(this.caelum, did, this.sessions[did].tokenApi, this.orgs[did].endpoint)
    return sdk
  }

  /**
   * Register a new organization
   *
   * @param {object} org Organization to register with
   * @param {string} sessionId Session ID
   * @param {string} secretCode Secret Code
   */
  async register (org, sessionId, secretCode) {
    let signature
    return new Promise((resolve, reject) => {
      // Create new keys for the peerDID (connection ID)
      if (this.connections[org.did]) reject(new Error('organization already exists'))
      else {
        this.orgs[org.did] = org
        this.connections[org.did] = {}
        Blockchain.newKeys()
          .then(governanceKey => {
            this.connections[org.did].peerDid = governanceKey.address
            this.connections[org.did].governance = governanceKey.mnemonic
            signature = Crypto.u8aToHex(Crypto.signMessage(sessionId, governanceKey.keyPair))
            return Storage.getKeys(false)
          })
          .then(storageKey => {
            this.connections[org.did].storage = storageKey.mnemonic

            // Claim capacity from Idspace
            return axios.put(org.endpoint + 'auth/session', {
              action: 'register',
              peerDid: this.connections[org.did].peerDid,
              sessionId: sessionId,
              secret: secretCode,
              signature: signature,
              challenge: Crypto.hash(Crypto.random()).substring(2)
            })
          })
          .then((result) => {
            console.log(result.data)
            // Save to list of connections
            this.credentials[result.data.hashId] = {
              peerDid: this.connections[org.did].peerDid,
              did: org.did,
              subject: result.data.signedCredential
            }
            resolve(this.connections[org.did].peerDid)
          })
          .catch((err) => { console.log(err) })
      }
    })
  }

  /**
   * Register a new organization
   *
   * @param {object} org Organization to register with
   * @param {string} sessionId Session ID
   * @param {string} secretCode Secret Code
   */
  async registerConnectionString (connectionString, secretCode) {
    const connStr = connectionString.split('-')
    const org = await this.caelum.loadOrganization(connStr[2], connStr[1])
    return this.register(org, connStr[1], secretCode)
  }

  /**
   * Register a new organization
   *
   * @param {srting} did Organization to register with
   * @param {string} sessionId Session ID
   */
  async login (did, _sessionId = 0) {
    const sessionId = (_sessionId === 0) ? (await this.orgs[did].getSession()).sessionId : _sessionId
    const governanceKey = await Blockchain.getKeys(this.connections[did].governance)
    const signature = Crypto.u8aToHex(Crypto.signMessage(sessionId, governanceKey.keyPair))
    const postData = {
      action: 'login',
      peerDid: this.connections[did].peerDid,
      sessionId: sessionId,
      signature: signature,
      challenge: Crypto.hash(Crypto.random()),
      approved: true
    }
    return new Promise((resolve) => {
      axios.put(this.orgs[did].endpoint + 'auth/session', postData)
        .then((session) => {
          console.log('Go1')
          this.sessions[did] = session.data
          console.log('Go2', this.sessions[did])
          resolve(this.sessions[did])
        })
        .catch((e) => {
          console.log(e)
          resolve(false)
        })
    })
  }

  /**
  * Connection wit a connection String
  * @param {string} connectionString QR Code
  **/
  async loginConnectionString (connectionString) {
    const connStr = connectionString.split('-')
    return this.login(connStr[2], connStr[1])
  }

  /**
  * export
  **/
  async export () {
    const json = JSON.stringify(
      { connections: this.connections, credentials: this.credentials })
    return json
  }
}
