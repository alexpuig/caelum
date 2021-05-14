// const didDoc = require('./diddoc')
const { zencodeExec } = require('zenroom')

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
      zencodeExec(zencode, { data: JSON.stringify({ myName: did }), keys: JSON.stringify({}), conf: 'color=0, debug=0' })
        .then((result) => {
          resolve(JSON.parse(result.result))
        })
        .catch((error) => {
          console.log(error)
          throw new Error(error)
        })
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

  static async signMember (issuer, holder, subject, keys, didDocument) {
    const credential = {
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
    // const signedVC = await vc.issue({ credential, suite, documentLoader })
    const signedVC = credential
    return signedVC
  }

  static async verifyCredential (verifiableCredential, issuer, keys, didDocument) {
    return true
  }
}
