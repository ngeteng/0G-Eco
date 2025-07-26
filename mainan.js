// main.js
import { ethers } from 'ethers';
import CONFIG from './config.js';
import 'dotenv/config';
import { runMultiFaucet } from './faucet.js';
import { performSwap } from './swap.js';
import { addLiquidity } from './addLp.js';

async function main() {
    console.log("🤖 === BOT AUTO FAUCET, SWAP & ADD LP DIMULAI === 🤖");

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log(`🔌 Terhubung ke RPC dan menggunakan dompet: ${signer.address}`);

    // --- TAHAP 1: JALANKAN SEMUA FAUCET ---
    await runMultiFaucet(signer, CONFIG);

    // --- TAHAP 2: JALANKAN SEMUA SWAP ---
    console.log("\n🚀 Memulai Modul Swap...");
    for (const pair of CONFIG.swap.pairs) {
        await performSwap(signer, pair, CONFIG);
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    // --- TAHAP 3: TAMBAHKAN LIKUIDITAS ---
    console.log("\n💧 Memulai Modul Penambahan Likuiditas...");
    if (!CONFIG.liquidity.managerAddress.startsWith('0x')) {
        console.error("❌ HENTIKAN: Harap isi `POSITION_MANAGER_ADDRESS` di config.js!");
    } else {
        for (const position of CONFIG.liquidity.positions) {
            await addLiquidity(signer, position, CONFIG);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    
    console.log("\n🏁 === SEMUA TUGAS SELESAI === 🏁");
}

main().catch(error => {
    console.error("❌ Terjadi kesalahan fatal di alur utama:", error);
    process.exit(1);
});
