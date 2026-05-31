import type { Game } from "./fetch-games";
import { useEffect } from "react";
import { getFullAchievementData } from "./fetch-games";
import { create } from "zustand";

type AchievementDataStore = {
  achievementData: Record<number, Game>;
  loadAchievementData: () => void;
};

const useAchievementDataStore = create<AchievementDataStore>((set) => ({
  achievementData: {},
  loadAchievementData: async () => {
    const achievementData = await getFullAchievementData();
    set({ achievementData });
  },
}));

export function Achievements() {
  const achievementData = useAchievementDataStore((s) => s.achievementData);
  const loadAchievementData = useAchievementDataStore(
    (s) => s.loadAchievementData,
  );
  useEffect(() => {
    loadAchievementData();
  }, []);
  return (
    <div>
      {Object.entries(achievementData).map(([key, value]) => (
        <GameAchievements gameData={value} />
      ))}
    </div>
  );
}

function GameAchievements({ gameData }: { gameData: Game }) {
  if (!gameData.hasAchievements) {
    return (
      <div key={gameData.appid} className="mb-4">
        {" "}
        <div className="text-white">Name: {gameData.name}</div>
        <div className="text-white">ID: {gameData.appid}</div>
        <div className="ml-4">
          {" "}
          <div className="text-white">This game has no achievements :(</div>
        </div>
      </div>
    );
  }

  return (
    <div key={gameData.appid} className="mb-4">
      {" "}
      <div className="text-white">Name: {gameData.name}</div>
      <div className="text-white">ID: {gameData.appid}</div>
      <div className="ml-4">
        {" "}
        {Object.entries(gameData.achievementData).map(([key, value]) => (
          <div key={value.name} className="text-white">
            <div className="text-2xl">{value.displayName}</div>
            <div>Apiname: {value.name}</div>
            <div>Achieved: {value.achieved ? "Yes" : "No"}</div>
            <div>Percentage: {value.percent}</div>
            <div>Hidden: {value.hidden}</div>
            <div>description: {value.description}</div>
            <div />
          </div>
        ))}
      </div>
    </div>
  );
}
