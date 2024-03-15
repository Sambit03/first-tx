"use client";
import { useState } from "react";
import useFirstTransaction from "./hooks/useFirstTx";
export default function Home() {
  const [address, setAddress] = useState("");
  //const ethereumAddress = "0xF95f8038Eb7874Cde88A0A9a8270fcC94f5C226e";
  const etherscanApiKey = "FHK9YPDFQGS3ZQCKGQVWDSUEXWXN48QESY";
  const { firstTransaction } = useFirstTransaction(address, etherscanApiKey);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  console.log(firstTransaction);
  return (
    <main className="flex flex-col items-center justify-around  p-5">
      <h1 className="font-bold"> Get First Transaction</h1>
      <h2 className="text-gray-500">
        What was your first Transaction on Ethereum
      </h2>
      <div className="container mx-auto p-5 max-w-screen-sm p-5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 mr-2 "
              placeholder="Ethereum Address/ENS"
              required
            />

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5  text-center "
            >
              Get
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
