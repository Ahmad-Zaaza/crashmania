import React from "react";
import { Box } from "../Box";
import { Button } from "../Button";

const Sidebar = () => {
  return (
    <div className="relative hidden md:block basis-[270px]">
      <Box
        paper
        position="fixed"
        top="80px"
        w="270px"
        bottom={0}
        py={4}
        className="hidden md:block"
      >
        
      </Box>
    </div>
  );
};

export default Sidebar;
