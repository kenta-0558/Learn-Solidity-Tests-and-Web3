const Web3 = require('web3');
const MyContract = require('./build/contracts/EventTest,json');

const init = async () => {

    const web3 = new Web3('http://localhost:9545');

    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );

    const addresses = await web3.eth.getAccounts();
    const receipt = await contract.methods.emitEvent('Kiichi').send({
        from: addresses[0]
    });

    console.log(receipt.events);
}

init();