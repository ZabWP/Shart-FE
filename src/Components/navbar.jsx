import SSO from "./googleSSO";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Navbar = () => {

  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState();

  // useEffect(() => {
  //   // Fetch the profile image URL from an API or local storage
  //   const fetchProfileImage = async () => {
  //     const response = await fetch("/api/profile-image");
  //     const data = await response.json();
  //     setProfileImage(data.imageUrl);
  //   };

  //   fetchProfileImage();
  // }, []);

  return (
    <div className="navbarContainer">
      <div className="logoContainer" onClick={() => navigate('/home')}>
      <img src="https://lh3.googleusercontent.com/pw/AP1GczPLR-MNks-h4cY_Zt-ihCSp61NyiRNDzAMp-GHNMn0SMVOwab8YT0AI3hiKHbToImAchqec1K-yZhUOPliE-8ad42L9Wa8Mc6vmWNJaJJhHLgpjrnI=w2400" alt="logo" />
      <h1>Shart Gallery</h1>
      </div>
     
      <SSO />

      <div className="profileContainer">
        <img src={profileImage ? profileImage : "https://cdn.discordapp.com/attachments/1346268283279773759/1346874768770596985/blank-profile-picture-973460_1280.png?ex=67c9c660&is=67c874e0&hm=06ed63a7667746d76a0bc1de2f24acbded570777693cc024820afdac53a745ca&"} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
