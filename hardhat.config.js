require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },bscTestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },   avaxTestnet: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }, arbitrumTestnet: {
      url: `https://rinkeby.arbitrum.io/rpc`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
};
