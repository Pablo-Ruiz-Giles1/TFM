/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation, and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * Hands-off deployment with Infura
 * --------------------------------
 *
 * 
 * 
 * Do you have a complex application that requires lots of transactions to deploy?
 * Use this approach to make deployment a breeze 🏖️:
 *
 * Infura deployment needs a wallet provider (like @truffle/hdwallet-provider)
 * to sign transactions before they're sent to a remote public node.
 * Infura accounts are available for free at 🔍: https://infura.io/register
 *
 * You'll need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. You can store your secrets 🤐 in a .env file.
 * In your project root, run `$ npm install dotenv`.
 * Create .env (which should be .gitignored) and declare your MNEMONIC
 * and Infura PROJECT_ID variables inside.
 * For example, your .env file will have the following structure:
 *
 * MNEMONIC = <Your 12 phrase mnemonic>
 * PROJECT_ID = <Your Infura project id>
 *
 * Deployment with Truffle Dashboard (Recommended for best security practice)
 * --------------------------------------------------------------------------
 *
 * Are you concerned about security and minimizing rekt status 🤔?
 * Use this method for best security:
 *
 * Truffle Dashboard lets you review transactions in detail, and leverages
 * MetaMask for signing, so there's no need to copy-paste your mnemonic.
 * More details can be found at 🔎:
 *
 * https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard/
 */

// require('dotenv').config();
// const { MNEMONIC, PROJECT_ID } = process.env;

// const HDWalletProvider = require('@truffle/hdwallet-provider');

// knee settle assault again denial praise profit track topic fly term visit
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = 'butter make soccer squeeze hour grape cloth pull mass town scrub among';


