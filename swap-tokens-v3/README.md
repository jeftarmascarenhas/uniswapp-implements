# Swap tokens on Uniswap V3

This example shows how to swap tokens on Uniswap V3 using Ethers.js and Javascript.
After implement this code you can trader on Uniswap V3, I using test networks, be careful if you use this
code in mainnet I'm not responsible.

![How Uniswap works](./uniswap-flow.jpeg)

Install modules:

```shell
npm install
```

Run swap token script:

```shell
node swap-tokens-v3/uniswap-trader.js
```

## Rules

To script working you need have ETH and WETH in your wallet with balance enough to buy a uniswap token.

# Error

There is a error of name `Fail with error 'STF'` this error could be caused by ETH and WETH not enough(You need both) or you didn't give approval to `SwapRouter` Uniswap contract spend for your wallet.

## Modules

- ["@uniswap/sdk-core": "^3.0.1"](https://docs.uniswap.org/sdk/guides/quick-start),
- ["@uniswap/v3-sdk": "^3.8.2"](https://docs.uniswap.org/sdk/guides/quick-start),
- ["dotenv": "^16.0.3"](https://github.com/motdotla/dotenv),
- ["ethers": "^5.7.1"](https://docs.ethers.io/v5/)
