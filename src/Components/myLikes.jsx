import { useEffect, useState } from "react";
import useUserStore from "../stateManagement/userInfoStore";
import "./myLikes.css";
import { useNavigate } from "react-router-dom";

const MyLikes = () => {
  const [myLikes, setMyLikes] = useState([]);
  const { userID } = useUserStore();
  const navigate = useNavigate();

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
    <div className="myLikesComponent">
      <h1>My Likes</h1>
      <div className="likesContainer">
        {myLikes.map((like, index) => (
          <div
            key={index}
            className="myLikedItem"
            onClick={() => navigate(`/Shart-FE/gallery/${like.artID}`)}
          >
            <div className="imgShaper">
              <img src={like.artImgLink} alt="pic" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyLikes;
