import Navbar from "../components/Navbar/Navbar";
import { NextPageWithLayout } from "./_app";
import Appbar from "../components/Appbar/Appbar";
import LeftSide from "@/components/LeftSide/LeftSide";
import RightSide from "@/components/RightSide/RightSide";
import { useGameContext } from "@/contexts/GameContext";
import dynamic from "next/dynamic";

const OnboardingDialog = dynamic(
  () => import("@/components/OnboardingDialog/OnboardingDialog"),
  {
    ssr: false,
  }
);

const Home: NextPageWithLayout = () => {
  const { players } = useGameContext();

  if (players.length === 0) {
    return <OnboardingDialog />;
  }
  return (
    <>
      <Navbar />
      <main className="max-w-[1366px] mx-auto px-4 mt-[80px] isolate pt-8 pb-28 md:pb-16 gap-8 flex">
        <LeftSide />
        <RightSide />
      </main>
      <Appbar />
    </>
  );
};
export default Home;

Home.getLayout = function getLayout(page) {
  return <>{page}</>;
};
