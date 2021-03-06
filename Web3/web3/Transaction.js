// const Web3 = require("web3");
// const web3 = new Web3("http://localhost:8545");

// var Tx = require('ethereumjs-tx').Transaction;

// var privateKey = Buffer.from('0xAe71f2290e814157f880c109DBD5019f57D21836', 'hex');
// console.log(privateKey);
// // const address1 = "0xAe71f2290e814157f880c109DBD5019f57D21836";
// // const address2 = "0xa26964414C73B3dB1d8D2141690EE07caB82e1F3";

// var rawTx = {
//     nonce: '0x00',
//     gasPrice: '0x09184e72a000',
//     gasLimit: '0x2710',
//     to: '0x0000000000000000000000000000000000000000',
//     value: '0x00',
//     data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
// };

// var tx = new Tx(rawTx, {'chain':'ropsten'});
// tx.sign(privateKey);

// var serializedTx = tx.serialize();

// web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
// .on('receipt', console.log);

var Tx = require('ethereumjs-tx');

const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');

const account1 = '0xB65717185a8c70330f1Cfe9D18004147EFB77e13';
const account2 = '0x4791e89831e28Bf106Fe880F11Ac47DBFA8DE2DC';
// const newAccount1 = web3.eth.accounts.create();
// const newAccount2 = web3.eth.accounts.create();

// const account1 = newAccount1.address;
// const account2 = newAccount2.address;

// const privateKey1 = newAccount1.privateKey;
// const privateKey2 = newAccount2.privateKey;

const privateKey1Buffer = Buffer.from("f63c6c989dd58fe6c6cbdeb47c0a27e3ad2a87b3bd0fe3d07ae4284f9be3cc7f", 'hex');
const privateKey2Buffer = Buffer.from("f290141e9f89a7bcd31f595c1c6cdd4de456a7706bf57fb3162e991415416dc4", 'hex');

console.log('Buffer 1: ', privateKey1Buffer);
console.log('Buffer 2: ', privateKey2Buffer);

web3.eth.getTransactionCount(account1, (err, txCount) => {

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       account2,
        value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    };

    const tx = new Tx.Transaction(txObject);
    tx.sign(privateKey1Buffer);

    const serializedTx = tx.serialize().toString('hex');
    const raw = '0x' + serializedTx.toString('hex');

    console.log('tx :', tx);
    console.log('serializedTx :', serializedTx);
    console.log('raw :', raw);
})