const TokenSale = artifacts.require("TokenSale");

contract("TokenSale", function(accounts){
    it('set the total supply upon development', function(){
        return TokenSale.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 1000, 'set the total supply to 1.000');
        });
    });
})