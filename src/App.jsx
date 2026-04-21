import { NavBar } from "./components/auth/nav/NavBar.jsx";
import { ApplicationViews } from "./views/ApplicationViews";

export const App = () => {
  return (
    <>
      <NavBar />
      <ApplicationViews />
    </>
  );
};
