import { Client } from "@xmtp/xmtp-js";
import { DescriptiveError } from "../../lib/DescriptiveError.js";
import { User } from "../../channel/User.js";
import { readChannel } from "../../channel/store/readChannel.js";
import { deleteChannel as storeDeleteChannel } from "../../channel/store/deleteChannel.js";
import { publishToChannel } from "../../channel/publishToChannel.js";

const NO_CHANNEL_ERROR_DESCRIPTION = `
  We attempted to delete a channel that does not exist.
`;

export const deleteChannel = async ({
  userDoingTheDeleting,
  channelAddress,
  copilotClient,
}: {
  userDoingTheDeleting: User;
  channelAddress: string;
  copilotClient: Client;
}) => {
  let channel = readChannel({
    userDoingTheReading: userDoingTheDeleting,
    channelAddress,
  });

  if (channel === undefined) {
    throw new DescriptiveError(
      NO_CHANNEL_ERROR_DESCRIPTION,
      `Failed to delete channel ${channelAddress} because the channel does not exist`,
    );
  }

  channel = storeDeleteChannel({ userDoingTheDeleting, channel });

  channel.stream.return(null);

  publishToChannel({
    fromUser: { address: copilotClient.address },
    channel,
    message: `This channel's owner has deleted the channel, messages will no longer be broadcast to the rest of the channel's members.`,
  });

  return { ok: true, result: { deletedChannelAddress: channel.address } };
};