var Asset = artifacts.require("../contracts/Asset.sol");

module.exports = function(deployer) {
  deployer.deploy(Asset);
};