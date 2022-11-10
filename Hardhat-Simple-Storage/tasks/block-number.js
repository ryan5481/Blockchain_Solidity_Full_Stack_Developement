const { task } = require("hardhat/config")

task("block-number", "prints the current block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number = ${blockNumber}`)
    }

    /* 
        This is a JavaScript arrow function.
        We can define functions without using the 'function' keyword.
        We do not use the function keyword and tyurn the whole code into a variable
        For example: const verify = async (contractAddress, args) => {}
        : const verify is an async function that takes args and the contents fter => is the function defination

        const blockTask = async function() => {}
        async function blockTask() {}

    */
)

module.exports = {}
