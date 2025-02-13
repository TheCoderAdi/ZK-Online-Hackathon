const hre = require("hardhat");

async function main() {
  const CreditScore = await hre.ethers.getContractFactory("DeFiCreditScore");
  const contract = await CreditScore.deploy();
  await contract.waitForDeployment();
  console.log("Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
