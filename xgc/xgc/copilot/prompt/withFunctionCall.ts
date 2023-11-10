import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const withFunctionCall = ({
  messages,
  functionCall,
}: {
  messages: ChatCompletionMessageParam[];
  functionCall: { name: string; args: unknown };
}): ChatCompletionMessageParam[] => {
  if (messages.length === 0) {
    throw new Error("Cannot add function call because there are no messages");
  }

  return [
    ...messages,
    {
      role: "assistant",
      content: null,
      function_call: {
        name: functionCall.name,
        arguments: JSON.stringify(functionCall.args),
      },
    },
  ];
};
