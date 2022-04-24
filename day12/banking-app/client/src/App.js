import './App.css';
import {ethers} from "ethers";
import{useEffect, useState} from 'react';

import bankArtifact from './artifacts/contracts/Bank.sol/Bank.json';
import maticArtifact from './artifacts/contracts/Matic.sol/Matic.json';
import shibArtifact from './artifacts/contracts/Shib.sol/Shib.json';
import usdtrArtifact from './artifacts/contracts/Usdt.sol/Usdt.json';

function App() {

  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [bankAddress, setBankAddress] = useState(undefined);
  const [bankContract, setBankContract] = useState(undefined);
  const [tokenContract, setTokenContract] = useState({});
  const [tokenBalances, setTokenBalances] = useState({});
  const [tokenSymbols, setTokenSymbols] = useState([]);

  const [amount, setAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(undefined);
  const [isDeposit, setIsDeposit] = useState(undefined);

  const toBytes32 = text => {
    ethers.utils.formatBytes32String(text);
  }

  const toString = bytes32 => {
    ethers.utils.parseBytes32String(bytes32);
  }

  const toWei = ether => {
    ethers.utils.parseEther(ether);
  }

  const toEther = wei => {
    ethers.utils.formatEther(wei).toString();
  }

  const toRound = num => {Number(num).toFixed(2)}

  useEffect(()=>{
    const init = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider);

      const bankContract = await new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", bankArtifact.abi);
      console.log("provider is", provider);
      setBankContract(bankContract);
      console.log("bank contract is", bankContract);

      bankContract.connect(provider).getWhiteListedSymbols()
      .then((result) => {
        const symbols = result.map(s => toString(s));
        console.log("symbol is", symbols);
        setTokenSymbols(symbols);
      })
    }
    init();
  }, [])

  const getTokenContract = async (symbol, bankContract, provider) => {
    const address = await bankContract.connect(provider).getWhiteListedTokenAddress(toBytes32(symbol));
    const abi = symbol == "Matic" ? maticArtifact.abi : (symbol === "Shiba" ? shibArtifact.abi : (usdtrArtifact.abi));

    const tokenContract = new ethers.Contract(address, abi);

    return tokenContract;
  }

  const getTokenContracts = async (symbols, bankContract, provider) => {
    symbols.map(async symbol => {
      const contract = await getTokenContracts(symbol, bankContract, provider);
      setTokenContract(prev => ({...prev, [symbol]:contract}))
    })
  }

  const isConnected = () => (signer !== undefined);

  const getSigner = async provider => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    signer.getAddress()
      .then(address => {
        setSignerAddress(address);
      })
  }

  const connect = () => {
    getSigner(provider)
      .then(signer => {
        setSigner(signer)
        getTokenBalances(signer);
      })
  }

  const getTokenBalance = async (symbol, signer) => {
    console.log(signer);
    const balance = await bankContract.connect(signer).getTokenBalance(toBytes32(symbol));
    return toEther(balance);
  }

  const getTokenBalances = (signer) => {
    tokenSymbols.map(async symbol => {
      const balance = await getTokenBalance(symbol, signer);
      setTokenBalances(prev => ({...prev, [symbol]: balance.toString()}))
    })
  }

  return (
    <div className="App">
      <header className="App-header">
          {isConnected() ? (
            <div>
              <p>
                Welcome {signerAddress}
              </p>
              <div>
              <div className="list-group">
                <div className="list-group-item">
                  {Object.keys(tokenBalances).map((symbol, idx) => (
                    <div className=" row d-flex py-3" key={idx}>

                      <div className="col-md-3">
                        <div>{symbol.toUpperCase()}</div>
                      </div>

                      <div className="d-flex gap-4 col-md-3">
                        <small className="opacity-50 text-nowrap">{toRound(tokenBalances[symbol])}</small>
                      </div>

                      
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>
          ) : (
            <div>
              <p>
                You are not connected
              </p>
            <button onClick={connect()} className="btn btn-primary">
              Connect To MetaMark
            </button>
            </div>
          )}
      </header>
    </div>
  );
}

export default App;
