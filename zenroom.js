const {zencode_exec} = require("zenroom");

const zencode = `
Scenario 'w3c' : sign
            Scenario 'ecdh' : keypair
            Given that I am '5FxNamk4Qq3iJnncBL2hscaAxVauDuaNWxPrATNLgkZc7s9e'
            Given I have my 'keypair'
            Given I have a 'verifiable credential' named 'my-vc'
            Given I have a 'string' named 'PublicKeyUrl' inside '5FxNamk4Qq3iJnncBL2hscaAxVauDuaNWxPrATNLgkZc7s9e'
            When I sign the verifiable credential named 'my-vc'
            When I set the verification method in 'my-vc' to 'PublicKeyUrl'
            Then print 'my-vc' as 'string'
`

const keys = JSON.stringify(
{ '5FxNamk4Qq3iJnncBL2hscaAxVauDuaNWxPrATNLgkZc7s9e': {
        keypair: {
          private_key: '/LEiG/lS3uwgqjKCs4b6KtgCbU+g/iQ6n2zoMU6QaSk=',
          public_key: 'BJQkRVmxeGpAIFrUjy+VWfPji+M68suPQqww4T21ub8I+Mofz/lZdGey7VnHStvKXXp7rmnC6db1Jwfx2iHXQpg='
        },
        PublicKeyUrl: 'https://apiroom.net/api/dyneorg/w3c-public-key'
      } }
)

const data = JSON.stringify(
{ 'my-vc': {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://web.tabit.caelumapp.com/context/v1'
        ],
        type: [ 'VerifiableCredential', 'Member' ],
        issuer: 'did:caelum:5FxNamk4Qq3iJnncBL2hscaAxVauDuaNWxPrATNLgkZc7s9e',
        holder: 'ABC',
        issuanceDate: '2021-05-17T13:52:34.537Z',
        credentialSubject: { sphere: 'professional', capacity: 'admin' }
      } }
)

const conf = 'color=0,debug=0'

zencode_exec(zencode, { data, keys, conf }).then(r => {
  console.log(r)
}).catch((error) => {
  console.log(error)
})
