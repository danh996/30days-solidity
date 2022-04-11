const Migrations = artifacts.require("Migrations");
const Day3TokenSale = artifacts.require("Day3TokenSale");

module.exports = function(deployer) {
   deployer.deploy(Migrations);
   deployer.deploy(Day3TokenSale);
};