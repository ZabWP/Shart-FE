import React, { useState } from "react";
import useUserStore from "../stateManagement/userInfoStore";
import "./newPost.css";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [postName, setPostName] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const { userID } = useUserStore();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    if (!image || !postName || !postDescription) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("postName", postName);
    formData.append("postDescription", postDescription);
    formData.append("userID", userID);

    try {
      const response = await fetch(
        "https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/uploadImg.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setIsUploading(false);
        console.log("Image uploaded successfully", result);
        if (result.error) {
          alert(result.error);
          return;
        } else {
          navigate("/Shart-FE/profile/myProfile");
        }
      } else {
        setIsUploading(false);
        console.error("Error uploading image", result.error);
      }
    } catch (error) {
      setIsUploading(false);

      console.error("Error uploading image", error);
    }
  };

  if (isUploading) {
    return <div>Posting...</div>;
  }

  return (
    <div className="newPostComponent">
      <form onSubmit={handleSubmit} className="newPostForm">
        <input type="file" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Post Name"
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
        />
        <textarea
          placeholder="Post Description"
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
        />
        <button type="submit">Upload Image</button>
      </form>

      {imagePreview && (
        <div>
          <div className="newImg">
            <div className="imgShaper">
              <img src={imagePreview} alt="Preview" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPost;
