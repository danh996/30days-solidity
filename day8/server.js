const express = require('express')
const server = express()
const body_parser = require('body-parser')
const Web3 = require('web3')

//config block chain
const rpcURL = 'https://rinkeby.infura.io/v3/129f69456fe145e59fb7864f8531fdae';
const web3 = new Web3(rpcURL);
const abi = [];
const address = '0x54545eb5e1d2294767c5275b479e0c00f4e49dc3';
const contract = new web3.eth.Contract(abi, address);

//server config
const port = 4000;

server.use(body_parser.json())

server.get('/heartbeat', async (req, res) => {
    res.json({
        status: 'ok'
    })
})

server.get('/block-number', async (req, res) => {
    const blockNumber = await web3.eth.getBlockNumber();
    res.json({
        status: 'ok',
        blockNumber: blockNumber
    })
})


server.get('/token-detail', async (req, res) => {
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const totalSupply = await contract.methods.totalSupply().call();
    const balanceOf = await contract.methods.balanceOf().call();

    res.json({
        status: 'ok',
        name: name,
        symbol,
        totalSupply,
        balanceOf,
    })
})


server.listen(port, ()=>{
    console.log(`Server is listening at ${port}`);
})


