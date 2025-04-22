import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stateManagement/userInfoStore';

const Register = () => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/registerUser.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    username: username, 
                    bio: bio, 
                    email: user.email, 
                    name: user.name, 
                    picture: user.picture
                }),
            });
    
            // Error:  backend server crashed
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
    
            const data = await res.json();
            console.log("Response from server:", data);
            if (data.status === "success") {
                navigate("/Shart-FE");
            } else {
                // Error: backend returns invalid data
                console.error("Error from server:", data.error);
            }
        } catch (err) {
            // Error: Cannot connect to backend
            console.error("Error:", err);
        }
    };
    


    useEffect(() => {
        // Check if user logged into google
        if (!user) {
            navigate("./Shart-FE")
        }

        // Check if user is already in the databse
        const checkUser = async () => {
            try {
                const res = await fetch("https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/checkUser.php", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: user.email, name: user.name, picture: user.picture}),
                });
        
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
        
                const data = await res.json();
        
                if (data.status !== "newUser" || data.error === "InvalidEmail") {
                    useUserStore.getState().setUsername(data[0].username);
                    navigate("/Shart-FE");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        
        checkUser();
        setLoading(false);
    },[user, navigate])

    if (isLoading) {
        return <div><h1>Loading...</h1></div>
    }

    return (
        <div className='registerPage'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username (required):</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="bio">Bio (optional):</label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;