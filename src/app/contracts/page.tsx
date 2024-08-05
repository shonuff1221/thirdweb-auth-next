// app/contracts/page.tsx

"use client";

import React, { useState } from "react";

export default function ContractsPage() {
  const [contracts, setContracts] = useState([]);

  const fetchContracts = async () => {
    const response = await fetch("/api/contracts");
    const data = await response.json();
    setContracts(data.contracts);
  };

  return (
    <div>
      <h1>Newly Deployed Contracts</h1>
      <button onClick={fetchContracts}>Fetch Contracts</button>
      <ul>
        {contracts.map((contract: any) => (
          <li key={contract.address}>
            <p>Address: {contract.address}</p>
            <p>Deployer: {contract.deployer}</p>
            <p>Liquidity: {contract.liquidity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
