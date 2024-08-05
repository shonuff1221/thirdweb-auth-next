// app/transactions/page.tsx

"use client";

import React, { useState } from "react";

export default function TransactionsPage() {
  const [wallet, setWallet] = useState("");
  const [days, setDays] = useState("7");
  const [transactions, setTransactions] = useState([]);
  const [profit, setProfit] = useState(0);

  const fetchTransactions = async () => {
    const response = await fetch(
      `/api/transactions?wallet=${wallet}&days=${days}`
    );
    const data = await response.json();
    setTransactions(data.transactions);
    setProfit(data.profit);
  };

  return (
    <div>
      <h1>Wallet Transactions</h1>
      <input
        type="text"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="Wallet Address"
      />
      <select value={days} onChange={(e) => setDays(e.target.value)}>
        <option value="1">Last 24 Hours</option>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
      </select>
      <button onClick={fetchTransactions}>Fetch Transactions</button>
      <h2>Profit: {profit}</h2>
      <ul>
        {transactions.map((tx: any) => (
          <li key={tx.id}>
            <p>
              Token 1: {tx.tokenAddress1} Amount: {tx.amount1}
            </p>
            <p>
              Token 2: {tx.tokenAddress2} Amount: {tx.amount2}
            </p>
            <p>Date: {new Date(tx.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
