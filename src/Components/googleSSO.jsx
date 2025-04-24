import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import "./googleSSO.css";
import useUserStore from "../stateManagement/userInfoStore";
import { useNavigate } from "react-router-dom";

const SSO = () => {
  const GOOGLE_CLIENT_ID =
    "1031209010702-c9asmhjf92k0j3hvn7e5bcqqmad7r0a4.apps.googleusercontent.com";
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    setError("");
    const userInfo = JSON.parse(atob(response.credential.split(".")[1]));
    useUserStore.getState().setUser(userInfo);
    navigate("./Shart-FE/register");
  };

  const handleError = (error) => {
    console.log("Login failed:", error);
  };

  const handleLogout = () => {
    useUserStore.getState().logout();
    navigate("/Shart-FE");
  };

  const goToProfile = () => {
    setDropdownOpen(false);
    navigate("./Shart-FE/profile/myProfile");
  };

  return (
    <>
      {!user ? (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="loginButton">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              useOneTap
            />
          </div>
        </GoogleOAuthProvider>
      ) : (
        <div
          className={
            dropdownOpen
              ? "profilePicContainer"
              : "profilePicContainer expanded"
          }
        >
          <img
            src={user.picture}
            alt="pfp"
            className="profilePic"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className={"dropdownMenu"}>
              <button onClick={goToProfile}>Go to Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SSO;
