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

    it('transfer token to ownership', function(){
        return TokenSale.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 9999);
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1], 10, {from: accounts[0]});
        }).then(function(succcess){
            assert.equal(succcess, true, 'it returns true');
            return tokenInstance.transfer(accounts[1], 10, {from: accounts[0]});
        }).then(function(receipt){

            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transfered from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transfered to');
            assert.equal(receipt.logs[0].args._value, 10, 'logs the transfer amount');
            
            return tokenInstance.balanceOf(accounts[1])
        }).then(function(balance){
            assert.equal(balance.toNumber(), 10, 'adds the amount to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 990, 'deducts the amount from the sending accounts');
        });
    });
})