import RightSide from "../RightSide/RightSide";
import LeftSide from "../LeftSide/LeftSide";

const GameScreen = () => {
  return (
    <main className="max-w-[1366px] mx-auto px-4 mt-[80px] flex flex-col gap-8 isolate pt-8 pb-28 md:pb-16">
      <RightSide />
      <LeftSide />
    </main>
  );
};

export default GameScreen;
