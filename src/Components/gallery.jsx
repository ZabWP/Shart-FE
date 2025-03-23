import {  useEffect, useState } from "react";
import "./gallery.css";
import {useNavigate} from 'react-router-dom';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState();

  const navigate = useNavigate();

  const navUser = (id) => {
    navigate('/gallery/' + id);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/artPosts.php")
      if (!res.ok) throw new Error("Failed to fetch");

      
      const data = await res.json();
      setGalleryItems(data);
    }

    fetchData();
  }, []);


  if (!galleryItems) {
    return <div>Loading...</div>;
  }

  return (
    <div className="artContainer">
      {galleryItems.map((data, index) => ( 
        <div key={index} className="artItem" onClick={() => navUser(data.artID)}>
          <h2>{data.artName}</h2>
          <div className="thmbContainer">
          <img src={data.artImgLink} className="thumbnail" alt="pic" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Gallery;
