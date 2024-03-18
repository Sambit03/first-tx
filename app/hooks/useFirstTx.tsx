"use client";
import { useState, useEffect } from "react";

interface Transaction {
  input: String;
  hash: string;
  from: string;
  to: string;
  value: number;
}

const useFirstTransaction = (address: string | null, apiKey: string) => {
  const [firstTransaction, setFirstTransaction] = useState<Transaction | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFirstTransaction = async () => {
      try {
        const response = await fetch(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        if (data.result.length > 0) {
          setFirstTransaction(data.result[0]);
        } else {
          setFirstTransaction(null);
        }
        setError(null);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchFirstTransaction();
  }, [address, apiKey]);

  return { firstTransaction, error };
};

export default useFirstTransaction;
