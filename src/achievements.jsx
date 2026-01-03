import { useEffect, useState } from "react";
import { getPlayerGamesAndAchievements } from "./fetch-games";

export function Achievements() {
  const [playerAchievementData, setPlayerAchievementData] = useState([]);
  useEffect(() => {
    getPlayerGamesAndAchievements()
      .then(setPlayerAchievementData)
      .catch(console.error);
  }, []);

  return (
    <div>
      {playerAchievementData.map((gameData) => (
        <div key={gameData.gameId} className="mb-4">
          {" "}
          <div className="text-white">Name: {gameData.gameName}</div>
          <div className="text-white">ID: {gameData.gameId}</div>
          <div className="ml-4">
            {" "}
            {/* Indent achievements for visual hierarchy */}
            {gameData.achievements.map((achievementData) => (
              <div key={achievementData.apiname} className="text-white">
                {" "}
                Achievement: {achievementData.apiname}, Achieved:{" "}
                {achievementData.achieved ? "Yes" : "No"}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
