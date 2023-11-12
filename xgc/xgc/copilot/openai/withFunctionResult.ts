import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const withFunctionResult = ({
  messages,
  result,
}: {
  messages: ChatCompletionMessageParam[];
  result: {
    name: string;
    content:
      | {
          ok: boolean;
          result: unknown;
        }
      | {
          ok: false;
          error: string;
        };
  };
}): ChatCompletionMessageParam[] => {
  if (messages.length === 0) {
    throw new Error(
      "Cannot add function response because there are no messages",
    );
  }

  const lastMessage = messages[messages.length - 1];

  if (lastMessage.role !== "assistant") {
    throw new Error(
      "Cannot add function response because the last message is not an assistant message",
    );
  }

  if (lastMessage.function_call === undefined) {
    throw new Error(
      "Cannot add function response because the last message does not have a function call",
    );
  }

  return [
    ...messages,
    {
      role: "function",
      name: result.name,
      content: JSON.stringify(result.content),
    },
  ];
};