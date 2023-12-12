const PeerToPeerTest = artifacts.require("PeerToPeerTest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("PeerToPeerTest", function (/* accounts */) {
  before(async () =>{
    this.peerTopeer = await PeerToPeerTest.deployed();
  });



  it("should assert true", async function () {
    await PeerToPeerTest.deployed();
    return assert.isTrue(true);
  });

  it("make peer to peer transaction", async() =>{
    let receiverAdddress = "0xd9E6375a3Cd5e45ad377D8A5D8DD411028Ad1B08";//receiver's ethereum address
    let amount = "0.00023"; //wei
    let message = "happy birthday Sadat"; // transaction narration


    const result = await this.peerTopeer.makeTransaction(receiverAdddress,amount, message)
    const transactionCount = await this.peerTopeer.getTransactionCount().then(result => result.toNumber());
    const event = result.logs[0].args

    assert.equal(event.id.toNumber(), transactionCount)
    assert.equal(event.amount.toNumber(), amount)
    assert.equal(event.receiver, receiverAdddress)
})

it("should get balance of owner", async function () {
  const result = await this.peerTopeer.getBalanceOfOwner();
  assert.isTrue(true);
});

});
