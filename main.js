// main.js

import { ethers } from 'ethers';
import CONFIG from './config.js';
import 'dotenv/config';
import { addLiquidity } from './addLp.js';

async function main() {
    console.log("🤖 === DEBUGGING MODE: ADD LP (ETH/USDT) === 🤖");

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log(`🔌 Terhubung ke RPC dan menggunakan dompet: ${signer.address}`);

    // --- TAHAP 3: TAMBAHKAN LIKUIDITAS ---
    console.log("\n💧 Memulai Modul Penambahan Likuiditas...");
    if (!CONFIG.liquidity.managerAddress.startsWith('0x')) {
        console.error("❌ HENTIKAN: Harap isi `POSITION_MANAGER_ADDRESS` di config.js!");
    } else {
        for (const position of CONFIG.liquidity.positions) {
            await addLiquidity(signer, position, CONFIG);
        }
    }
    
    console.log("\n🏁 === DEBUGGING SELESAI === 🏁");
}

main().catch(error => {
    console.error("❌ Terjadi kesalahan fatal di alur utama:", error);
    process.exit(1);
});
