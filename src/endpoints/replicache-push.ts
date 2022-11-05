import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { MutatorDefs } from "replicache";
import { push } from "../backend/push.js";

export async function handlePush<M extends MutatorDefs>(
  req: VercelRequest,
  res: VercelResponse,
  mutators: M
) {
  if (req.query["spaceID"] === undefined) {
    res.status(400).send("Missing spaceID");
    return;
  }
  const spaceID = req.query["spaceID"].toString() as string;
  await push(spaceID, req.body, mutators);

  res.status(200).json({});
}
