# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

Inventory:
A hardhat projcet was creeated.
List of tasks we can do with hardhat can be seen by running 'yarn hardhat'.
hardhat.config.js was looked up by hardhat. It is an entry point for any task that is run with hardhat.
SimpleStorage contract was added to contracts folder and compiled by running 'yarn hardhat compile'.
All the compilation was stored to the artifacts and cache folders\.
Clean reset of compilation can be performed by running 'yarn hardhat clean'.
Scripts and tasks were used to deploy, interact with the smart contract.
Things like tasks were imported from hardhat in the scripts.
Async functions were used to grab the contract and deploy it.
The smart contract was programitically verified on etherscan using hardhat plugins.
Interaction with the contract was performed, similar ro interaction using ethers.
Smart contract verification script amd task were written.
Tests for smart contract were written and run.
Code for gas tracker tool for each function of the contract was written to check gas at deployment of contract and calling of functions.
Addtional environmental variables were added for verifying the contract on etherscan and adding gas tracker.
Tools like solidity coverage was added to secure the contract and check the smart contract test.
Multiple networks were added in the hardhat config, to make the EVM project work with multiple networks.
Worked with dev dependencies instead of regular dependencies.
