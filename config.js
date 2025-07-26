// config.js

const FAUCET_CONFIG = {
    tokens: [
        {
            name: "BTC",
            contractAddress: "0x36f6414FF1df609214dDAbA71c84f18bcf00F67d"
        },
        {
            name: "ETH",
            contractAddress: "0x0fE9B43625fA7EdD663aDcEC0728DD635e4AbF7c"
        },
        {
            name: "USDT",
            contractAddress: "0x3eC8A8705bE1D5ca90066b37ba62c4183B024ebf"
        }
    ],
    contractAbi: [
        "function mint()"
    ],
    delayInSeconds: 10
};

// Ganti module.exports dengan export default
export default FAUCET_CONFIG;
