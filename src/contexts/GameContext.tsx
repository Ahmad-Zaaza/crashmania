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
  prediction: number;
  stake: number;
  points: number;
  setSpeed: Dispatch<SetStateAction<number>>;
  setPrediction: Dispatch<SetStateAction<number>>;
  setStake: Dispatch<SetStateAction<number>>;
  setName: Dispatch<SetStateAction<string>>;
};

export const GameContext = createContext<GameContextProps>({
  speed: 1,
  name: "",
  prediction: 0,
  points: 1000,
  stake: 0,
  setName: () => {},
  setSpeed: () => {},
  setPrediction: () => {},
  setStake: () => {},
});

interface IProps {
  children: ReactNode;
}

const GameContextProvider: React.FC<IProps> = ({ children }) => {
  const [speed, setSpeed] = useState(1);
  const [prediction, setPrediction] = useState(0);
  const [stake, setStake] = useState(0);
  const [points, setPoints] = useState(0);
  const [name, setName] = useState("");

  const providerValue = useMemo(() => {
    return {
      speed,
      name,
      setName,
      setSpeed,
      prediction,
      setPrediction,
      points,
      setPoints,
      stake,
      setStake,
    };
  }, [name, points, prediction, speed, stake]);
  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

export const useGameProvider = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("You need to wrap your element with GameContextProvider");
  }

  return context;
};
