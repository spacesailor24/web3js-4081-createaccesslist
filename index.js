const Web3 = require('web3');
const contractData = require('./contractData.json');

const web3 = new Web3('http://127.0.0.1:8545');
var proposalNames = ["0x63616e6469646174653100000000000000000000000000000000000000000000","0x6332000000000000000000000000000000000000000000000000000000000000","0x6333000000000000000000000000000000000000000000000000000000000000"];
var ballotContract = new web3.eth.Contract(contractData.abi);

(async () => {
    var ballot = await ballotContract.deploy({
        data: contractData.bytecode,
        arguments: [proposalNames]
   }).send({
        from: '0xf1ac0ea200ec2ee1e25081ef14717a572edda87e', 
        gas: '4700000'
      })
    console.log('Contract Address: ', ballot.options.address);

    const accessList = await ballot.methods.proposals(1).createAccessList({ from: '0xf1ac0ea200ec2ee1e25081ef14717a572edda87e', gas: '0x3b9aca00' });
    console.log('Access List: ', JSON.stringify(accessList, null, 4))
})()