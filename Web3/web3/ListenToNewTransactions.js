const Web3 = require('web3');
const web3 = new Web3("https://mainnet.infura.io/v3/cf78b0d0d1b6495abc36b4d30ef932ca");

let latestKnownBlockNumber = -1;
let blockTime = 5000;

const processBlock = async (blockNumber) => {

    console.log("We process block: " + blockNumber);
    latestKnownBlockNumber = blockNumber;

    const block = await web3.eth.getBlock(blockNumber);
    console.log("new block : ", block);

    for (const transactionHash of block.transactions) {
        let transaction = await web3.eth.getTransaction(transactionHash);
        console.log("Transaction: ", transaction);
        let transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
        transaction = Object.assign(transaction, transactionReceipt);
        console.log("Transaction with Receiptpre: ", transaction);
    }
} 

const checkCurrentBlock = async () => {
    const currentBlockNumber = await web3.eth.getBlockNumber();
    console.log("Current blockchain top: " + currentBlockNumber, " Script is at: " + latestKnownBlockNumber);
    while(latestKnownBlockNumber == -1 || currentBlockNumber > latestKnownBlockNumber) {
        await processBlock(latestKnownBlockNumber == -1 ? currentBlockNumber : latestKnownBlockNumber + 1);     
    }
    setTimeout(checkCurrentBlock, blockTime);
}

checkCurrentBlock();

