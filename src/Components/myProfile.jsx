import { useEffect, useState } from "react";
import useUserStore from "../stateManagement/userInfoStore";
import { useNavigate } from "react-router-dom";
import MyLikes from "./myLikes";
import "./myProfile.css";
import MyPosts from "./myPosts";
import Notifications from "./notifications";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const { username } = useUserStore();
  const [componentDisplay, setComponentDisplay] = useState("Posts");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("./Shart-FE");
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/users.php?username=${username}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error); // Handle the error returned from PHP
        }
        setProfile(data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchProfile();
  }, [username, navigate]);

  const handleComponent = (component) => {
    if (component === "Posts") {
      setComponentDisplay("Posts");
    }
    if (component === "Likes") {
      setComponentDisplay("Likes");
    }
    if (component === "Notifications") {
      setComponentDisplay("Notifications");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="meContainer">
        <div className="imgCont">
          <img src={profile[0].profilePic} alt="Profile" />
        </div>
        <div className="infoCont">
          <p className="username">{profile[0].username}</p>
          <h1 className="name">{profile[0].name}</h1>
          <p className="bio"> {profile[0].bio}</p>
        </div>
      </div>
      <hr></hr>
      <div className="profileNavContainer">
        <div className="button" onClick={() => handleComponent("Posts")}>
          Posts
        </div>
        <div className="button" onClick={() => handleComponent("Likes")}>
          Likes
        </div>
        <div
          className="button"
          onClick={() => handleComponent("Notifications")}
        >
          Notifications
        </div>
      </div>
      {componentDisplay === "Posts" ? (
        <MyPosts />
      ) : componentDisplay === "Likes" ? (
        <MyLikes />
      ) : componentDisplay === "Notifications" ? (
        <Notifications />
      ) : null}
    </div>
  );
};

export default MyProfile;
