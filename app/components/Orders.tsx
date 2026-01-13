import {ClobClient, OpenOrder} from "@polymarket/clob-client";

import Order from "./Order";
import { CHAIN_ID, HOST, SIGNATURE_TYPE_2 } from "../constants";
import { Wallet } from "ethers";

type OrdersProps = {
  getOrders: () => void;
  orders: OpenOrder[];
}

export default function Orders({ getOrders, orders }: OrdersProps) {
  // Cancel a single order
  const cancelOrder = async (orderId: string) => {
    try{
      const pk = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;
      const signer = new Wallet(pk);
      const client = new ClobClient(HOST, CHAIN_ID, signer);
      const creds = await client.createOrDeriveApiKey();
      const clobClient = new ClobClient(HOST, CHAIN_ID, signer, creds, SIGNATURE_TYPE_2, signer.address);
      const response = await clobClient.cancelOrder({
        orderID: orderId,
      });
      console.log("Cancel Order Response:", response);
    } catch (err) {
      console.error("Error canceling order:", err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300 p-4 rounded-md">
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="text-sm text-gray-500">
        This is a list of all the orders that have been made.
      </p>

      {/* Get open orders */}
      <button className="bg-blue-500 text-white p-2 rounded-md mb-2" onClick={getOrders}>Get Open Orders</button>

      <div className="flex flex-col items-center justify-center gap-2">
        {orders && orders.map((order) => (
          <Order key={order.id} order={order} cancelOrder={cancelOrder} />
        ))}
      </div>

    </div>
  );
}