const PeerToPeer = artifacts.require("PeerToPeer")
module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(PeerToPeer);
};

// module.exports = function(_deployer, network, accounts) {
//   deployer.deploy(SimpleContract, { from: accounts[1] }); // Deploy contract from the 2nd account in the list
//   deployer.deploy(SimpleContract, { from: accounts[2] }); // Deploy the same contract again (different address) from the 3rd account.
// };
