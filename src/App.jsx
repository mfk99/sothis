import { useEffect, useState } from "react";
import "./App.css";
import { GameCard } from "./gamecard";
import { UserCard } from "./usercard";
import {
  getGameData,
  getPlayerGamesAndAchievements,
  getUserData,
} from "./fetch-games";
import { SearchInput } from "./searchInput";
import { SortSelect } from "./sortSelect";

function Achievements() {
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

function GameCards({ sortMode, searchMode }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGameData().then(setGames).catch(console.error);
  }, []);

  const sortedGames = [...games].sort((a, b) => {
    switch (sortMode) {
      case "alphabetical":
        return a.name.localeCompare(b.name);
      case "alphabetical-asc":
        return b.name.localeCompare(a.name);
      case "playtime":
        return b.playtimeMinutes - a.playtimeMinutes;
      case "playtime-asc":
        return a.playtimeMinutes - b.playtimeMinutes;
      default:
        return 0;
    }
  });

  const filteredGames = [...sortedGames].filter((game) =>
    game.name.toLowerCase().includes(searchMode.toLowerCase())
  );

  return (
    <div className="grid grid-cols-3 gap-3">
      {filteredGames.map((game) => (
        <GameCard key={game.appid} game={game} />
      ))}
    </div>
  );
}

function App() {
  const [pageState, setPageState] = useState("library");
  const [userName, setUserName] = useState(null);
  const [sortMode, setSortMode] = useState("alphabetical");
  const [searchMode, setSearchMode] = useState("");
  useEffect(() => {
    getUserData().then(setUserName).catch(console.error);
  }, []);

  switch (pageState) {
    case "library":
      return (
        <div className="grid gap-3">
          <div className="grid grid-cols-3 gap-3">
            <SortSelect onChange={(e) => setSortMode(e.target.value)} />
            <SearchInput onChange={(e) => setSearchMode(e.target.value)} />
            {userName && (
              <UserCard
                user={userName}
                onClick={(e) => setPageState("profile")}
              />
            )}
          </div>
          <GameCards sortMode={sortMode} searchMode={searchMode} />
        </div>
      );
    case "profile":
      return (
        <div>
          <div className="text-white">
            Welcome to the profile page :)
            <div>
              Note that loading the achievements may take a while depending on
              your amount of games, please be patient.
            </div>
          </div>
          <Achievements />
        </div>
      );
    default:
      return (
        <div className="text-white">
          <h2 className="text-3xl font-bold">404</h2>
          <div>How did you end up here?</div>
        </div>
      );
  }
}

export default App;
