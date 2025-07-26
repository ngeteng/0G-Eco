// config.js

const FAUCET_CONFIG = {
    // Alamat smart contract faucet yang dituju
    contractAddress: "0x...", // <-- GANTI DENGAN ALAMAT KONTRAK FAUCET

    // ABI (Application Binary Interface) dari kontrak
    // Karena kita tahu fungsinya adalah mint(), kita bisa definisikan seperti ini.
    // Ini adalah ABI minimal yang dibutuhkan.
    contractAbi: [
        "function mint()"
    ]
};

module.exports = { FAUCET_CONFIG };
