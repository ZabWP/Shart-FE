import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import "./googleSSO.css";
import useUserStore from "../stateManagement/userInfoStore";
import { useNavigate } from "react-router-dom";

// Google Single Sign On Button Component
const SSO = () => {
  const GOOGLE_CLIENT_ID =
    "1031209010702-c9asmhjf92k0j3hvn7e5bcqqmad7r0a4.apps.googleusercontent.com";
  const [error, setError] = useState("");
  const { user } = useUserStore();

  const navigate = useNavigate();

  // After User logs into their account
  const handleSuccess = async (response) => {
    setError("");

    const userInfo = JSON.parse(atob(response.credential.split(".")[1]));
    useUserStore.getState().setUser(userInfo);
    navigate("./Shart-FE/register");
  };

  // User did not log into their account
  const handleError = (error) => {
    console.log("Login failed:", error);
  };

  // render component
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
        <div className="profileContainer">
          <img
            src={user.picture}
            alt="pfp"
            onClick={() => navigate("./Shart-FE/profile/myProfile")}
          />
        </div>
      )}
    </>
  );
};

export default SSO;
