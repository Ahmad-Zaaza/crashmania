import React from "react";

import AuthButton from "./AuthButton";
import { Stack } from "../Stack";

const AuthButtons = () => {
  return (
    <Stack gap={2}>
      <AuthButton mode="login" />
      <AuthButton mode="signup" />
    </Stack>
  );
};

export default AuthButtons;
