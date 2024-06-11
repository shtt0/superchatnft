import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/EchoNFTComponent.module.css";

const EchoNFTComponent = ({ records }) => {
  return (
    <div className="container mt-5">
      <h5>Super Chatしたユーザに Echoを送ろう！（ないすぱ！）</h5>
      <p>Moment NFTの子NFT=Echo NFTを発行できます。</p>
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Echo Count</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.user}</td>
              <td>{record.amount}</td>
              <td>{record.echoCount}</td>
              <td>{record.timestamp}</td>
              <td>
                <button className="btn btn-info">Mint Echo NFT</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EchoNFTComponent;
