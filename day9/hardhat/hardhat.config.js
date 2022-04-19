/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-waffle');
const INFURA_URL = 'https://rinkeby.infura.io/v3/129f69456fe145e59fb7864f8531fdae';
const PRIVATE_KEY = '7f1f2d93501393218ced808d1100c90c36ddc39bd29d39d629cc0851026b7f62';

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby:{
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
