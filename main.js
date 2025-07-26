// main.js
import { ethers } from 'ethers';
import CONFIG from './config.js';
import 'dotenv/config';
import { runMultiFaucet } from './faucet.js';
import { performSwap } from './swap.js';

async function main() {
    console.log("🤖 === BOT AUTO FAUCET & SWAP DIMULAI === 🤖");

    // Validasi awal
    if (!CONFIG.swap.routerAddress.startsWith('0x')) {
        console.error("❌ HENTIKAN: Harap isi `SWAP_ROUTER_ADDRESS` di file config.js!");
        return;
    }

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log(`🔌 Terhubung ke RPC dan menggunakan dompet: ${signer.address}`);

    // --- TAHAP 1: JALANKAN SEMUA FAUCET ---
    await runMultiFaucet(signer, CONFIG);

    // --- TAHAP 2: JALANKAN SEMUA SWAP ---
    console.log("\n🚀 Memulai Modul Swap untuk semua pasangan...");
    for (const pair of CONFIG.swap.pairs) {
        await performSwap(signer, pair, CONFIG);
        // Jeda singkat antar swap
        await new Promise(resolve => setTimeout(resolve, 5000)); 
    }
    
    console.log("\n🏁 === SEMUA TUGAS SELESAI === 🏁");
}

main().catch(error => {
    console.error("❌ Terjadi kesalahan fatal di alur utama:", error);
    process.exit(1);
});
