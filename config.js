// config.js

const BTC_ADDRESS = "0x36f6414FF1df609214dDAbA71c84f18bcf00F67d";
const ETH_ADDRESS = "0x0fE9B43625fA7EdD663aDcEC0728DD635e4AbF7c";
const USDT_ADDRESS = "0x3eC8A8705bE1D5ca90066b37ba62c4183B024ebf";
const SWAP_ROUTER_ADDRESS = "0xb95B5953FF8ee5D5d9818CdbEfE363ff2191318c";

const CONFIG = {
    // Konfigurasi Faucet
    faucet: {
        tokens: [
            { name: "BTC", contractAddress: BTC_ADDRESS },
            { name: "ETH", contractAddress: ETH_ADDRESS },
            { name: "USDT", contractAddress: USDT_ADDRESS }
        ],
        abi: ["function mint()"],
        delayInSeconds: 10
    },

    // Konfigurasi Swap
    swap: {
        routerAddress: SWAP_ROUTER_ADDRESS,
        routerAbi: [
            "function exactInputSingle(tuple(address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 deadline, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96) params)"
        ],
        // Pasangan yang akan di-swap
        pairs: [
            {
                from: "BTC",
                to: "USDT",
                amount: "0.01", // Swap 0.01 BTC
                fee: 100 // Fee pool 0.01%
            },
            {
                from: "USDT",
                to: "ETH",
                amount: "13", // Swap 0.1 ETH
                fee: 500 // Fee pool 0.05% (contoh)
            },
            {
                from: "USDT",
                to: "BTC",
                amount: "12", // Swap 0.1 ETH
                fee: 500 // Fee pool 0.05% (contoh)
            },
            {
                from: "ETH",
                to: "BTC",
                amount: "0.01", // Swap 0.1 ETH
                fee: 500 // Fee pool 0.05% (contoh)
            },
            {
                from: "ETH",
                to: "USDT",
                amount: "0.1", // Swap 0.1 ETH
                fee: 500 // Fee pool 0.05% (contoh)
            }
        ]
    },

    // Info detail token
    tokenInfo: {
        BTC: { address: BTC_ADDRESS, decimals: 8 },
        ETH: { address: ETH_ADDRESS, decimals: 18 },
        USDT: { address: USDT_ADDRESS, decimals: 6 }
    },

    // ABI minimal untuk approval
    erc20Abi: ["function approve(address spender, uint256 amount) returns (bool)"]
};

export default CONFIG;
