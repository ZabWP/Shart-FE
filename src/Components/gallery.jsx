import { useEffect, useState } from "react";
import "./gallery.css";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const navigate = useNavigate();

  const navUser = (id) => {
    navigate("./gallery/" + id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/artPosts.php"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setGalleryItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="postingImgMsg">Loading...</div>; // Show loading text
  }

  if (error) {
    return <div className="postingImgMsg">Error: {error}</div>; // Show error message if something goes wrong
  }

  if (!galleryItems) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="artContainer">
      {galleryItems.map((data, index) => (
        <div
          key={index}
          className="artItem"
          onClick={() => navUser(data.artID)}
        >
          <div className="thmbContainer">
            <img src={data.artImgLink} className="thumbnail" alt="pic" />
          </div>
          <div className="artContentContainer">
            <div className="artTitle">
              <h2>{data.artName}</h2>
              <p className="name">{data.username}</p>
            </div>
            <div className="descContainer">
              <p>{data.artDesc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Gallery;
