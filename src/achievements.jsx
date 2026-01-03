import { useEffect, useState } from "react";
import { getFullAchievementData } from "./fetch-games";

export function Achievements() {
  const [achievementData, setachievementData] = useState([]);
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

function GameAchievements({ gameData }) {
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
          <div key={value.apiname} className="text-white">
            {" "}
            Achievement: {value.apiname}, Achieved:{" "}
            {value.achieved ? "Yes" : "No"}, Percentage: {value.percentage}
          </div>
        ))}
      </div>
    </div>
  );
}
