import { useEffect } from "react";
import "./App.css";
import { UserCard } from "./components/UserCard";
import { SearchInput } from "./components/SearchInput";
import { SortSelect } from "./components/SortSelect";
import { Achievements } from "./components/Achievements";
import { usePageStore } from "./stores/page.store";
import { useUserStore } from "./stores/user.store";
import { useSortModeStore } from "./stores/sort.store";
import { useSearchModeStore } from "./stores/search.store";
import { GameCardGrid } from "./components/GameCardGrid";

function App() {
  const pageState = usePageStore((s) => s.page);
  const setPage = usePageStore((s) => s.setPage);
  const user = useUserStore((s) => s.user);
  const loadUser = useUserStore((s) => s.loadUser);
  const sortMode = useSortModeStore((s) => s.sortMode);
  const setSortMode = useSortModeStore((s) => s.setSortMode);
  const searchMode = useSearchModeStore((s) => s.searchMode);
  const setSearchMode = useSearchModeStore((s) => s.setSearchMode);
  useEffect(() => {
    loadUser();
  }, [loadUser]);

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
          <GameCardGrid sortMode={sortMode} searchMode={searchMode} />
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
