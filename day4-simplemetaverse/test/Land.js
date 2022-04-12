const Land = artifacts.require("./Land");

var chai = require('chai').use(require('chai-as-promised')).should;  
const EVM_REVERT = "VM Exception while proccessing transaction: revert";

contract("Land", ([owner1, owner2]) => {
    const NAME = "DAPP U BUILDINGS";
    const SYMBOL = "DUB";
    const COST = web3.utils.toWei('1', 'ether');

    let land, result;

    beforeEach(async () => {
        land = await Land.new(NAME, SYMBOL, COST);
    })

    describe("Development", () => {
        it("return the contract name", async () => {
            result = await land.name();
            result.should.equal(NAME);
        })

        it("return the symbol", async () => {
            result = await land.symbol();
            result.should.equal(SYMBOL);
        })

        it("return the cost to mint", async () => {
            result = await land.cost();
            result.should.equal(COST);
        })

        it("return the max supply", async () => {
            result = await land.maxSupply();
            result.toString().should.equal('5');
        })

        it("return the number of builing available", async () => {
            result = await land.getBuildings();
            result.length.should.equal(5);
        })

    })

    // describe("Minting", () => {
    //     describe("success", async () => {
    //         result = await land.mint(1, {from: owner1, value: COST});

    //         it("Updates the owner address", async () => {
    //         result  = await land.ownerOf(1);
    //         result.should.equal(owner1);
    //     })

    //     it("update building details", async() => {
    //         result = await land.getBuilding(1);
    //         result.owner.should.equal(owner1);
    //     })

    //     })

    //     describe('Failure', () => {
    //         it("Prevent mint with 0 value", async () => {
    //             await land.mint(1, {from:owner1, value: 0}).should.be.rejectedWith(EVM_REVERT);
    //         })

    //         it("Prevent mint with invalid ID", async () => {
    //             await land.mint(100, {from:owner1, value: COST}).should.be.rejectedWith(EVM_REVERT);
    //         })

    //         it("Prevent minting if already owned", async () => {
    //             await land.mint(1, {from:owner1, value: COST});
    //             await land.mint(1, {from:owner2, value: COST}).should.be.rejectedWith(EVM_REVERT);
    //         })
    //     })

    // })

    describe('Transfer', () => {
            describe('success', () => {
                beforeEach(async () => {
                    await land.mint(1, {from: owner1, value:COST})
                    await land.approve(owner2, 1, {from:owner1})
                    await land.transferFrom(owner1, owner2, 1, {from: owner2})
                })

                it("updates the owner address", async() => {
                    result = await land.ownerOf(1);
                    result.should.equal(owner2);
                })

                it("Updates building detail", async () => {
                    result = await land.getBuilding(1);
                    result.owner.should.equal(owner2);
                })
            })
            
            describe("failure", () => {
                it("Prevents transfers without ownership", async () => {
                    await land.transferFrom(owner1, owner2, 1, {from: owner2}).should.be.rejectedWith(EVM_REVERT);
                })

                it("Prevent transfer without approval", async () => {
                    await land.mint(1, {from: owner1, value: COST})
                    await land.transferFrom(owner1, owner2, 1, {from: owner2}).should.be.rejectedWith(EVM_REVERT);
                })
            })
        })
})