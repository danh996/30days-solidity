require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString();
const projectId = '129f69456fe145e59fb7864f8531fdae';

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts:[privateKey]

    }
  },

  solidity: "0.8.4",
};
