interface Transaction {
  input: String;
  hash: string;
  from: string;
  to: string;
  value: bigint;
}

const getFirstTransaction = async (address: string, apiKey: string) => {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    if (data.result.length > 0) {
      return data.result[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching first transaction:", error);
    return null;
  }
};

export default getFirstTransaction;
