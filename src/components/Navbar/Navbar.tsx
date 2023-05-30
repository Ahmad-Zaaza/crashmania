"use client";

import Link from "next/link";
import Logo from "../Logo/Logo";
import UserDropdown from "../UserDropdown/UserDropdown";
import { Stack } from "../Stack";

function Navbar() {
  // const { data } = useUser();
  return (
    <Stack
      as="nav"
      gap={4}
      p={4}
      h="80px"
      alignItems="center"
      justifyContent="space-between"
      position="fixed"
      top={0}
      left={0}
      right={0}
      paper
      zIndex={1}
    >
      <div className="max-w-[120px]">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </Stack>
  );
}

export default Navbar;
