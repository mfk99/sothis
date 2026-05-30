import type { Achievement, Game } from "./fetch-games";
import { useEffect, useState } from "react";
import { getFullAchievementData } from "./fetch-games";

export function Achievements() {
  const [achievementData, setachievementData] = useState<Record<number, Game>>(
    {},
  );
  useEffect(() => {
    getFullAchievementData().then(setachievementData).catch(console.error);
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
