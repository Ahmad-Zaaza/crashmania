"use client";

import Link from "next/link";
import Logo from "../Logo/Logo";
import UserDropdown from "../UserDropdown/UserDropdown";
import { Stack } from "../Stack";
import { useGameContext } from "@/contexts/GameContext";
import { FcBusinessman, FcSalesPerformance } from "react-icons/fc";
import { Text } from "../Text";

function Navbar() {
  const { players } = useGameContext();
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
      <Stack gap={4}>
        <Stack
          className="rounded-2xl bg-neutral-600"
          alignItems="center"
          paper
          p={2}
          gap={4}
        >
          <FcSalesPerformance size={25} />
          <Text variant="titleMedium">{players[0].points}</Text>
        </Stack>
        <Stack
          className="rounded-2xl bg-neutral-600"
          alignItems="center"
          paper
          p={2}
          gap={4}
        >
          <FcBusinessman size={25} />
          <Text variant="titleMedium">{players[0].name}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Navbar;
