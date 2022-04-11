const TokenSale = artifacts.require("TokenSale");

contract("TokenSale", function(accounts){
    var tokenInstance;

    it('Initializes the contract with the correct value', function(){
        return TokenSale.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name, "Token Sale", 'Has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol, "TSC", 'Has the correct symbol');
            return tokenInstance.standard();
        }).then(function(standard){
            assert.equal(standard, "Token Sale V1.0", 'Has the correct standard');
        });
    })

    it('set the total supply upon development', function(){
        return TokenSale.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 1000, 'set the total supply to 1.000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(), 1000, 'it allocates the initial supply to the admin account');
        });
    });
})