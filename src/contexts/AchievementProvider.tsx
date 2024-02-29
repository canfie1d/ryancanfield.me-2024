import {
  useReducer,
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import Toast from "../components/Toast/Toast";
import Icon from "../components/Icon";
import { ACHIEVEMENTS } from "../data/achievements";

export type AchievementType = {
  id: string;
  title: string;
  description: string;
  collectedDate: string | null;
  icon: string;
};

type AchievementStateTypes = {
  loadingAchievements: boolean;
  achievements: AchievementType[];
  hasAchievement: (achievementId: AchievementType["id"]) => boolean;
  addAchievement: (achievementId: AchievementType["id"]) => void;
  resetAchievements: () => void;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_ACHIEVEMENT":
      return {
        ...state,
        achievements: [...state.achievements, action.payload],
        loadingAchievements: false,
      };
    case "SET_ACHIEVEMENTS":
      return {
        ...state,
        achievements: action.payload,
        loadingAchievements: false,
      };
    case "RESET_ACHIEVEMENTS":
      return {
        ...state,
        achievements: action.payload,
        loadingAchievements: false,
      };
    case "ACHIEVEMENTS_LOADING":
      return { ...state, loadingAchievements: action.payload };
    default:
      return state;
  }
};

const initialState = {
  loadingAchievements: true,
  achievements: [],
  addAchievement: (_: AchievementType["id"]) => {},
  hasAchievement: (_: AchievementType["id"]) => false,
  resetAchievements: () => {},
};

const AchievementContext = createContext(initialState);

export const useAchievementContext = () => {
  return useContext(AchievementContext);
};

export const AchievementProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState as AchievementStateTypes
  );

  const [toast, setToast] = useState({ open: false, title: "", message: "" });

  useEffect(() => {
    const getAchievements = async () => {
      const response = await fetch("/api/get-achievements");
      const data = await response.json();
      setAchievements(data);
    };

    getAchievements();
  }, []);

  const setAchievements = (achievements: AchievementType[]) => {
    dispatch({
      type: "SET_ACHIEVEMENTS",
      payload: achievements,
    });
  };

  const addAchievement = async (achievementId: AchievementType["id"]) => {
    const achievement: AchievementType = ACHIEVEMENTS.find(
      (achievement) => achievement.id === achievementId
    ) as AchievementType; // Cooerced bc TS is mad about the possibility of .find not returning something. Fair enough.

    if (!achievement || hasAchievement(achievementId)) return;

    achievement.collectedDate = new Date().toISOString();

    if (!state.loadingAchievements) {
      await fetch("/api/add-achievement", {
        method: "POST",
        body: JSON.stringify([...state.achievements, achievement]),
      }).then(async () => {
        setAchievements([...state.achievements, achievement]);

        setToast({
          open: true,
          title: achievement.title,
          message: achievement.description,
        });
      });
    }
  };

  const resetAchievements = async () => {
    await fetch("/api/delete-achievements", {
      method: "DELETE",
    }).then(async () => {
      setAchievements([]);

      setToast({
        open: true,
        title: "Achievements Reset",
        message: "All achievements have been reset and you can start again!",
      });
    });
  };

  const hasAchievement = (achievementId: AchievementType["id"]) => {
    if (!state.achievements) return false;
    console.log("state", state);
    console.log("state.achievements", state.achievements);
    console.log("typeof state.achievements", typeof state.achievements);
    return state.achievements.some(
      (achievement: AchievementType) => achievement.id === achievementId
    );
  };

  return (
    <AchievementContext.Provider
      value={{
        loadingAchievements: state.loadingAchievements,
        achievements: state.achievements,
        addAchievement: addAchievement,
        hasAchievement: hasAchievement,
        resetAchievements: resetAchievements,
      }}
    >
      <Toast
        open={toast.open}
        onClose={() => setToast({ open: false, title: "", message: "" })}
        closeTime={2400}
        type="achievement"
      >
        <Icon name="cert" />
        <div>
          <h4>{toast.title}</h4>
          <p>{toast.message}</p>
        </div>
      </Toast>
      {children}
    </AchievementContext.Provider>
  );
};
