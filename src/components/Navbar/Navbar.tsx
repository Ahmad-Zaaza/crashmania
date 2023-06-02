"use client";

import Link from "next/link";
import Logo from "../Logo/Logo";
import { Stack } from "../Stack";
import { FcSalesPerformance } from "react-icons/fc";
import { Text } from "../Text";
import { useGetPlayers } from "@/features/players/playersQueries";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";

function Navbar() {
  const { data: players } = useGetPlayers({
    select: players => players.filter(p => !p.bot),
  });
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
          <Text variant="titleMedium">{players?.[0].points}</Text>
        </Stack>
        <Stack
          className="rounded-2xl bg-neutral-600"
          alignItems="center"
          paper
          p={2}
          gap={4}
        >
          <Avatar className="bg-primary">
            <AvatarImage />
            <AvatarFallback>
              {players?.[0].name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Text variant="titleMedium">{players?.[0].name}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Navbar;
