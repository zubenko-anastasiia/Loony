const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions contract deployed: ", transactions.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
