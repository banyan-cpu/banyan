import { z } from "zod";
import { signature as acceptChannelInviteSignature } from "./accept-channel-invite/signature.js";
import { signature as declineChannelInviteSignature } from "./decline-channel-invite/signature.js";
import { signature as deleteChannelSignature } from "./delete-channel/signature.js";
import { signature as createChannelSignature } from "./create-channel/signature.js";
import { signature as inviteMemberToChannelSignature } from "./invite-member-to-channel/signature.js";
import { signature as leaveChannelSignature } from "./leave-channel/signature.js";
import { signature as removeMemberFromChannelSignature } from "./remove-member-from-channel/signature.js";

export const signatureSchema = z.union([
  createChannelSignature,
  deleteChannelSignature,
  removeMemberFromChannelSignature,
  inviteMemberToChannelSignature,
  leaveChannelSignature,
  acceptChannelInviteSignature,
  declineChannelInviteSignature,
]);
