// faucetBot.js

// Ganti sintaks require menjadi import
import { ethers } from 'ethers';
import FAUCET_CONFIG from './config.js';
import 'dotenv/config'; // Cara import dotenv untuk ES Modules

// Helper function untuk membuat jeda (delay)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runMultiFaucet() {
    console.log("🚀 Bot Multi-Faucet Dimulai...");

    try {
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

        console.log("🔌 Berhasil terhubung ke node RPC.");
        console.log(`👤 Menggunakan alamat dompet: ${signer.address}`);

        for (const token of FAUCET_CONFIG.tokens) {
            console.log(`\n--- Memproses Faucet untuk ${token.name} ---`);
            
            try {
                const faucetContract = new ethers.Contract(
                    token.contractAddress,
                    FAUCET_CONFIG.contractAbi,
                    signer
                );
                console.log(`📄 Terhubung ke kontrak ${token.name} di: ${token.contractAddress}`);

                console.log(`⏳ Mencoba memanggil mint() untuk token ${token.name}...`);
                const tx = await faucetContract.mint();
                console.log(`✅ Transaksi berhasil dikirim! Hash: ${tx.hash}`);
                
                console.log("🕒 Menunggu konfirmasi transaksi...");
                const receipt = await tx.wait();
                console.log(`🎉 Transaksi ${token.name} dikonfirmasi di blok: ${receipt.blockNumber}`);

            } catch (error) {
                console.error(`❌ Gagal claim untuk ${token.name}:`, error.reason || error.message);
            }

            console.log(`⏱️ Memberikan jeda selama ${FAUCET_CONFIG.delayInSeconds} detik...`);
            await delay(FAUCET_CONFIG.delayInSeconds * 1000);
        }

        console.log("\n✅✅✅ Semua proses faucet telah selesai! ✅✅✅");

    } catch (error) {
        console.error("❌ Terjadi kesalahan fatal pada setup awal:", error.message);
    }
}

// Jalankan fungsi utama
runMultiFaucet();
