# caelum
Caelum is a mix of different Blockchain technologies
- arewave: Public Storage for SSI
- substrate: Governance and Interoperability
- Idspace: container in the cloud with the SSI Process Manager software. One for every organization.

## Organizations
Every organization is represented on arweave (storage) and verified in substrate (governance)

Nodes in the ecosystem with an Idspace. They are organizations with our Caelum interoperable process manager.
It is also possible to create pools of Organizations inside one Idspace.

# Create our first organization
Organizations in Caelum is the way to manage public information about:

- Organization public Information : address, contact...
- Did Documents: DID document with information on how to verify Credentials signed by the org.
- Certificates: Certificates issuable by this organization.
- Integrity: Hashes of documents created by this organization.

```javascript
const Caelum = require("caelum")
const GOVERNANCE = 'wss://substrate.tabit.caelumapp.com'
const STORAGE = 'https://tabit.arweave.com/'
const caelum = new Caelum(STORAGE, GOVERNANCE)

const org = await caelum.newOrganization()
```

This will generate three different keypairs dor this organization
1. governance : Substrate keypair.
2. storage : Arewave keypair.
3. w3c : Zenroom keypair.

# Cryptography
We base caelum in polkadot cryptography libraries.
One ecosystem has these elements

- Governor
- Trust Agents
- Organizations

## Governor
It’s the root of Authority in the ecosystem. It’s designed to disappear in time when the ecosystem grows to be replaced by community governance.

## Trust Agents
Nodes in the ecosystem with an Idspace. They are organizations with the capacity to add more organizations to the ecosystem.



# Test
Launch first the docker with bigchainDB
```shell
./scripts/bigchaindb
yarn run test
```
