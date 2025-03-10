import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
    const userData = [];
    const artData = [];

    const navigate = useNavigate();


    return (
        <div>
            <h1>Search Results</h1>

            <h3>Profiles</h3>
            <div className="profilesSearchResults">
            {userData.map(user => (
                <div key={user.user_ID} className='profile' onClick={()=>     navigate('/profile/'+ user.user_ID + '/' + user.username)}>
                    <img src={user.profile_pic} alt="pfp"  className='pfp'/>
                    <p>{user.username}</p>
                </div>
                ))}
            </div>
               
            <h3>Posts</h3>   
            <div className="artSearchResults">
            {artData.map(art => (
                <div key={art.id} className='artPost' onClick={()=> navigate('/gallery/'+ art.id)}>
                    <img src={art.image
                    } alt="art" className='artPic'/>
                    <p>{art.name}</p>   
            </div>
            ))}
            </div>
        </div>
    );
};

export default SearchResults;