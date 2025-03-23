import React from 'react';
import { useNavigate } from 'react-router-dom';
import searchStore from '../stateManagement/searchStore';


const SearchResults = () => {
    const { art, users } = searchStore((state) => state.searchResults);
  

    const navigate = useNavigate();


    return (
        <div>
            <h1>Search Results</h1>

        { users.length > 0 ? 
        <>
            <h3>Profiles</h3>
            <div className="profilesSearchResults">
            {users.map(user => (
                <div key={user.userID} className='profile' onClick={()=>     navigate('/profile/'+ user.userID + '/' + user.username)}>
                    <img src={user.profilePic} alt="pfp"  className='pfp'/>
                    <p>{user.username}</p>
                </div>
                ))}
            </div>
            </>
         : null}  

         { art.length > 0 ?
         <>
            <h3>Posts</h3>   
            <div className="artSearchResults">
            {art.map(art => (
                <div key={art.artID} className='artPost' onClick={()=> navigate('/gallery/'+ art.artID)}>
                    <img src={art.artImgLink
                    } alt="art" className='artPic'/>
                    <p>{art.artName}</p>   
            </div>
            ))}
            </div>
            </>
            : null }

            { users.length < 1 && art.length < 1 ? <>
            <h2>No Results Found</h2>
            </> : null}
        </div>
    );
};

export default SearchResults;