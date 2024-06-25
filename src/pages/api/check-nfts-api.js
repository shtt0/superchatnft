import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  process.env.POLYGON_RPC_URL
);
const sdk = new ThirdwebSDK(provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = sdk.getContract(contractAddress);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { walletA, walletB } = req.body;
  console.log("Received request with Wallet A:", walletA, "Wallet B:", walletB);

  try {
    const walletANFTs = await contract.call("tokensOfOwner", walletA);
    const walletBNFTs = await contract.call("tokensOfOwner", walletB);

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

    const commonLiverIds = walletAMetaData
      .filter((dataA) => dataA.amount > 0)
      .map((dataA) => dataA.liverAddress)
      .filter((liverAddressA) =>
        walletBMetaData.some(
          (dataB) => dataB.liverAddress === liverAddressA && dataB.amount > 0
        )
      );

    const commonEchoNFTs = walletAMetaData.filter((dataA) =>
      walletBMetaData.some(
        (dataB) =>
          dataB.liveUrl === dataA.liveUrl &&
          dataB.liverAddress === dataA.liverAddress &&
          dataB.timeStamp === dataA.timeStamp
      )
    );

    res.status(200).json({
      commonLiverIds,
      commonEchoNFTs,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
