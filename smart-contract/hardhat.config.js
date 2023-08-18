//https://eth-goerli.g.alchemy.com/v2/9hdbUY56AG1vSSbFp8QdMl244byDyz9K

require("@nomicfoundation/hardhat-toolbox");

module.exports ={
  solidity: '0.8.0',
  networks: {
    goerli:{
      url: 'https://eth-goerli.g.alchemy.com/v2/9hdbUY56AG1vSSbFp8QdMl244byDyz9K',
      accounts:['0910b9a78492012d4792b3efa407b7401b4d5ab87fa173a5f6ffe81caa4f723b']
    }
  }
}