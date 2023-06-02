import RightSide from "../RightSide/RightSide";
import LeftSide from "../LeftSide/LeftSide";
import Chat from "../Chat/Chat";

const GameScreen = () => {
  return (
    <div className="flex gap-8  pt-8 pb-28 md:pb-16 px-4 mt-[80px]">
      <main className="max-w-[1366px] mx-auto flex-1 flex flex-col gap-8 isolate ">
        <RightSide />
        <LeftSide />
      </main>
      <Chat />
    </div>
  );
};

export default GameScreen;
