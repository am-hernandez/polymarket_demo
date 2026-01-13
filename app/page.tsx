"use client";

import MakeOrder from "./components/MakeOrder";
import Orders from "./components/Orders";

export default function Home() {
  return (
    <div>
      <h1>Chess Market Order</h1>
      <MakeOrder />
      <Orders />
    </div>
  );
}
