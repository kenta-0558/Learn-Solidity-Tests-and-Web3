const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

const init = async () => {
    
    const EventsContract = require('./build/contracts/Events.json');
    
    const id = await web3.eth.net.getId();
    const deployedNetwork = EventsContract.networks[id];

    const contract = new web3.eth.Contract(
        EventsContract.abi,
        deployedNetwork.address
    );

    // console.log(contract);

    const addresses = await web3.eth.getAccounts();
    const receipt = await contract.methods.emitEvent('Kiichi').send({
        from: addresses[0]
    });

    console.log(receipt.events);

    await contract.methods.emitEvent('Ichina').send({
        from: addresses[0]
    });

    const results = await contract.getPastEvents(
        'MyEvent',
        {fromBlock: 0}
    );

    // console.log(results);
    const results2  = await contract.getPastEvents(
        'MyEvent',
        {
            filter: {
                value: 'kiichi'
            },
            fromBlock: 0
        }
    );
}

init();