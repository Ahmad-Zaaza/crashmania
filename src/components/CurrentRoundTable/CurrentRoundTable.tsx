import React from "react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { FcSalesPerformance } from "react-icons/fc";
import RoundTableRow from "./RoundTableRow";

const CurrentRoundTable = () => {
  return (
    <Box>
      <Stack
        className="bg-neutral-800"
        gap={4}
        justifyContent="space-between"
        p={4}
      >
        <Text>4 Players</Text>
        <Stack alignItems="center" gap={2}>
          <FcSalesPerformance />
          <Text>15000</Text>
        </Stack>
      </Stack>
      <div >
       <RoundTableRow name='Ahmad' multiplier={1.2} stake={150}/>
       <RoundTableRow name='CPU 1' multiplier={1.5} stake={350}/>
       <RoundTableRow name='CPU 2' multiplier={2.5} stake={250}/>
       <RoundTableRow name='CPU 3' multiplier={23.55} stake={450}/>
       <RoundTableRow name='CPU 4' multiplier={2.75} stake={100}/>
       
      </div>
    </Box>
  );
};

export default CurrentRoundTable;
