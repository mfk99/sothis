import { usePageStore } from "../../stores/page.store";
import { useSearchModeStore } from "../../stores/search.store";
import { useSortModeStore } from "../../stores/sort.store";
import { useUserStore } from "../../stores/user.store";
import { GameCardGrid } from "../games/GameCardGrid";
import { SearchInput } from "../filtering/SearchInput";
import { SortSelect } from "../filtering/SortSelect";
import { UserCard } from "../user/UserCard";

export function LibraryPage() {
  const setPage = usePageStore((s) => s.setPage);
  const user = useUserStore((s) => s.user);
  const sortMode = useSortModeStore((s) => s.sortMode);
  const setSortMode = useSortModeStore((s) => s.setSortMode);
  const searchMode = useSearchModeStore((s) => s.searchMode);
  const setSearchMode = useSearchModeStore((s) => s.setSearchMode);
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-3 gap-3">
        <SortSelect onChange={(value) => setSortMode(value)} />
        <SearchInput onChange={(value) => setSearchMode(value)} />
        {user && <UserCard user={user} onClick={() => setPage("profile")} />}
      </div>
      <GameCardGrid sortMode={sortMode} searchMode={searchMode} />
    </div>
  );
}
