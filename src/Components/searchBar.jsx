import React from 'react';
import { useNavigate } from 'react-router-dom';
import searchStore from '../stateManagement/searchStore';


const SearchBar = () => {
    const navigate = useNavigate();
    const [searchQ, setSearchQ] = React.useState('');
    const setSearchResults = searchStore((state) => state.setSearchResults);
 

    const handleChange = (e) => {
        setSearchQ(e.target.value);
    }

    const handleSearch = () => {
        fetch("https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/search.php?query="+ searchQ, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
                setSearchResults(data);})
            .catch((err) => console.error("Error:", err));
        navigate('/search');
    };

    return (
        <div>
            <input type="text" placeholder="Search..." onChange={handleChange}/>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;