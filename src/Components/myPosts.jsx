import React, { useEffect, useState } from "react";
import useUserStore from "../stateManagement/userInfoStore";
import "./myPosts.css";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { userID } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/myPosts.php?userID=${userID}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error); // Handle the error returned from PHP
        }

        setMyPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="myPostsComponent">
      <h1>My Posts</h1>
      <button onClick={() => navigate("/Shart-FE/profile/newPost")}>
        New Post
      </button>
      <div className="myPostsContainer">
        {myPosts ? (
          myPosts.map((post, index) => (
            <div
              key={index}
              className="myPostItem"
              onClick={() => navigate(`/Shart-FE/gallery/${post.artID}`)}
            >
              <div className="imgShaper">
                <img src={post.artImgLink} alt="pic" />
              </div>
            </div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </div>
  );
};
export default MyPosts;
