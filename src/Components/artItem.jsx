import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stateManagement/userInfoStore";

import "./artItem.css";

const ArtItem = () => {
  const { id } = useParams();
  const [artItem, setArtItem] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const { username } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/artPosts.php?id=" +
          id
      );
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setArtItem(data);

      const res2 = await fetch(
        "https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/checkLike.php?id=" +
          id
      );
      if (!res2.ok) throw new Error("Failed to fetch");
      const data2 = await res2.json();
      if (data2.liked) {
        setIsFavorited(true);
        console.log("favorited");
      } else {
        setIsFavorited(false);
        console.log("not favorited");
      }
    };

    fetchData();
  }, [id]);

  if (!artItem) {
    return <div>Loading...</div>;
  }

  const handleFavorite = async () => {
    if (!username) {
      alert("Please log in to favorite this post.");
      return;
    }

    if (isFavorited) {
      setIsFavorited(false);
      await fetch(
        "https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/unlike.php",
        {
          method: "POST",
          body: JSON.stringify({ username: username, artID: artItem[0].artID }),
        }
      );
    }
    if (!isFavorited) {
      setIsFavorited(true);
      await fetch(
        "https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/favorites.php",
        {
          method: "POST",
          body: JSON.stringify({ username: username, artID: artItem[0].artID }),
        }
      );
    }
  };

  return (
    <div className="artPost">
      <div className="imagebg">
        <img src={artItem[0].artImgLink} alt={artItem[0].artName} />
      </div>
      <div className="plaque">
        <p>{artItem[0].name}</p>
        <h2>{artItem[0].artName}</h2>
        <p>Date Posted: {artItem[0].postedAt}</p>
        <p>{artItem[0].artDesc}</p>
        {artItem[0].username === username ? null : (
          <div className="favButton">
            <div
              className={isFavorited ? "heartIcon favorited" : " heartIcon"}
              onClick={() => handleFavorite()}
            >
              &#10084;
            </div>
          </div>
        )}
      </div>
      <button onClick={() => navigate("/Shart-FE")}>Back to Home</button>
    </div>
  );
};

export default ArtItem;
