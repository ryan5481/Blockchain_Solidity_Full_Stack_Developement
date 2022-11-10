// imports
/* In Ethers session we had to manually grab our contract code
With Hardhat, we have number of ways to grab our compiled contracts
The first way is to use Ethers
Previously we did:
const { ethers } = require("ethers")
However, under devDependencies in package.json has a dependency called hardhat-ethers
It's a package that wraps hardhat with it's own ethers
This is advantageous because it allows hardhat to keep track of different deployments and scripts
Instead of importing ethers from Ethers, we can import directly from Hardhat instead : const {ethers} = require("hardhat")

*/

const { ethers, run, network } = require("hardhat")
require("dotenv").config()

// async main function
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    /*Using ethers will work the same, but hardhat won't know about different contract factories and pieces
      Hardhat on the otherhand knows about the 'contracts' folder and knows that the contract is compiled
      Hence, SimpleStorageFactory grabbing works
    */
    console.log("Deploying contract . . . ")
    const simpleStorage = await SimpleStorageFactory.deploy()
    //Grabbed the compiled code and deployed
    await simpleStorage.deployed() //Wait to make sure it gets deployed
    /*Private key and RPC URL is not defined, does it deploy?
      YES, it does!
      Hardhat comes built-in with hardhat network, a local Ethereum network
      It is designed for developement(like Ganache) to deploy contracts, run tests and debug code
      We can add more information about our default networks under 'module.exports' in hardhat.config.js file
      Initially,the default netork is "hardhat", which is utilized when we run a script without specifiying the network
      It comes automatically with a private key and a RPC url

    */
    console.log(`Deployed contract to: ${simpleStorage.address}`)

    // What happens to contract verification if we deploy to Hardhat network???
    // We can check to see if the network we are running is a live test network.
    // console.log(network.config)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        //if etherscan api key exists it, will be converted to true, else false
        console.log("Waiting for block txes . . .")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    //interact with the contract
    // Get the initial value
    const currentValue = await simpleStorage.retrieve()
    console.log(`The current value is: ${currentValue}`)

    //update the current value
    const transactionResponse = await simpleStorage.store(99)
    await transactionResponse.wait(1)

    //grab the updated value
    const updatedValue = await simpleStorage.retrieve()
    console.log(`The updated value is: ${updatedValue}`)
}

// Now we will write code to automatically verify the deployed contract on Etherscan
const verify = async (contractAddress, args) => {
    console.log("Verifying contract . . .")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguements: args,
        })
        /*Ethercan may notice that we have enough bytecode that looks like Si mpleStorage, which may be automatically verified.
          And the "await" may throw an error
          To avoid it, we can add a try/catch on to the "await".
          where 'e' is any error the await section throws
          so, we are going to write code so if the message is verified, it will continue
        */
    } catch (e) {
        if (e.message.toLowercase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
        /*
          If error 'e' occours, verification function will break and the whole script will end.
          We want our script to continue if the verification doesn't work
        */
    }
}

//main

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
