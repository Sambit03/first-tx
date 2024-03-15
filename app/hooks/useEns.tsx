"use client";
import { useState, useEffect } from "react";
import { Address, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

interface EnsNameResponse {
  ensName: string | null;
  loading: boolean;
  error: string | null;
}

const useEnsName = (address: string): EnsNameResponse => {
  const [ensName, setEnsName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchEnsName = async () => {
      const publicClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      });
      if (!address) {
        setError("Empty address or ENS name provided.");
        setLoading(false);
        return;
      }

      if (address.startsWith("0x")) {
        try {
          const result = await publicClient.getEnsName({
            address: address as Address,
          });
          setEnsName(result);
        } catch (error: any) {
          console.error("Error fetching Ens name:", error);
          setError("Error fetching Ens name: " + error.message);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const normalizedAddress = normalize(address as Address);
          if (!normalizedAddress) {
            setLoading(false);
            setError("Invalid ENS name provided.");
            return;
          }
          const result = await publicClient.getEnsAddress({
            name: normalizedAddress,
          });
          setEnsName(result);
        } catch (error: any) {
          console.error("Error fetching Ens name:", error);
          setError("Error fetching Ens name: " + error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEnsName();
  }, [address]);
  return { ensName, loading, error };
};

export default useEnsName;
