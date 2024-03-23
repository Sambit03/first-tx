import { getFrameMessage } from "frames.js/next/server";
import { FrameActionPayload } from "frames.js";

import { NextRequest } from "next/server";

import getFirstTransaction from "@/app/utils/getFirstTx";

export async function POST(request: NextRequest) {
  console.log("request:", request);

  const farmeActionPayload: FrameActionPayload = await request.json();
  console.log("farmeActionPayload:", farmeActionPayload);

  const frameMessage = await getFrameMessage(farmeActionPayload);
  console.log("frameMessage:", frameMessage);

  const address = frameMessage?.inputText;

  const firstTx = await getFirstTransaction(address);
  console.log("firstTx:", firstTx);

  return new Response("Its working", {
    status: 200,
  });
}
