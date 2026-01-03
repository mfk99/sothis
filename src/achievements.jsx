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
      {Object.entries(playerAchievementData).map(([key, value]) => (
        <GameAchievements gameData={value} />
      ))}
    </div>
  );
}

function GameAchievements({ gameData }) {
  if (!gameData?.achievements) {
    return (
      <div key={gameData.gameId} className="mb-4">
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
    <div key={gameData.gameId} className="mb-4">
      {" "}
      <div className="text-white">Name: {gameData.name}</div>
      <div className="text-white">ID: {gameData.appid}</div>
      <div className="ml-4">
        {" "}
        {gameData.achievements.map((achievementData) => (
          <div key={achievementData.apiname} className="text-white">
            {" "}
            Achievement: {achievementData.apiname}, Achieved:{" "}
            {achievementData.achieved ? "Yes" : "No"}
          </div>
        ))}
      </div>
    </div>
  );
}
