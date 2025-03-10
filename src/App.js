import Home from "./Components/home";
import Navbar from "./Components/navbar";
import { useState, useEffect } from "react";
import useUserStore from "./stateManagement/userInfoStore";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ArtItem from "./Components/artItem";
import SearchBar from "./Components/searchBar";
import SearchResults from "./Components/searchResults";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  const BACKEND_URL = "";

  // On page load, check if the user is already logged in. (If user info is stored in local storage)
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // If a token is found, send the token to the backend to verify if it's valid
    if (token) {
      fetch(BACKEND_URL + "/verify-token", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Token is valid, user is logged in. Stores user info in the state
          if (data.isValid) {
            setIsLoggedIn(true);
            setToken(data.token);
            setUser({
              name: data.user.name,
              email: data.user.email,
            });
          }
          // Token is invalid or expired
          else {
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          setIsLoggedIn(false); // Error means the user is not logged in
        });
    } else {
      setIsLoggedIn(false); // No token found, user is not logged in
    }
  }, [setIsLoggedIn, setToken, setUser]);

  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gallery/:id" element={<ArtItem />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>

      {isLoggedIn ? <p>User is logged in</p> : <p>User is not logged in</p>}

    </div>  
  );
};

export default App;