module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a managed Ganache instance for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache, geth, or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },

     

    bear: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.boba.network/`),
      network_id: '2888',
      gasPrice: 1000000000, // ajusta el precio del gas según el valor actual en la red Goerli
     // gas: 8000000 // ajusta el límite de gas según el tamaño de tu contrato
      gas: 10000000, // Gas limit used for deploys
   //   confirmations: 2, // Number of confirmations to wait before a deploy is considered successful
      timeoutBlocks: 200, // Number of blocks to wait before a deploy times out
      skipDryRun: true // Skip checking if the contract is valid on the network before deploying
    },

    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/916e6f54f9064d8696dfd7b87807bc0b`),
      network_id: '11155111',
      gas: 6700000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 30000000000,  // 20 gwei (in wei) (default: 100 gwei)
      //confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      addressIndex: 2,
      skipDryRun: true
    },


    avalanche: {
      provider: () => new HDWalletProvider(mnemonic, `https://avalanche-fuji.infura.io/v3/ce153e3ba5774a9a9eeca35979b0ce31`),
      network_id: '43113',
      gas: 15000000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 35000000000,  // 20 gwei (in wei) (default: 100 gwei)
      //confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      addressIndex: 2,
      skipDryRun: true
    },



    polygon: {
      provider: () => new HDWalletProvider(mnemonic, 'https://polygon-mumbai.infura.io/v3/0e276510efb64f12b1be824a4df90bdf'),
      network_id: 80001,
      gas: 20000000,
      gasPrice: 500000000000,
      networkCheckTimeoutnetworkCheckTimeout: 1000,
      timeoutBlocks: 20,
      addressIndex: 2,
      skipDryRun: true
    },
  
    arbitrum: {
      provider: () => new HDWalletProvider(mnemonic, `https://arb-goerli.g.alchemy.com/v2/k1In4e8RyU-oiGwJmODYrlpLFZ4DOtQf`),
      network_id: '421613',
      gas: 90000000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 1000000000,  // 20 gwei (in wei) (default: 100 gwei)
    //  confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      addressIndex: 2,
      skipDryRun: true
    },

    optimism: { 
      provider: () => new HDWalletProvider(mnemonic, `https://twilight-greatest-gadget.optimism-goerli.discover.quiknode.pro/6918bb175c978e256f65f79572cff2d4436b3c1e/`),
      network_id: '420',
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 25000000000,  // 20 gwei (in wei) (default: 100 gwei)
      //confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      addressIndex: 2,
      skipDryRun: true
    },

    optimism_bear: { 
      provider: () => new HDWalletProvider(mnemonic, `https://rpc.buildbear.io/beautiful-dexter-jettster-d0f0d085`),
      network_id: '8699',
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 25000000000,  // 20 gwei (in wei) (default: 100 gwei)
      //confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      addressIndex: 2,
      skipDryRun: true
    },

    polygon_bear: { 
      provider: () => new HDWalletProvider(mnemonic, `https://rpc.buildbear.io/wily-mon-mothma-d588ce58`),
      network_id: '8703',
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 180000000000,  // 20 gwei (in wei) (default: 100 gwei)
      //confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      addressIndex: 2,
      skipDryRun: true
    },

    arbitrum_bear: { 
      provider: () => new HDWalletProvider(mnemonic, `https://rpc.buildbear.io/arbitrary-san-hill-0195e25c`),
      network_id: '8702',
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 25000000000,  // 20 gwei (in wei) (default: 100 gwei)
      //confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      addressIndex: 2,
      skipDryRun: true
    },
    sepolia_bear: { 
      provider: () => new HDWalletProvider(mnemonic, `https://rpc.buildbear.io/impossible-jango-fett-8a120a19`),
      network_id: '8766',
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 25000000000,  // 20 gwei (in wei) (default: 100 gwei)
      //confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      addressIndex: 2,
      skipDryRun: true
    },
    ethereum_bear: { 
      provider: () => new HDWalletProvider(mnemonic, `https://rpc.buildbear.io/dull-kit-fisto-f543e3a4`),
      network_id: '8765',
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 25000000000,  // 20 gwei (in wei) (default: 100 gwei)
      //confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      addressIndex: 2,
      skipDryRun: true
    },
    goerli: { 
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/916e6f54f9064d8696dfd7b87807bc0b`),
      network_id: '5',
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 25000000000,  // 20 gwei (in wei) (default: 100 gwei)
      //confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      addressIndex: 2,
      skipDryRun: true
    },

    celo: { 
      provider: () => new HDWalletProvider(mnemonic, `https://celo-alfajores.infura.io/v3/ce153e3ba5774a9a9eeca35979b0ce31`),
      network_id: '44787',
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 25000000000,  // 20 gwei (in wei) (default: 100 gwei)
      //confirmations: 2,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      addressIndex: 2,
      skipDryRun: true
    },


   
    boba: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.boba.network/`),
      network_id: '2888',
      gasPrice: 1000000000, // ajusta el precio del gas según el valor actual en la red Goerli
     // gas: 8000000 // ajusta el límite de gas según el tamaño de tu contrato
      gas: 10000000, // Gas limit used for deploys
   //   confirmations: 2, // Number of confirmations to wait before a deploy is considered successful
      timeoutBlocks: 200, // Number of blocks to wait before a deploy times out
      skipDryRun: true // Skip checking if the contract is valid on the network before deploying
    }
  

    //
    // An additional network, but with some advanced options…
    // advanced: {
    //   port: 8777,             // Custom port
    //   network_id: 1342,       // Custom network
    //   gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    //   gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    //   from: <address>,        // Account to send transactions from (default: accounts[0])
    //   websocket: true         // Enable EventEmitter interface for web3 (default: false)
    // },
    //
    // Useful for deploying to a public network.
    // Note: It's important to wrap the provider as a function to ensure truffle uses a new provider every time.
    // goerli: {
    //   provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${PROJECT_ID}`),
    //   network_id: 5,       // Goerli's id
    //   confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    //
    // Useful for private networks
    // private: {
    //   provider: () => new HDWalletProvider(MNEMONIC, `https://network.io`),
    //   network_id: 2111,   // This network is yours, in the cloud.
    //   production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17" // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
