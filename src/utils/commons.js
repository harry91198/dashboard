import Vue from 'vue'
import Web3 from 'web3'
var _ = require('lodash/object')

// import BN from 'bignumber.js'
let web3
let accounts
let networkid = 5

// let error
// let ethereum
export const EventBus = new Vue()

// export const url = 'http://localhost:3000/'
export const url = 'https://api.razor.network/'

export const enableEth = async () => {
  if (typeof window.ethereum === 'undefined'
    || typeof window.web3 === 'undefined') {
    alert('Browser does not support ethereum. Consider installing metamask!')
    return false
  } else {
    // In the case the user has MetaMask installed, you can easily
    // ask them to sign in and reveal their accounts:
    await window.ethereum.enable()
    web3 = new Web3(window.web3.currentProvider)
    return true
  }
}
// const _1e18 = new web3.utils.BN('1000000000000000000')
export const createJob = async (url, selector, name, repeat, eth) => {
  let jobManagerBuild = require('../../build/contracts/JobManager.json')
  // let delegatorBuild = require('../../build/contracts/Delegator.json')

  // let networkid = 4
  let jobManager = new web3.eth.Contract(jobManagerBuild['abi'], jobManagerBuild['networks'][networkid].address)

  // const accounts = await web3.eth.getAccounts()
  accounts = await ethereum.enable()

  // console.log(accounts)
  const res = await jobManager.methods.createJob(url, selector, name, repeat).send({
    from: accounts[0],
    value: eth
  })
  console.log(res)

  return {
    // id,
    tx: res.transactionHash
  }
}

export const faucet = async (address) => {
  let faucetBuild = require('../../build/contracts/Faucet.json')

  let faucet = new web3.eth.Contract(faucetBuild['abi'], faucetBuild['networks'][networkid].address)

  // const accounts = await web3.eth.getAccounts()
  accounts = await ethereum.enable()

  // console.log(accounts)
  const res = await faucet.methods.faucet(address).send({
  from: accounts[0]})

  return {
    // id,
    tx: res.transactionHash
  }
}

export const getSchBalance = async (address) => {
  let schellingCoinBuild = require('../../build/contracts/SchellingCoin.json')

  let schellingCoin = new web3.eth.Contract(schellingCoinBuild['abi'], schellingCoinBuild['networks'][networkid].address)

  // const accounts = await web3.eth.getAccounts()
  accounts = await ethereum.enable()

  // console.log(accounts)
  const res = await schellingCoin.methods.balanceOf(address).call()

  return res
}

export const get = async (data, selector) => {
  return _.get(data, selector)
}

// export const getContractAddress = (assetId) => {
//   return CDPFactory.methods.contracts(assetId).call()
// }
