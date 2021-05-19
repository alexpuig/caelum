// const didDoc = require('./diddoc')
/* eslint-disable */
const { zencode_exec } = require('zenroom')
/* eslint-enable */

const zexecute = (zencode, data = {}, keys = {}) => {
  return new Promise((resolve, reject) => {
    // console.log(zencode, data, keys)
    const zkeys = JSON.stringify(keys)
    const zdata = JSON.stringify(data)
    console.log(zencode, zkeys, zdata)
    zencode_exec(zencode, {
      data: JSON.stringify(data),
      key: JSON.stringify(keys),
      conf: 'color=0, debug=0'
    })
      .then((result) => {
        resolve(JSON.parse(result.result))
      })
      .catch((error) => {
        console.log(error)
        reject(new Error(error))
      })
  })
}

/**
 * Javascript Class to interact with Zenroom.
 */
module.exports = class W3C {
  /**
   * New Blockchain KeyPair.
   *
   * @returns {object} Key pair
   */
  static async newKeys (did) {
    return new Promise((resolve, reject) => {
      const zencode = `
        Scenario 'ecdh': Create the keypair
        Given my name is in a 'string' named 'myName'
        When I create the keypair
        Then print my data`
      zexecute(zencode, { myName: did }).then(resolve)
    })
  }

  /**
   * New Blockchain KeyPair.
   *
   * @returns {object} Key pair
   */
  static async getKeys (keys) {
    return keys
  }

  static async signCredential (subject, issuer, keys, didDocument) {
    const signedVC = {}
    return signedVC
  }

  static async signMember (issuer, holder, subject, key) {
    return new Promise((resolve, reject) => {
      const credential = {
        'my-vc': {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://web.tabit.caelumapp.com/context/v1'
          ],
          type: ['VerifiableCredential', 'Member'],
          issuer: 'did:caelum:' + issuer,
          holder: holder,
          issuanceDate: new Date().toISOString(),
          credentialSubject: subject
        }
      }
      const zencode = `
        Scenario 'w3c' : sign
        Scenario 'ecdh' : keypair
        Given that I am '${issuer}'
        Given I have my 'keypair'
        Given I have a 'verifiable credential' named 'my-vc'
        Given I have a 'string' named 'PublicKeyUrl' inside '${issuer}'
        When I sign the verifiable credential named 'my-vc'
        When I set the verification method in 'my-vc' to 'PublicKeyUrl'
        Then print 'my-vc' as 'string'`
      const zkeys = key
      zkeys[issuer].PublicKeyUrl = 'https://apiroom.net/api/dyneorg/w3c-public-key'
      // console.log(zencode, key)
      zexecute(zencode, credential, zkeys)
        .then((result) => {
          console.log(result)
          resolve(result)
        })
        .catch((e) => {
          console.log(e)
          reject(e)
        })
    })
  }

  static async verifyCredential (verifiableCredential, issuer, keys, didDocument) {
    return true
  }
}
