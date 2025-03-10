import { useEffect, useState } from "react";
import "./gallery.css";
import {useNavigate} from 'react-router-dom';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  const navigate = useNavigate();

  const navUser = (id) => {
    navigate('/gallery/' + id);
  }

  useEffect(() => {
    fetch("https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/artPosts.php") 
      .then((response) => response.json())
      .then((data) => setGalleryItems(data)) 
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!galleryItems) {
    return <div>Loading...</div>;
  }

  return (
    <div className="artContainer">
      {galleryItems.map((data, index) => ( 
        <div key={index} className="artItem" onClick={() => navUser(data.id)}>
          <h2>{data.name}</h2>
          <div className="thmbContainer">
          <img src={data.image} className="thumbnail" alt="pic" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Gallery;
