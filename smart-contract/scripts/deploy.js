const main = async () => {
  


  const transactions = await ethers.deployContract("Transactions");
  console.log("Transactions address: ",await transactions.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });