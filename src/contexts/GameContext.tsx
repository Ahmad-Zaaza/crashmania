import { GameSettings } from "@/lib/gameTypes";
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
  settings: GameSettings;
  setSettings: Dispatch<SetStateAction<GameSettings>>;
};

export const GameContext = createContext<GameContextProps>({
  settings: { speed: 1 },
  setSettings: () => {},
});

interface IProps {
  children: ReactNode;
}

const GameContextProvider: React.FC<IProps> = ({ children }) => {
  const [settings, setSettings] = useState<GameSettings>({ speed: 2.5 });

  const providerValue = useMemo(() => {
    return {
      settings,
      setSettings,
    };
  }, [settings]);

  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("You need to wrap your element with GameContextProvider");
  }

  return context;
};
