import Navbar from "../components/Navbar/Navbar";
import { NextPageWithLayout } from "./_app";
import Appbar from "../components/Appbar/Appbar";
import { Box } from "@/components";
import Sidebar from "@/components/Sidebar/Sidebar";
import MultiplierGraph from "@/components/MultiplierGraph/MultiplierGraph";
import LeftSide from "@/components/LeftSide/LeftSide";
import RightSide from "@/components/RightSide/RightSide";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-[1366px] mx-auto px-4 mt-[80px] isolate pt-8 pb-28 md:pb-16 gap-8 flex">
        <LeftSide />
        <RightSide />
      </main>
      {/* <Sidebar /> */}
      <Appbar />
    </>
  );
};
export default Home;

Home.getLayout = function getLayout(page) {
  return <>{page}</>;
};
