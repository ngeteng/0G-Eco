// faucet.js
import { ethers } from 'ethers';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function runMultiFaucet(signer, config) {
    console.log("🚀 Memulai Modul Faucet...");

    for (const token of config.faucet.tokens) {
        console.log(`\n--- Memproses Faucet untuk ${token.name} ---`);
        try {
            const faucetContract = new ethers.Contract(token.contractAddress, config.faucet.abi, signer);
            const tx = await faucetContract.mint();
            console.log(`✅ Transaksi Faucet ${token.name} dikirim! Hash: ${tx.hash}`);
            await tx.wait();
            console.log(`🎉 Faucet ${token.name} berhasil dikonfirmasi.`);
        } catch (error) {
            console.error(`❌ Gagal claim untuk ${token.name}:`, error.reason || error.message);
        }
        await delay(config.faucet.delayInSeconds * 1000);
    }
    console.log("\n✅✅✅ Modul Faucet Selesai! ✅✅✅");
}
