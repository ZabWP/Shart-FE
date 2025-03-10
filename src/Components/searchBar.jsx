import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }
    const handleSearch = () => {
        fetch("https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/database.php", {
            method: "POST",
            body: searchTerm,
          })
            .then((res) => res.text())
            .then((data) => console.log(data))
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