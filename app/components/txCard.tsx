import Image from "next/image";
import { useEffect, useState } from "react";
import getEnsAvatar from "../utils/getEnsAvatar";
import { formatEther } from "viem";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import getEns from "../utils/getEns";

interface TransactionCardProps {
  address: string;
  transaction: {
    input: string | null;
    hash: string | null;
    from: string | null;
    to: string | null;
    value: bigint;
    timeStamp?: number;
  };
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  address,
  transaction,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [txTime, setTxTime] = useState<string | null>(null);
  const [txFrom, setTxFrom] = useState("");
  const [txTo, setTxTo] = useState("");
  useEffect(() => {
    if (transaction !== null) {
      const amountFormatted = formatEther(transaction?.value);
      setAmount(amountFormatted);
      const unixTimestamp = transaction.timeStamp;
      if (unixTimestamp !== undefined) {
        const dateObject = new Date(unixTimestamp * 1000);
        const timeAgo = formatDistanceToNow(dateObject, { addSuffix: true });
        console.log(timeAgo);
        const humanDate = dateObject.toLocaleString();
        setTxTime(timeAgo);
      } else {
        console.log("Timestamp is undefined.");
        setTxTime(null);
      }
    }
  }, [transaction]);
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const { ensAvatar } = await getEnsAvatar(address);
        if (ensAvatar != null) {
          setAvatarUrl(ensAvatar);
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar();
  }, [address]);
  const fetchEns = async (
    address: string,
    setTxFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const { value, error } = await getEns(address);
      console.log("ens value", value);
      if (error) {
        console.error("Error fetching Ens:", error);
        setTxFunction(address);
      } else {
        setTxFunction(value || address);
      }
    } catch (error) {
      console.error("Error fetching Ens:", error);
      setTxFunction(address);
    }
  };

  useEffect(() => {
    if (transaction) {
      fetchEns(transaction.from as string, setTxFrom);
      fetchEns(transaction.to as string, setTxTo);
    }
  }, [transaction]);

  return (
    <div className="max-w-500px mx-auto rounded shadow-lg bg-white border-2 border-gray-300">
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-green-500 mb-2">{address}</div>
        <div className="flex flex-end">
          {avatarUrl ? (
            <Image src={avatarUrl} width={50} height={50} alt="Avatar" />
          ) : (
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          )}
          <div className="font-bold text-xl p-5">
            Your First Transaction was {txTime}
          </div>
        </div>
        <p className="text-gray-700 text-base">
          From : {txFrom} <br />
          To : {txTo} <br />
          🤑 : {amount} ETH
        </p>
      </div>
    </div>
  );
};
