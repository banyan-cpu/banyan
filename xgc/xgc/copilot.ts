import { z } from "zod";
import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "@ethersproject/wallet";
import { createServer } from "./xmtp/server/create.js";
import { subscribe } from "./xmtp/server/subscribe.js";
import { start } from "./xmtp/server/start.js";
import { dispatch } from "./copilot/dispatch.js";

const XGC_PRIVATE_KEY = z.string().parse(process.env.XGC_PRIVATE_KEY);

const wallet = new Wallet(XGC_PRIVATE_KEY);
const client = await Client.create(wallet, { env: "production" });

const server = createServer({
  fromClient: client,
});

subscribe({ toServer: server, handlerId: "dispatch", usingHandler: dispatch });

start({ server });
