import React from "react";
import { Stack } from "../Stack";
import { Input } from "../Input";
import { Button } from "../Button";

interface IProps {
  value: string;
}

const ChatInput = () => {
  return (
    <Stack alignItems="center" gap={2} justifyContent="space-between">
      <Input placeholder="Enter your message..." className="flex-1" />{" "}
      <Button theme="primary">Send</Button>
    </Stack>
  );
};

export default ChatInput;
