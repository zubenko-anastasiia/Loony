const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const SwapV2 = await hre.ethers.getContractFactory("SwapV2");
  const swapV2 = await SwapV2.deploy();

  await swapV2.deployed();

  console.log("SwapV2 contract deployed: ", swapV2.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});