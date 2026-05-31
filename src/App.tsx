import { useEffect } from "react";
import { create } from "zustand";
import "./App.css";
import { GameCard } from "./gamecard";
import { UserCard, type User } from "./usercard";
import { getGameData, getUserData, type Game } from "./fetch-games";
import { SearchInput } from "./searchInput";
import { SortSelect, type SortMode } from "./sortSelect";
import { Achievements } from "./achievements";

type PageStore = {
  page: "library" | "profile";
  setPage: (newPage: "library" | "profile") => void;
};

const usePageStore = create<PageStore>()((set) => ({
  page: "library",

  setPage: (newPage) => set({ page: newPage }),
}));

type UserStore = {
  user: User;
  setUser: (newUser: User) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: {
    personaname: "",
  },
  setUser: (newUser) => set({ user: newUser }),
}));

type SortModeStore = {
  sortMode: SortMode;
  setSortMode: (newSortMode: SortMode) => void;
};

const useSortModeStore = create<SortModeStore>((set) => ({
  sortMode: "alphabetical",
  setSortMode: (newSortMode) => set({ sortMode: newSortMode }),
}));

type SearchModeStore = {
  searchMode: string;
  setSearchMode: (newSearchMode: string) => void;
};

const useSearchModeStore = create<SearchModeStore>((set) => ({
  searchMode: "",
  setSearchMode: (newSearchMode) => set({ searchMode: newSearchMode }),
}));

type GameStore = {
  games: Array<Game>;
  setGames: (newGames: Array<Game>) => void;
};

const useGameStore = create<GameStore>((set) => ({
  games: [],
  setGames: (newGames) => set({ games: newGames }),
}));

function GameCards({
  sortMode,
  searchMode,
}: {
  sortMode: string;
  searchMode: string;
}) {
  const games = useGameStore((s) => s.games);
  const setGames = useGameStore((s) => s.setGames);

  useEffect(() => {
    getGameData().then(setGames).catch(console.error);
  }, []);

  const sortedGames = [...games].sort((a: any, b: any) => {
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

  const filteredGames = [...sortedGames].filter((game: any) =>
    game.name.toLowerCase().includes(searchMode.toLowerCase()),
  );

  return (
    <div className="grid grid-cols-3 gap-3">
      {filteredGames.map((game: any) => (
        <GameCard key={game.appid} game={game} />
      ))}
    </div>
  );
}

function App() {
  const pageState = usePageStore((s) => s.page);
  const setPage = usePageStore((s) => s.setPage);
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const sortMode = useSortModeStore((s) => s.sortMode);
  const setSortMode = useSortModeStore((s) => s.setSortMode);
  const searchMode = useSearchModeStore((s) => s.searchMode);
  const setSearchMode = useSearchModeStore((s) => s.setSearchMode);
  useEffect(() => {
    getUserData().then(setUser).catch(console.error);
  }, []);

  switch (pageState) {
    case "library":
      return (
        <div className="grid gap-3">
          <div className="grid grid-cols-3 gap-3">
            <SortSelect onChange={(value) => setSortMode(value)} />
            <SearchInput onChange={(value) => setSearchMode(value)} />
            {user && (
              <UserCard user={user} onClick={() => setPage("profile")} />
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
