import { useEffect } from "react";
import "./App.css";
import { usePageStore } from "./stores/page.store";
import { useUserStore } from "./stores/user.store";
import { ProfilePage } from "./components/pages/ProfilePage";
import { LibraryPage } from "./components/pages/LibraryPage";
import { ErrorPage } from "./components/pages/ErrorPage";

function App() {
  const pageState = usePageStore((s) => s.page);
  const loadUser = useUserStore((s) => s.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  switch (pageState) {
    case "library":
      return <LibraryPage />;
    case "profile":
      return <ProfilePage />;
    default:
      return <ErrorPage />;
  }
}

export default App;
