import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import YouTubeEmbedWithTimestamp from "../components/YouTubeEmbedWithTimestamp";
import NFTMintComponent from "../components/NFTMintComponent";
import EchoNFTComponent from "../components/EchoNFTComponent";
import SuperChatComponent from "../components/SuperChatComponent";

const records = [
  { user: "0x1a...", amount: "$100", echoCount: 108, timestamp: "0:04:00" },
  { user: "0x2b...", amount: "$20", echoCount: 351, timestamp: "0:03:00" },
  { user: "0x3c...", amount: "$10", echoCount: 1045, timestamp: "0:02:00" },
  { user: "0x4d...", amount: "$50", echoCount: 24, timestamp: "0:01:00" },
];

const handleSuperChat = () => {
  alert("Super Chatボタンがクリックされました");
};

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Site name</h1>
        <ConnectWallet accentColor="black" colorMode="dark" />
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/iw7rCuBYkjc?si=K8YoVPMKVo9vP5h5"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h5>※ライブ配信のタイトル※</h5>
          <p>※配信者名※</p>
          <p>※配信者ID※</p>
          <p>※ライブ配信の説明※</p>
        </div>
      </div>
      <SuperChatComponent onSuperChat={handleSuperChat} />
      <NFTMintComponent
        liveUrl="https://www.youtube.com/live/iw7rCuBYkjc?si=K8YoVPMKVo9vP5h5"
        liverId="0x3a..."
        timestamp="0:00:00"
        contractAddress="0xYourMomentNFTContractAddress"
      />
      <EchoNFTComponent
        parentTokenContract="0xParentContractAddress"
        parentTokenId={1}
        records={records}
      />
    </div>
  );
}
