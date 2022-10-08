require("dotenv").config();

const { ethers } = require("ethers");
const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");

const {
  abi: SwapRouterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json");

const { getPoolImmutable, getPoolState } = require("./utils");

const ERC20ABI = require("./abi.json");

const ALCHEMY_URL_TESTNET = process.env.ALCHEMY_URL_TESTNET;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_SECRET = process.env.WALLET_SECRET;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL_TESTNET); // Goerli
const poolAddress = "0x07A4f63f643fE39261140DF5E613b9469eccEC86"; // UNI/WETH(ETHER)
const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Swap Router contract responsible by  swap token

const name0 = "Wrapped Ether";
const symbol0 = "WETH";
const decimals0 = 18;
const address0 = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"; // WETHER

const name1 = "Uniswap Token";
const symbol1 = "UNI";
const decimals1 = 18;
const address1 = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"; // UNI

async function main() {
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  );

  const immutables = await getPoolImmutable(poolContract);
  const states = await getPoolState(poolContract);

  console.log(immutables, states);

  const wallet = new ethers.Wallet(WALLET_SECRET).connect(provider);

  const swapRouterContract = new ethers.Contract(
    swapRouterAddress,
    SwapRouterABI,
    provider
  );

  const inputAmount = 0.001;
  // .001 => 1 000 000 000 000 000
  const amountIn = ethers.utils.parseUnits(inputAmount.toString(), decimals0);
  const approvalAmount = (amountIn * 100000).toString();

  const tokenContract0 = new ethers.Contract(address0, ERC20ABI, provider);

  const approvalResponse = await tokenContract0
    .connect(wallet)
    .approve(swapRouterAddress, approvalAmount);

  console.log("Approval pending.. \n");
  await approvalResponse.wait();

  console.log("Approval finished: \n", approvalResponse);

  const params = {
    tokenIn: immutables.token1,
    tokenOut: immutables.token0,
    fee: immutables.fee,
    recipient: WALLET_ADDRESS,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10, // transaction expire in 10 minutes
    amountIn,
    amountOutMinimum: 0, // not do this in production
    sqrtPriceLimitX96: 0, // not do this in production
  };

  try {
    const transaction = await swapRouterContract
      .connect(wallet)
      .exactInputSingle(params, {
        gasLimit: ethers.utils.hexlify(1000000),
      });
    console.log("transaction pending...");
    await transaction.wait();
    console.log("transaction finished: ", transaction);
  } catch (error) {
    console.log(error);
  }
}

main();
