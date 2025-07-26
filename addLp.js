// addLp.js
import { ethers } from 'ethers';

async function approveToken(token, amount, signer, spenderAddress, config) {
    const tokenContract = new ethers.Contract(token.address, config.erc20Abi, signer);
    const amountToApprove = ethers.parseUnits(amount, token.decimals);
    
    console.log(`📝 Approval untuk ${amount} ${Object.keys(config.tokenInfo).find(key => config.tokenInfo[key] === token)}...`);
    const approveTx = await tokenContract.approve(spenderAddress, amountToApprove);
    await approveTx.wait();
    console.log(`✅ Approval berhasil!`);
    return amountToApprove;
}

export async function addLiquidity(signer, positionInfo, config) {
    const { token0: token0Name, token1: token1Name, amount0Desired, amount1Desired } = positionInfo;
    const token0 = config.tokenInfo[token0Name];
    const token1 = config.tokenInfo[token1Name];

    console.log(`\n--- Menambah Likuiditas untuk pasangan ${token0Name}/${token1Name} ---`);

    try {
        const managerAddress = config.liquidity.managerAddress;
        
        // --- Langkah 1: Approve kedua token ---
        const amount0 = await approveToken(token0, amount0Desired, signer, managerAddress, config);
        const amount1 = await approveToken(token1, amount1Desired, signer, managerAddress, config);

        // --- Langkah 2: Panggil Mint ---
        const managerContract = new ethers.Contract(managerAddress, config.liquidity.managerAbi, signer);
        const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

        const params = {
            token0: token0.address,
            token1: token1.address,
            fee: positionInfo.fee,
            tickLower: positionInfo.tickLower,
            tickUpper: positionInfo.tickUpper,
            amount0Desired: amount0,
            amount1Desired: amount1,
            amount0Min: 0n, // Sederhanakan, gunakan 0n BigInt
            amount1Min: 0n, // Sederhanakan, gunakan 0n BigInt
            recipient: signer.address,
            deadline: deadline,
        };

        console.log("💧 Menyiapkan untuk memanggil fungsi mint()...");
        const mintTx = await managerContract.mint(params);
        console.log(`🕒 Menunggu konfirmasi penambahan likuiditas... Hash: ${mintTx.hash}`);
        await mintTx.wait();
        console.log("🎉 Likuiditas berhasil ditambahkan!");

    } catch (error) {
        console.error(`❌ Gagal menambah likuiditas:`, error.reason || error.message);
    }
}
