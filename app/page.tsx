"use client";
import { useEffect, useState } from "react";
import getEns from "./utils/getEns";
import getFirstTransaction from "./utils/getFirstTx";
import { Transaction, createPublicClient, http } from "viem";
import { TransactionCard } from "./components/txCard";
export default function Home() {
  const [address, setAddress] = useState("");
  const [newEnsName, setEnsName] = useState("");
  const [ensText, setEnsText] = useState("");
  const [firstTransaction, setFirstTransaction] = useState<Transaction | null>(
    null
  );
  //const ethereumAddress = "0xF95f8038Eb7874Cde88A0A9a8270fcC94f5C226e";
  const etherscanApiKey = process.env.REACT_APP_API_KEY as string;
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleOnChange();
  };

  const handleOnChange = async () => {
    try {
      const { value, error } = await getEns(address);
      if (error) {
        console.error("Error fetching Ens name:", error);
        setEnsName("");
      } else {
        setEnsName(value || "");
      }
    } catch (error) {
      console.error("Error fetching Ens name:", error);
      setEnsName("");
    }
  };
  const fetchTransaction = async () => {
    try {
      if (!address) {
        console.error("Error: Address is null");
        return null;
      }
      if (address.startsWith("0x")) {
        return await getFirstTransaction(address, etherscanApiKey);
      } else {
        const { value, error } = await getEns(address);
        if (error) {
          console.error("Error fetching ENS name:", error);
          return null;
        } else {
          return await getFirstTransaction(value as string, etherscanApiKey);
        }
      }
    } catch (error) {
      console.error("Error fetching first transaction:", error);
      return null;
    }
  };
  useEffect(() => {
    if (address) {
      fetchTransaction().then(setFirstTransaction);
    }

    if (address.endsWith(".eth")) {
      setEnsText(address);
    }
  }, [address]);

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
      <div className="flex flex-row">
        <div>{newEnsName}</div>
      </div>
      {firstTransaction !== null && (
        <TransactionCard
          address={ensText}
          transaction={firstTransaction}
        ></TransactionCard>
      )}
    </main>
  );
}
