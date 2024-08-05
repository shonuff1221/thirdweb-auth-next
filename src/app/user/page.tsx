// app/user/page.tsx

"use client";

import React, { useState } from "react";

export default function UserPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [favoriteAddress, setFavoriteAddress] = useState("");
  const [favorites, setFavorites] = useState([]);

  const createUser = async () => {
    const response = await fetch("/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletAddress }),
    });
    const data = await response.json();
    console.log(data);
  };

  const addFavorite = async () => {
    const response = await fetch("/api/user/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletAddress, favoriteAddress }),
    });
    const data = await response.json();
    setFavorites(data.favorites);
  };

  const removeFavorite = async () => {
    const response = await fetch("/api/user/favorite", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletAddress, favoriteAddress }),
    });
    const data = await response.json();
    setFavorites(data.favorites);
  };

  const fetchFavorites = async () => {
    const response = await fetch(
      `/api/user/favorite?walletAddress=${walletAddress}`
    );
    const data = await response.json();
    setFavorites(data);
  };

  return (
    <div>
      <h1>User Management</h1>
      <input
        type="text"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        placeholder="Wallet Address"
      />
      <button onClick={createUser}>Create User</button>
      <h2>Favorites</h2>
      <input
        type="text"
        value={favoriteAddress}
        onChange={(e) => setFavoriteAddress(e.target.value)}
        placeholder="Favorite Wallet Address"
      />
      <button onClick={addFavorite}>Add Favorite</button>
      <button onClick={removeFavorite}>Remove Favorite</button>
      <button onClick={fetchFavorites}>Fetch Favorites</button>
      <ul>
        {favorites.map((fav: string) => (
          <li key={fav}>{fav}</li>
        ))}
      </ul>
    </div>
  );
}
