import { useEffect, useState } from "react";
import useUserStore from "../stateManagement/userInfoStore";
import "./myLikes.css";

const MyLikes = () => {
  const [myLikes, setMyLikes] = useState([]);
  const { userID } = useUserStore();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(
          `https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/myLikes.php?userID=${userID}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error); // Handle the error returned from PHP
        }

        setMyLikes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikes();
  }, [userID]);

  return (
    <div>
      <h1>My Likes</h1>
      <div className="likesContainer">
        {myLikes.map((like, index) => (
          <div key={index} className="myLikedItem">
            <img src={like.artImgLink} alt="pic" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyLikes;
