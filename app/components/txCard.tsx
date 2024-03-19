import Image from "next/image";
import { useEffect, useState } from "react";
import getEnsAvatar from "../utils/getEnsAvatar";
interface TransactionCardProps {
  address: string;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  address,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

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

  console.log("avatar-", avatarUrl);
  return (
    <div className="max-w-500px mx-auto rounded shadow-lg bg-white border-2 border-gray-300">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{address}</div>
        {avatarUrl ? (
          <Image src={avatarUrl} width={50} height={50} alt="Avatar" />
        ) : (
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        )}

        <p className="text-gray-700 text-base">
          From: <br />
          To: <br />
          Gas Cost: <br />
          Amount:
        </p>
      </div>
    </div>
  );
};
