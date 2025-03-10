import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import "./googleSSO.css";
import useUserStore from "../stateManagement/userInfoStore";

// Google Single Sign On Button Component
const SSO = () => {
  const GOOGLE_CLIENT_ID =
    "1031209010702-c9asmhjf92k0j3hvn7e5bcqqmad7r0a4.apps.googleusercontent.com";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  // After User logs into their account
  const handleSuccess = async (response) => {
    const googleJwt = response.credential;

    setLoading(true);
    setError("");

    // Sends Google's Token to the backend to verify and wait for backend to return a custom token.
    try {
      const res = await fetch("http://your-backend.com/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: googleJwt }),
      });
      const data = await res.json();

      // Stores custom login token into cookies and state
      if (res.ok) {
        const customJwt = data.customJWT;
        localStorage.setItem("authToken", customJwt);
        setToken(customJwt);
        setUser({
          name: customJwt.user.name,
          email: customJwt.user.email,
        });
        console.log("Custom JWT received:", customJwt);
      } else {
        // Handle errors (invalid token, failed to verify, etc.)
        setError("Authentication failed: " + data.error);
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      setError("Error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  // User did not log into their account
  const handleError = (error) => {
    console.log("Login failed:", error);
  };

  // render component
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="loginButton">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default SSO;
