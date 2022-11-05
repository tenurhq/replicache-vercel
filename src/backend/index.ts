import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { MutatorDefs } from "replicache";
import { createSpace as createSpaceImpl, getCookie } from "../backend/data.js";
import { transact } from "../backend/pg.js";
import { handleRequest as handleRequestImpl } from "../endpoints/handle-request.js";

export async function spaceExists(spaceID: string) {
  const cookie = await transact(async (executor) => {
    return await getCookie(executor, spaceID);
  });
  return cookie !== undefined;
}

export async function createSpace(spaceID: string) {
  await transact(async (executor) => {
    await createSpaceImpl(executor, spaceID);
  });
}

export async function handleRequest<M extends MutatorDefs>(
  req: VercelRequest,
  res: VercelResponse,
  mutators: M
) {
  await handleRequestImpl(req, res, mutators);
}
