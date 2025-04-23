import { useEffect, useState } from "react";
import useUserStore from "../stateManagement/userInfoStore";
import { useNavigate } from "react-router-dom";
import MyLikes from "./myLikes";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const { username } = useUserStore();
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

  const handleLogout = () => {
    useUserStore.getState().logout();
    navigate("/Shart-FE");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={profile[0].profilePic} alt="Profile" />
      <h1>{profile[0].name}</h1>
      <p>Username: {profile[0].username}</p>
      <p>Bio: {profile[0].bio}</p>

      <div>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>

      <MyLikes />
    </div>
  );
};

export default MyProfile;
