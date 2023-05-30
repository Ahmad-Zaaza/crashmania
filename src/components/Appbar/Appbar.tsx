import Link from "next/link";
import React from "react";
import { GoHome, GoPerson, GoSearch } from "react-icons/go";
import { Box } from "../Box";
import { Text } from "../Text";

const Appbar = () => {
  return (
    <Box
      py={4}
      px={8}
      pb={7}
      paper
      position="fixed"
      className="flex gap-6 md:hidden justify-evenly"
      bottom={0}
      left={0}
      right={0}
      h="80px"
    >
      <Link href="/">
        <div className="flex flex-col items-center">
          <GoHome className="fill-primary" size={22} />
          <Text mt={1.5} variant="bodyMedium" className="text-primary">
            Home
          </Text>
        </div>
      </Link>
      <Link href="/">
        <div className="flex flex-col items-center">
          <GoSearch size={22} />
          <Text mt={1.5} variant="bodyMedium">
            Explore
          </Text>
        </div>
      </Link>
      <Link href="/">
        <div className="flex flex-col items-center">
          <GoPerson size={22} />
          <Text mt={1.5} variant="bodyMedium">
            Profile
          </Text>
        </div>
      </Link>
    </Box>
  );
};

export default Appbar;
