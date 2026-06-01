import { useEffect } from "react";
import "./App.css";
import { usePageStore } from "./stores/page.store";
import { useUserStore } from "./stores/user.store";
import { ProfilePage } from "./components/pages/ProfilePage";
import { LibraryPage } from "./components/pages/LibraryPage";
import { ErrorPage } from "./components/pages/ErrorPage";
import { UserIdInput } from "./components/user/UserIdInput";
import { useuserSteamId } from "./stores/userId.store";

function App() {
  const pageState = usePageStore((s) => s.page);
  const loadUser = useUserStore((s) => s.loadUser);
  const setUserSteamId = useuserSteamId((s) => s.setUserSteamId);
  const userId = useuserSteamId((s) => s.userSteamId);

  useEffect(() => {
    loadUser(userId);
  }, [userId, loadUser]);

  let page;

  switch (pageState) {
    case "library":
      page = <LibraryPage />;
      break;
    case "profile":
      page = <ProfilePage />;
      break;
    default:
      page = <ErrorPage />;
  }

  return (
    <>
      {(pageState === "library" || pageState === "profile") && (
        <UserIdInput onChange={(value) => setUserSteamId(value)} />
      )}
      {page}
    </>
  );
}

export default App;
