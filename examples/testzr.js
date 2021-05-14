const { zenroom_exec, zencode_exec } = require('zenroom')
// or if you don't use >ES6
// const { zenroom_exec, zencode_exec } = require('zenroom')


// Zencode: generate a random array. This script takes no extra input

const zencodeRandom = `
Scenario 'ecdh': Create the keypair
Given that I am known as 'Alice'
When I create the keypair
Then print my data`
    
zencode_exec(zencodeRandom)
    .then((result) => {
        console.log(JSON.parse(result.result))
	})
    .catch((error) => {
        throw new Error(error);
    });
