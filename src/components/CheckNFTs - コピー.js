import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/CheckNFTs.module.css";

function CheckNFTs() {
  const [walletA, setWalletA] = useState("");
  const [walletB, setWalletB] = useState("");
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Submitting form with Wallet A:",
      walletA,
      "Wallet B:",
      walletB
    );
    try {
      const response = await axios.post("/api/check-nfts", {
        walletA,
        walletB,
      });
      console.log("API Response:", response.data);
      setResult(response.data);

      if (
        response.data.commonLiverIds.length === 0 &&
        response.data.commonEchoNFTs.length === 0
      ) {
        setErrorMessage(
          "まだ共通の推しはいないようです！お互いの推しライバーを紹介しましょう！"
        );
      } else {
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage(
        "データの取得中にエラーが発生しました。再度お試しください。"
      );
    }
  };

  return (
    <div className="check-nfts-container">
      <h1>NFT共通性検証</h1>
      <form onSubmit={handleSubmit} className="check-nfts-form">
        <input
          type="text"
          placeholder="Wallet A"
          value={walletA}
          onChange={(e) => setWalletA(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Wallet B"
          value={walletB}
          onChange={(e) => setWalletB(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">
          検証する
        </button>
      </form>
      {result && (
        <div className="result-container">
          {errorMessage ? (
            <p className="error-message">{errorMessage}</p>
          ) : (
            <>
              <h2>共通のLiver IDs</h2>
              {result.commonLiverIds.map((id, index) => (
                <p key={index}>{id}</p>
              ))}
              <h2>共通のEcho NFTs</h2>
              {result.commonEchoNFTs.map((nft, index) => (
                <div key={index} className="nft-item">
                  <p>Live URL: {nft.liveUrl}</p>
                  <p>Liver Address: {nft.liverAddress}</p>
                  <p>Timestamp: {nft.timeStamp}</p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CheckNFTs;
