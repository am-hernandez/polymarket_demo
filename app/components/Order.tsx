import { OpenOrder } from "@polymarket/clob-client";

type OrderProps = {
  order: OpenOrder;
  cancelOrder: (orderId: string) => void;
}

export default function Order({ order, cancelOrder }: OrderProps) {

  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300 p-4 rounded-md">
      <p className="text-sm text-gray-500">Order ID: {order.id}</p>
      <p className="text-sm text-gray-500">Order Status: {order.status}</p>
      <p className="text-sm text-gray-500">Order Size: {order.original_size}</p>
      <p className="text-sm text-gray-500">Order Price: {order.price}</p>
      <p className="text-sm text-gray-500">Order Side: {order.side}</p>
      <p className="text-sm text-gray-500">Order Type: {order.order_type}</p>
      <p className="text-sm text-gray-500">Order Created At: {order.created_at}</p>
      <p className="text-sm text-gray-500">Order Expiry: {order.expiration}</p>
      <p className="text-sm text-gray-500">Order Market: {order.market}</p>
      <p className="text-sm text-gray-500">Order Token ID: {order.asset_id}</p>
      <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
    </div>
  );
}