const express = require("express");
const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { ethers } = require("ethers");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

// プロバイダーとウォレットの設定
const provider = new ethers.providers.JsonRpcProvider(
  process.env.POLYGON_RPC_URL
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const sdk = new ThirdwebSDK(wallet);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = sdk.getContract(contractAddress);

app.post("/api/check-nfts", async (req, res) => {
  const { walletA, walletB } = req.body;

  try {
    // ウォレットAとウォレットBのNFTを取得
    const walletANFTs = await contract.call("tokensOfOwner", walletA);
    const walletBNFTs = await contract.call("tokensOfOwner", walletB);

    // ウォレットAとウォレットBのメタデータを取得
    const walletAMetaData = await Promise.all(
      walletANFTs.map(async (id) => {
        return await contract.call("tokenMetaData", id);
      })
    );

    const walletBMetaData = await Promise.all(
      walletBNFTs.map(async (id) => {
        return await contract.call("tokenMetaData", id);
      })
    );

    // 共通のLiver IDsを見つける
    const commonLiverIds = walletAMetaData
      .filter((dataA) => dataA.amount > 0)
      .map((dataA) => dataA.liverAddress)
      .filter((liverAddressA) =>
        walletBMetaData.some(
          (dataB) => dataB.liverAddress === liverAddressA && dataB.amount > 0
        )
      );

    // 共通のEcho NFTsを見つける
    const commonEchoNFTs = walletAMetaData.filter((dataA) =>
      walletBMetaData.some(
        (dataB) =>
          dataB.liveUrl === dataA.liveUrl &&
          dataB.liverAddress === dataA.liverAddress &&
          dataB.timeStamp === dataA.timeStamp
      )
    );

    res.json({
      commonLiverIds,
      commonEchoNFTs,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
