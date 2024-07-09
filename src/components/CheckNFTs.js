// src/components/CheckNFTs.js
import React, { useState } from "react";

const CheckNFTs = () => {
  const [walletA, setWalletA] = useState("");
  const [walletB, setWalletB] = useState("");
  const [commonTokenIds, setCommonTokenIds] = useState([]);

  const handleCheckNFTs = async () => {
    try {
      const response = await fetch("/api/check-nfts-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletA, walletB }),
      });

      const data = await response.json();

      if (response.ok) {
        setCommonTokenIds(data.commonTokenIds);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Check Common NFTs</h5>
        <div className="mb-3">
          <label htmlFor="walletA" className="form-label">
            Wallet A
          </label>
          <input
            type="text"
            className="form-control"
            id="walletA"
            value={walletA}
            onChange={(e) => setWalletA(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="walletB" className="form-label">
            Wallet B
          </label>
          <input
            type="text"
            className="form-control"
            id="walletB"
            value={walletB}
            onChange={(e) => setWalletB(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleCheckNFTs}>
          Check NFTs
        </button>
        {commonTokenIds.length > 0 && (
          <div className="mt-3">
            <h6>Common Token IDs:</h6>
            <ul>
              {commonTokenIds.map((tokenId) => (
                <li key={tokenId}>{tokenId}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckNFTs;
