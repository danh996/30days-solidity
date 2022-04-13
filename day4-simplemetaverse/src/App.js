import './App.css';
import Web3 from 'web3';
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, MapControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';


// Import Components
import Navbar from './components/Navbar';
import Plane from './components/Plane';
import Plot from './components/Plot';
import Building from './components/Building';

import Land from './abis/Land.json';

function App() {

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [landContract, setLandContract] = useState(null);
  const [cost, setCost] = useState(0);
  const [buildings, setBuildings] = useState(null);

  useEffect(()=>{
    loadBlockChainData()
  }, [account])

  const loadBlockChainData = async () => {
    if(typeOf (window.ethereum) !== 'undefined'){
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();

      if(accounts.length > 0){
        setAccount(accounts[0]);
      }

      const networkId = await web3.eth.net.getId;
      const land = new web3.eth.Contract(Land.abi, Land.networks[networkId].address);

      setLandContract(land);

      const cost = await land.methods.cost().call();
      setCost(web3.utils.fromWei(cost.toString(), 'ether'));

      const buildings = await land.methods.getBuildings().call();
      setBuildings(buildings);

      window.ethereum.on('accountsChanged', function(accounts){
        setAccount(accounts[0]);
      });

      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      })
    }
  }

  return (
    <div className="App">
      <Navbar web3Handler={web3Handler} account={account} />
      <Canvas camera={{ position: [0, 0, 30], up: [0, 0, 1], far: 10000 }}>
				<Suspense fallback={null}>
					<Sky distance={450000} sunPosition={[1, 10, 0]} inclination={0} azimuth={0.25} />

					<ambientLight intensity={0.5} />

					{/* Load in each cell */}
					<Physics>
						{buildings && buildings.map((building, index) => {
							if (building.owner === '0x0000000000000000000000000000000000000000') {
								return (
									<Plot
										key={index}
										position={[building.posX, building.posY, 0.1]}
										size={[building.sizeX, building.sizeY]}
										landId={index + 1}
										landInfo={building}
										setLandName={setLandName}
										setLandOwner={setLandOwner}
										setHasOwner={setHasOwner}
										setLandId={setLandId}
									/>
								)
							} else {
								return (
									<Building
										key={index}
										position={[building.posX, building.posY, 0.1]}
										size={[building.sizeX, building.sizeY, building.sizeZ]}
										landId={index + 1}
										landInfo={building}
										setLandName={setLandName}
										setLandOwner={setLandOwner}
										setHasOwner={setHasOwner}
										setLandId={setLandId}
									/>
								)
							}
						})}
					</Physics>

					<Plane />
				</Suspense>
				<MapControls />
			</Canvas>
    </div>
  );

  // MetaMask Login/Connect
	const web3Handler = async () => {
		if (web3) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			setAccount(accounts[0])
		}
	}
}

export default App;
