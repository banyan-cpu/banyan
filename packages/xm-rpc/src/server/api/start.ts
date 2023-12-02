import { Server } from "../Server.js";
import { onStreamBefore } from "../onStreamBefore.js";
import { onStreamSuccess } from "../onStreamSuccess.js";
import { onStreamError } from "../onStreamError.js";
import { onAlreadyRunning } from "../onAlreadyRunning.js";
import { onUncaughtHandlerError } from "../onUncaughtHandlerError.js";
import { onMessageReceived } from "../onMessageReceived.js";
import { callSubscriber } from "../callSubscriber.js";
import { stop } from "../stop.js";

export const start = async ({ server }: { server: Server }) => {
  if (server.stream !== null) {
    onAlreadyRunning({ server });
    return () => {
      stop({ server });
    };
  }

  onStreamBefore({ server });

  let stream: (typeof server)["stream"];
  try {
    stream = await server.client.conversations.streamAllMessages();
  } catch (err) {
    onStreamError({ server, err });
    throw new Error("Failed to start server");
  }

  onStreamSuccess({ server });

  server.stream = stream;

  (async () => {
    for await (const message of stream) {
      onMessageReceived({ server, message });

      try {
        for (const subscriber of server.subscribers.values()) {
          callSubscriber({
            server,
            subscriber,
            message,
          });
        }
      } catch (err) {
        onUncaughtHandlerError({ server, err });
      }
    }
  })();

  return () => {
    stop({ server });
  };
};