exports.getPoolImmutable = async (poolContract) => {
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  return {
    token0,
    token1,
    fee,
  };
};

exports.getPoolState = async (poolContract) => {
  const [sqrtPriceX96] = await poolContract.slot0(); // slot0 in poolContract

  return {
    sqrtPriceX96,
  };
};
