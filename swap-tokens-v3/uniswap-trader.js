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
