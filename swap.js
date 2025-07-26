// swap.js
import { ethers } from 'ethers';

export async function performSwap(signer, swapInfo, config) {
    const { from, to, amount, fee } = swapInfo;
    const tokenIn = config.tokenInfo[from];
    const tokenOut = config.tokenInfo[to];
    
    console.log(`\n--- Memproses Swap: ${amount} ${from} ke ${to} ---`);

    try {
        // --- Langkah 1: Approve ---
        const tokenInContract = new ethers.Contract(tokenIn.address, config.erc20Abi, signer);
        
        // ethers.parseUnits sudah mengembalikan BigInt, jadi ini sudah benar
        const amountIn = ethers.parseUnits(amount, tokenIn.decimals); 

        console.log(`📝 Approval untuk ${amount} ${from}...`);
        const approveTx = await tokenInContract.approve(config.swap.routerAddress, amountIn);
        await approveTx.wait();
        console.log("✅ Approval berhasil!");

        // --- Langkah 2: Swap ---
        const routerContract = new ethers.Contract(config.swap.routerAddress, config.swap.routerAbi, signer);
        const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

        const params = {
            tokenIn: tokenIn.address,
            tokenOut: tokenOut.address,
            fee: fee,
            recipient: signer.address,
            deadline: deadline,
            amountIn: amountIn, // ini sudah BigInt dari parseUnits
            amountOutMinimum: 0n, // <-- PERUBAHAN: Gunakan 0n untuk BigInt
            sqrtPriceLimitX96: 0n // <-- PERUBAHAN: Gunakan 0n untuk BigInt
        };

        console.log(`🔄 Melakukan swap...`);
        const swapTx = await routerContract.exactInputSingle(params);
        await swapTx.wait();
        console.log(`🎉 Swap ${from} ke ${to} berhasil dikonfirmasi!`);

    } catch (error) {
        console.error(`❌ Gagal melakukan swap ${from} ke ${to}:`, error.reason || error.message);
    }
}
