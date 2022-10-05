require("dotenv").config();

const { ethers } = require("ethers");
const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");

const {
  abi: SwapRouterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json");

const { getPoolImmutable, getPoolState } = require("./helpers");

const ERC20ABI = require("./abi.json");

const ALCHEMY_URL_TESTNET = process.env.ALCHEMY_URL_TESTNET;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_SECRET = process.env.WALLET_SECRET;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL_TESTNET); // Goerl
const poolAddress = ""; // UNI/WETH
const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // UNI/WETH
