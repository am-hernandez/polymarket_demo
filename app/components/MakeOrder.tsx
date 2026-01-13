import { ClobClient } from "@polymarket/clob-client";
import { Side, OrderType } from "@polymarket/clob-client";
import { Wallet } from "ethers"; // v5.8.
import { useEffect, useState } from "react";
import { HOST, CHAIN_ID, SIGNATURE_TYPE_2 } from "../constants";

export default function MakeOrder() {
  const [orderID, setOrderID] = useState("");
  const [status, setStatus] = useState("");
  const [tokenIdYes, setTokenIdYes] = useState("");
  const [tokenIdNo, setTokenIdNo] = useState("");
  const [tokenPriceYes, setTokenPriceYes] = useState(0);
  const [tokenPriceNo, setTokenPriceNo] = useState(0);
  const [marketQuestion, setMarketQuestion] = useState("");
  const [marketDescription, setMarketDescription] = useState("");
  const [conditionId, setConditionId] = useState("");
  const [proxyAddress, setProxyAddress] = useState("");

  const pk = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;
  const signer = new Wallet(pk);
  console.log("Signer addr:", signer.address);

  const client = new ClobClient(HOST, CHAIN_ID, signer);

  // Get existing API key, or create one if none exists
  const userApiCreds = client.createOrDeriveApiKey().then(async (creds) => {
    console.log("API Key:", creds.key.slice(0, 5) + "...");
    console.log("Secret:", creds.secret.slice(0, 5) + "...");
    console.log("Passphrase:", creds.passphrase.slice(0, 5) + "...");
    return creds;
  });


  const makeMarketOrder = async (tokenId: string, tokenPrice: number) => {
    console.log("Making market order from proxy address:", proxyAddress);
    try {
      const clobClient = new ClobClient(
        HOST,
        CHAIN_ID,
        signer,
        await userApiCreds,
        SIGNATURE_TYPE_2,
        proxyAddress
      );

      const market = await clobClient.getMarket(conditionId);

      const response = await clobClient.createAndPostOrder(
        {
          tokenID: tokenId,
          price: tokenPrice,
          size: 5,            // Number of shares
          side: Side.BUY,     // BUY or SELL
        },
        {
          tickSize: market.tickSize,
          negRisk: market.negRisk,    // true for multi-outcome events
        },
        OrderType.GTC                 // Good-Til-Cancelled
      );
  
      console.log("Order ID:", response.orderID);
      console.log("Status:", response.status);
  
      setOrderID(response.orderID);
      setStatus(response.status);
    } catch (err) {
      console.error("Error making market order:", err);
    }
  }

  useEffect(() => {
    const getMarket = async () => {
      const market = await fetch(`/api/markets`);
      const marketData = await market.json();
      console.log("MarketData:::", marketData);

      setMarketQuestion(marketData.question);
      setMarketDescription(marketData.description);
      setTokenIdYes(JSON.parse(marketData.clobTokenIds)[0]);
      setTokenPriceYes(Number(JSON.parse(marketData.outcomePrices)[0]));
      setTokenIdNo(JSON.parse(marketData.clobTokenIds)[1]);
      setTokenPriceNo(Number(JSON.parse(marketData.outcomePrices)[1]));

      // set condition id to search market
      const conditionId = marketData.conditionId;
      setConditionId(conditionId);
    }
    getMarket();
  }, [tokenIdYes, tokenPriceYes, tokenIdNo, tokenPriceNo]);

  useEffect(() => {
    const getWallet = async () => {
      const wallet = await fetch(`/api/wallet?walletAddress=${signer.address}`);
      const walletData = await wallet.json();
      setProxyAddress(walletData.proxyWallet);
    }
    getWallet();
  }, [signer.address]);

  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300 p-4 rounded-md">
      <h1 className="text-2xl font-bold">{marketQuestion}</h1>
      <br/>
      <p className="text-sm text-gray-500">{marketDescription}</p>

      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex flex-col items-center justify-center">
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => makeMarketOrder(tokenIdYes, tokenPriceYes)}>Yes</button>
        <p>${tokenPriceYes}</p>
        </div>

<div className="flex flex-col items-center justify-center">
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => makeMarketOrder(tokenIdNo, tokenPriceNo)}>No</button>
        <p>${tokenPriceNo}</p>
        </div>
      </div>
    </div>
  );
}