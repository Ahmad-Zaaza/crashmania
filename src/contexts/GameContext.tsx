import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type GameContextProps = {
  speed: number;
  name: string;
  setSpeed: Dispatch<SetStateAction<number>>;
  setName: Dispatch<SetStateAction<string>>;
};

export const GameContext = createContext<GameContextProps>({
  speed: 1,
  name: "",
  setName: () => {},
  setSpeed: () => {},
});

interface IProps {
  children: ReactNode;
}

const GameContextProvider: React.FC<IProps> = ({ children }) => {
  const [speed, setSpeed] = useState(1);
  const [name, setName] = useState("");

  const providerValue = useMemo(() => {
    return { speed, name, setName, setSpeed };
  }, [name, speed]);
  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameProvider = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("You need to wrap your element with GameContextProvider");
  }

  return context;
};
