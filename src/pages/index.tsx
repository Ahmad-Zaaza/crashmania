import Navbar from "../components/Navbar/Navbar";
import { NextPageWithLayout } from "./_app";
import HomeFeed from "../components/HomeFeed/HomeFeed";
import Appbar from "../components/Appbar/Appbar";
import { Box } from "@/components";
import Sidebar from "@/components/Sidebar/Sidebar";
import MultiplierGraph from "@/components/MultiplierGraph/MultiplierGraph";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-[80px] isolate pt-8 pb-28 md:pb-16 gap-8  flex">
        <Sidebar />
        <main className="flex-1 max-w-[700px] mx-auto px-4">
          <MultiplierGraph />
        </main>
      </div>
      <Appbar />
    </>
  );
};
export default Home;

Home.getLayout = function getLayout(page) {
  return <>{page}</>;
};
