import Navbar from "./Components/navbar";
import useUserStore from "./stateManagement/userInfoStore";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ArtItem from "./Components/artItem";
import SearchResults from "./Components/searchResults";
import Profile from "./Components/profile";
import Register from "./Components/register";
import MyProfile from "./Components/myProfile";
import Gallery from "./Components/gallery";

const App = () => {
  // const setUser = useUserStore((state) => state.setUser);
  // const setToken = useUserStore((state) => state.setToken);

  // const BACKEND_URL = "";
  const { user } = useUserStore();

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="Shart-FE/*" element={<Navigate to="/Shart-FE" />} />
          <Route path="Shart-FE/register" element={<Register />} />
          <Route path="Shart-FE/" element={<Gallery />} />
          <Route path="Shart-FE/gallery/:id" element={<ArtItem />} />
          <Route path="Shart-FE/search" element={<SearchResults />} />
          <Route path="Shart-FE/profile/:username" element={<Profile />} />
          <Route path="Shart-FE/profile/myProfile" element={<MyProfile />} />
        </Routes>
      </Router>

      {user ? null : <p>User is not logged in</p>}
    </div>
  );
};

export default App;
