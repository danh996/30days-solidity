const {ethers} = require("hardhat");

async function main(){
  const Danh = await ethers.getContractFactory("Danh");
  const danh = Danh.deploy("Danh", "DAN");

  await danh.deployed();

  console.log("Deployed succesfully", danh.address);

  await danh.mint("https://ipfs.io/ipfs/QmenVip343y4JXeFQgik5hFtKcWvDiVYph8jzA3AsVVaPi");

  console.log("NFT success minted");
}




main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
