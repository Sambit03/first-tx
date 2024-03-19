import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

interface EnsResponse {
  error: string | null;
  ensAvatar: string | null;
}

const getEnsAvatar = async (input: string): Promise<EnsResponse> => {
  try {
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    });

    let error: string | null = null;
    let ensText: string | null = null;
    const normalizedInput = input.trim();
    console.log("Normalized Input:", normalizedInput);
    ensText = await publicClient.getEnsAvatar({
      name: normalize(normalizedInput),
    });
    console.log("ENS Text:", ensText);
    return { error: null, ensAvatar: ensText };
  } catch (error: any) {
    return {
      error: "Error fetching Ens name: " + error.message,
      ensAvatar: null,
    };
  }
};

export default getEnsAvatar;
