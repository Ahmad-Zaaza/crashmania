import RightSide from "../TopSide/TopSide";
import LeftSide from "../BottomSide/BottomSide";
import Chat from "../Chat/Chat";

const GameScreen = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[3fr_450px] gap-8 pt-8 pb-28 md:pb-16 px-4 mt-[80px]">
      <main className="max-w-[1366px] w-full mx-auto flex flex-col gap-8 isolate ">
        <RightSide />
        <LeftSide />
      </main>
      <Chat />
    </div>
  );
};

export default GameScreen;
