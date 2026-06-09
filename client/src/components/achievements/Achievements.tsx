import type { Game } from "../../types/game";
import { useAchievementData } from "../../queries/useAchievementData";

type AchievementsProps = {
  userSteamId: string;
};

export function Achievements({ userSteamId }: AchievementsProps) {
  const { data, isLoading, error } = useAchievementData(userSteamId);

  if (isLoading) {
    return (
      <div className="text-white">
        Loading... <br /> (Note that loading the achievements may take a while
        depending on your amount of games, please be patient.)
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white">
        Something went wrong. Please verify that your SteamID is correct and
        that your profile is set to public.
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      {Object.entries(data).map(([key, value]: any) => (
        <GameAchievements key={value.appid} gameData={value} />
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
