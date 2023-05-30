import React from "react";
import { Box } from "../Box";
import { Button } from "../Button";
import NewSnippetTrigger from "../NewSnippet/NewSnippetTrigger";

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
        <div className="px-4">
          <NewSnippetTrigger />
        </div>
      </Box>
    </div>
  );
};

export default Sidebar;
