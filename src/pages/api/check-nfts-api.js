// src/pages/api/check-nfts-api.js
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  process.env.RPC_URL,
  process.env.NETWORK
);
const sdk = new ThirdwebSDK(provider, {
  clientId: process.env.THIRDWEB_CLIENT_ID,
  clientSecret: process.env.THIRDWEB_SECRET_KEY,
});
const contractAddress = process.env.NFT_CONTRACT_ADDRESS;
const contract = sdk.getContract(contractAddress);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { walletA, walletB } = req.body;

  try {
    const getOwnedTokenIds = async (walletAddress) => {
      const sentLogs = await contract.events.query("Transfer", {
        from: walletAddress,
      });
      const receivedLogs = await contract.events.query("Transfer", {
        to: walletAddress,
      });

      const logs = sentLogs
        .concat(receivedLogs)
        .sort(
          (a, b) =>
            a.blockNumber - b.blockNumber ||
            a.transactionIndex - b.transactionIndex
        );

      const owned = new Set();

      for (const log of logs) {
        if (log.args) {
          const { from, to, tokenId } = log.args;
          if (to.toLowerCase() === walletAddress.toLowerCase()) {
            owned.add(tokenId.toString());
          } else if (from.toLowerCase() === walletAddress.toLowerCase()) {
            owned.delete(tokenId.toString());
          }
        }
      }

      return Array.from(owned);
    };

    const walletATokenIds = await getOwnedTokenIds(walletA);
    const walletBTokenIds = await getOwnedTokenIds(walletB);

    const commonTokenIds = walletATokenIds.filter((tokenId) =>
      walletBTokenIds.includes(tokenId)
    );

    res.status(200).json({
      commonTokenIds,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
