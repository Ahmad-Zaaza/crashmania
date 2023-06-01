import Navbar from "../components/Navbar/Navbar";
import { NextPageWithLayout } from "./_app";
import dynamic from "next/dynamic";
import { useGetGame } from "@/features/game/gameQueries";

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
  const { data: game } = useGetGame();

  if (!game) {
    return <OnboardingDialog />;
  }
  return (
    <>
      <Navbar />
      <GameScreen />
    </>
  );
};
export default Home;

Home.getLayout = function getLayout(page) {
  return <>{page}</>;
};
