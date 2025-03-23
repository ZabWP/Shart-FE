import SSO from "./googleSSO";
import React from 'react';
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import searchStore from '../stateManagement/searchStore';

const Navbar = () => {

  const navigate = useNavigate();
  const [searchQ, setSearchQ] = React.useState('');
  const setSearchResults = searchStore((state) => state.setSearchResults);


  const handleChange = (e) => {
    setSearchQ(e.target.value);
}

const handleSearch = (e) => {
    e.preventDefault();
    fetch("https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/search.php?query="+ searchQ, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
            setSearchResults(data);})
        .catch((err) => console.error("Error:", err));
    navigate('/search');
};

  return (
    <div className="navbarContainer">
      <div className="logoContainer" onClick={() => navigate('/home')}>
      <img src="https://lh3.googleusercontent.com/pw/AP1GczPLR-MNks-h4cY_Zt-ihCSp61NyiRNDzAMp-GHNMn0SMVOwab8YT0AI3hiKHbToImAchqec1K-yZhUOPliE-8ad42L9Wa8Mc6vmWNJaJJhHLgpjrnI=w2400" alt="logo" />
      <h1>Shart Gallery</h1>
      </div>
     
      <form  onSubmit={handleSearch}>
        <input type="text" placeholder=" Search Posts/Profiles" value={searchQ} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>


      <SSO />

     
    </div>
  );
};

export default Navbar;
