// lib/helius.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
const PUMP_FUN_CONTRACT = "https://api.helius.xyz/v0/contracts";

export const fetchNewContracts = async () => {
  const url = `${PUMP_FUN_CONTRACT}/new-contracts?api-key=${HELIUS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  for (const contract of data.contracts) {
    await prisma.contract.create({
      data: {
        address: contract.address,
        deployer: contract.deployer,
        liquidity: contract.liquidity,
      },
    });
  }
};

export const fetchTransactionsByWallet = async (
  walletAddress: string,
  days: number
) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const url = `https://api.helius.xyz/v0/addresses/${walletAddress}/transactions?api-key=${HELIUS_API_KEY}`;
  const response = await fetch(url);
  const transactions = await response.json();
  console.log(transactions);

  let totalProfit = 0;
  let tokenBalances: Record<string, number> = {};

  // Fetch or create the wallet
  let wallet = await prisma.wallet.findUnique({
    where: { address: walletAddress },
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: {
        address: walletAddress,
      },
    });
  } else {
    totalProfit = wallet.totalProfit;
    tokenBalances = wallet.tokenBalances as Record<string, number>;
  }

  for (const tx of transactions) {
    const { tokenAddress1, tokenAddress2, amount1, amount2, date } = tx;

    await prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        tokenAddress1,
        tokenAddress2,
        amount1,
        amount2,
        date: new Date(date),
      },
    });

    // Update token balances
    if (!tokenBalances[tokenAddress1]) {
      tokenBalances[tokenAddress1] = 0;
    }
    if (!tokenBalances[tokenAddress2]) {
      tokenBalances[tokenAddress2] = 0;
    }
    tokenBalances[tokenAddress1] += amount1;
    tokenBalances[tokenAddress2] += amount2;

    // Calculate profitability (simplified example)
    if (amount1 > 0) {
      totalProfit += amount1; // Assuming positive amount is profit
    } else {
      totalProfit -= amount1; // Assuming negative amount is loss
    }
  }

  // Update the wallet with new profit and token balances
  await prisma.wallet.update({
    where: { id: wallet.id },
    data: {
      totalProfit,
      tokenBalances,
    },
  });

  return totalProfit;
};
