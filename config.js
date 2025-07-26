// config.js

const FAUCET_CONFIG = {
    tokens: [
        {
            name: "BTC",
            contractAddress: "ALAMAT_KONTRAK_FAUCET_BTC"
        },
        {
            name: "ETH",
            contractAddress: "ALAMAT_KONTRAK_FAUCET_ETH"
        },
        {
            name: "USDT",
            contractAddress: "ALAMAT_KONTRAK_FAUCET_USDT"
        }
    ],
    contractAbi: [
        "function mint()"
    ],
    delayInSeconds: 10
};

// Ganti module.exports dengan export default
export default FAUCET_CONFIG;
