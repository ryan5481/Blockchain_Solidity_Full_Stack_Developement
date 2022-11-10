/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https:/eth-goerli/example"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "0xkey"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "0xkey"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chianId: 5,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts: hosted by hardhat
            chianId: 31337,
        },
    },
    solidity: "0.8.8",
    etherscan: {
        apiKey: [ETHERSCAN_API_KEY],
    },

    gasReporter: {
        enabled: false, // Turning his true will run gasReporter whenever we run test
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        // token: "MATIC", //uncomment to save gas
    },
}
