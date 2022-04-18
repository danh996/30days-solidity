const ContractA = artifacts.require("ContractA");
const ContractB = artifacts.require("ContractB");

module.exports = async function (deployer, network, accounts) {
  const [admin, _] = accounts;//get first account of accounts table

  if(network === 'bscTestnet' || network === 'develop' ){
    await deployer.deploy(ContractA, admin);
    const contractA = await ContractA.deployed();
    await deployer.deploy(ContractB, admin, contractA.address);
  }

  if(network === 'bsc'){
    //deployment logic for mainet
  }
};

//0x54545eb5e1d2294767C5275B479e0C00f4e49Dc3
//miss figure music chair curtain tower trim spice dog door little still
