// faucetBot.js

// Impor library dan konfigurasi
const { ethers } = require('ethers');
const { FAUCET_CONFIG } = require('./config.js');
require('dotenv').config();

// --- FUNGSI UTAMA BOT ---
async function claimFaucet() {
    console.log("🚀 Bot Faucet Dimulai...");

    try {
        // 1. Koneksi ke Blockchain (Provider)
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        console.log("🔌 Berhasil terhubung ke node RPC.");

        // 2. Menyiapkan Dompet (Signer)
        const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        console.log(`👤 Menggunakan alamat dompet: ${signer.address}`);

        // 3. Menyiapkan instance Kontrak
        const faucetContract = new ethers.Contract(
            FAUCET_CONFIG.contractAddress,
            FAUCET_CONFIG.contractAbi,
            signer
        );
        console.log(`📄 Berhasil terhubung ke kontrak di alamat: ${FAUCET_CONFIG.contractAddress}`);

        // 4. Memanggil fungsi mint()
        console.log("⏳ Mencoba memanggil fungsi mint()...");
        const tx = await faucetContract.mint();

        console.log(`✅ Transaksi berhasil dikirim! Hash: ${tx.hash}`);
        console.log("🕒 Menunggu konfirmasi transaksi...");

        // 5. Menunggu Transaksi di-mine
        const receipt = await tx.wait();
        console.log(`🎉 Transaksi telah dikonfirmasi di blok nomor: ${receipt.blockNumber}`);
        console.log("💧 Token berhasil di-claim!");

    } catch (error) {
        console.error("❌ Terjadi kesalahan saat menjalankan bot:");
        // Menampilkan pesan error yang lebih mudah dibaca dari ethers.js
        if (error.reason) {
            console.error("Pesan Error:", error.reason);
        } else {
            console.error(error.message);
        }
    }
}

// Jalankan fungsi utama
claimFaucet();
