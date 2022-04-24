async function main() {
  [signer1, signer2] = await ethers.getSigners();

  const Bank = await ethers.getContractFactory("Bank", signer1);
  const bankContract = await Bank.deploy();

  const Matic = await ethers.getContractFactory("Matic", signer2);
  const matic = await Matic.deploy();

  const Shib = await ethers.getContractFactory("Shib", signer2);
  const shib = await Shib.deploy();

  const Usdt = await ethers.getContractFactory("Usdt", signer2);
  const usdt = await Usdt.deploy();

  
  await bankContract.whiteListToken(
    ethers.utils.formatBytes32String("Matic"),
    matic.address
  );

  await bankContract.whiteListToken(
    ethers.utils.formatBytes32String("Shib"),
    matic.address
  );

  await bankContract.whiteListToken(
    ethers.utils.formatBytes32String("Usdt"),
    matic.address
  );

  await bankContract.whiteListToken(
    ethers.utils.formatBytes32String("Eth"),
    '0x1D75Ef6288ac1680dC960Cb5b6e020601cb71eB7'
  );

  console.log("Bank contract deployed to:", bankContract.address, "by", signer1.address);
  console.log("Matic contract deployed to:", matic.address, "by", signer2.address);
  console.log("Shib contract deployed to:", shib.address, "by", signer2.address);
  console.log("Tether contract deployed to:", usdt.address, "by", signer2.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
