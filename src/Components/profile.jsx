import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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

    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/myPosts.php?username=${username}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error); // Handle the error returned from PHP
        }
        setPosts(data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchProfile();
    fetchPosts();
  }, [username]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="profileContainerr">
        <div className="imgCont">
          <img src={profile[0].profilePic} alt="Profile" />
        </div>
        <div className="infoCont">
          <p className="username">{profile[0].username}</p>
          <h1 className="name">{profile[0].name}</h1>
          <p className="bio"> {profile[0].bio}</p>
        </div>
      </div>
      <div className="profilePostsContainer">
        <h3>Posts</h3>
        <div className="postsContainer">
          {posts.length < 0 ? (
            posts.map((post, index) => (
              <div key={index} className="postItem">
                <img src={post.artImgLink} alt="pic" />
              </div>
            ))
          ) : (
            <div className="NA">No posts available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
