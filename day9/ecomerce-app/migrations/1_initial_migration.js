const Dai = artifacts.require("Dai");
const Payment = artifacts.require('PaymentContract');

module.exports = async function (deployer, network, address) {
  const [payment, payer, _] = addresses;
  if(network === 'develop'){
    deployer.deploy(Dai);
  }
  
};
