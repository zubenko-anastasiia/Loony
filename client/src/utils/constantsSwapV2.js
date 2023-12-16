import { ethers } from 'ethers'
import SwapV2ABI from '../utils/SwapV2.json'
import CustomTokenABI from '../utils/CustomToken.json'

export const tokenContract = async address => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const { ethereum } = window

  if (ethereum) {
    const signer = provider.getSigner()

    const contractReader = new ethers.Contract(address, CustomTokenABI, signer)

    return contractReader
  }
}

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const { ethereum } = window

  if (ethereum) {
    const signer = provider.getSigner()

    const contractReader = new ethers.Contract(
      '0x04d22eC9730fC901F31Af3e36951e81B3a358faa',
      SwapV2ABI.abi,
      signer,
    )

    return contractReader
  }
}

