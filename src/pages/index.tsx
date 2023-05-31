import Navbar from "../components/Navbar/Navbar";
import { NextPageWithLayout } from "./_app";
import Appbar from "../components/Appbar/Appbar";
import { useGameContext } from "@/contexts/GameContext";
import dynamic from "next/dynamic";

const OnboardingDialog = dynamic(
  () => import("@/components/OnboardingDialog/OnboardingDialog"),
  {
    ssr: false,
  }
);
const GameScreen = dynamic(() => import("@/components/GameScreen/GameScreen"), {
  ssr: false,
});

const Home: NextPageWithLayout = () => {
  const { players } = useGameContext();

  if (players.length === 0) {
    return <OnboardingDialog />;
  }
  return (
    <>
      <Navbar />

      <GameScreen />

      <Appbar />
    </>
  );
};
export default Home;

Home.getLayout = function getLayout(page) {
  return <>{page}</>;
};
