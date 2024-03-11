import {ethers} from 'ethers'
import abi from './SingleSwap.json';

export const SingleSwapABI = abi.abi;

// export const contract = async ()=>{
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//   const { ethereum } = window

//   if (ethereum) {
//     const signer = provider.getSigner()

//     const contractReader = new ethers.Contract(
//       '0xDE6697bB2976796850AFBF5584D813182612943A',
//       SingleSwapABI.abi,
//       signer,
//     )

//     return contractReader
//   }

// }

export const singleSwapAddress = '0xDE6697bB2976796850AFBF5584D813182612943A';