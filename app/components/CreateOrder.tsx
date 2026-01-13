type CreateOrderProps = {
  marketQuestion: string;
  marketDescription: string;
  tokenIdYes: string;
  tokenPriceYes: number;
  tokenIdNo: string;
  tokenPriceNo: number;
  makeMarketOrder: (tokenId: string, tokenPrice: number) => void;
}

export default function CreateOrder({ marketQuestion, marketDescription, tokenIdYes, tokenPriceYes, tokenIdNo, tokenPriceNo, makeMarketOrder }: CreateOrderProps) {
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