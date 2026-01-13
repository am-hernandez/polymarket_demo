"use client";

import CreateOrder from "./components/CreateOrder";
import Orders from "./components/Orders";

export default function Home() {
  return (
    <div>
      <h1>Chess Market Order</h1>
      <CreateOrder />
      <Orders />
    </div>
  );
}
