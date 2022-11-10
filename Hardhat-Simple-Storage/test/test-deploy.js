/*
  We will test all of our solidity code locally so we know exactly what it's doing.
  We can have a programatic way to make sure that our code does what we waht it to do

  hardhat testing works with <ocha framework
*/

const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
const { string } = require("hardhat/internal/core/params/argumentTypes")

//Basic test for SimpleStorage contract
describe("SimpleStorage", function () {
    // we need to assign simpleStorage and SimpleStorageFactory outside of the beforeEach so it() can access them
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })
    // beforeEach() tells us what to do before each of 'it()'
    // it() is where we write the codes to run tests, and what we want each test to do

    // before each test we will deploy the contract
    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
        // or use expect: expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("Should update when we call retrieve", async function () {
        const expectedValue = "999"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currrentValue = await simpleStorage.retrieve()
        assert.equal(currrentValue.toString(), expectedValue)
    })

    // it("Should add a name to favoriteNumber when we call addPerson", async function () {
    //     const name = await simpleStorage.addPerson("Ryan", "999")
    //     const expectedString = "Ryan"

    //     assert.equal((name, 999), expectedString)
    // })
})
//
