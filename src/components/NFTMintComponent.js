import React from "react";
import { Web3Button } from "@thirdweb-dev/react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/NFTMintComponent.module.css";

const NFTMintComponent = ({ liveUrl, liverId, timestamp }) => {
  return (
    <div className="container mt-5">
      <h5>Super Chatしたあなた限定 Moment NFTをMintしましょう！</h5>
      <p>NFTには以下の情報がMetaデータとして記録されます。</p>
      <table className="table">
        <thead>
          <tr>
            <th>Meta data Information</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LIVE URL</td>
            <td>{liveUrl}</td>
          </tr>
          <tr>
            <td>LIVER ID</td>
            <td>{liverId}</td>
          </tr>
          <tr>
            <td>TIME STAMP</td>
            <td>{timestamp}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-info">Mint NFT</button>
    </div>
  );
};

export default NFTMintComponent;
