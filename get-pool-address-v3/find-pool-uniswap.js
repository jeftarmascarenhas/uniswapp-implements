require("dotenv").config();

const { ethers } = require("ethers");
const {
  abi: UniswapV3Factory,
} = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json");

const ALCHEMY_URL_TESTNET = process.env.ALCHEMY_URL_TESTNET;

console.log(ALCHEMY_URL_TESTNET);

const address0 = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
const address1 = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
const factoryAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL_TESTNET);

  const factoryContract = new ethers.Contract(
    factoryAddress,
    UniswapV3Factory,
    provider
  );

  const poolAddress = await factoryContract.getPool(address0, address1, 500); // 500 is a fee, can be 500(0.05%), 300(0.03%), 1000(1%)
  console.log("poolAddress: ", poolAddress);
}

main();
