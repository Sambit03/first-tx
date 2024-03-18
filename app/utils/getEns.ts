import { Address, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

interface EnsResponse {
  value: string | null;
  error: string | null;
  ensAvatar: string | null;
}

const getEns = async (input: string): Promise<EnsResponse> => {
  try {
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    });

    if (!input) {
      return {
        value: null,
        error: "Empty address or ENS name provided.",
        ensAvatar: null,
      };
    }

    let result: string | null = null;
    let error: string | null = null;
    let ensText: string | null = null;

    if (input.startsWith("0x")) {
      result = await publicClient.getEnsName({ address: input as Address });
    } else {
      const normalizedAddress = normalize(input as Address);
      if (!normalizedAddress) {
        return {
          value: null,
          error: "Invalid ENS name provided.",
          ensAvatar: null,
        };
      }
      result = await publicClient.getEnsAddress({ name: normalizedAddress });
      ensText = await publicClient.getEnsAvatar({ name: normalizedAddress });
    }

    return { value: result, error: null, ensAvatar: ensText };
  } catch (error: any) {
    return {
      value: null,
      error: "Error fetching Ens name: " + error.message,
      ensAvatar: null,
    };
  }
};

export default getEns;
